import React, { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { Card, CardContent, CardFooter } from "./ui/card"
import { Button } from "./ui/button"
import { Skeleton } from "./ui/skeleton"
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { Badge } from "./ui/badge"

interface Gif {
  _id: string;
  url: string;
  title: string;
  uploadedBy: string;
  createdAt: string;
  tags: string[];
  likes: number;
}

interface GifResponse {
  gifs: Gif[];
  currentPage: number;
  totalPages: number;
  hasMore: boolean;
}

const GifList: React.FC = () => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const initialFetchDone = useRef(false);

  const fetchGifs = useCallback(async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      const response = await axios.get<GifResponse>(`${process.env.REACT_APP_API_URL}/gifs`, {
        params: { page, limit: 12 }
      });
      
      if (response.data && Array.isArray(response.data.gifs)) {
        setGifs(prevGifs => {
          const newGifs = response.data.gifs.filter(newGif => 
            !prevGifs.some(existingGif => existingGif._id === newGif._id)
          );
          return [...prevGifs, ...newGifs];
        });
        setHasMore(response.data.hasMore);
        setPage(prevPage => prevPage + 1);
      } else {
        throw new Error('Invalid response format');
      }
      
      setError(null);
    } catch (error) {
      setError('Error fetching GIFs. Please try again later.');
      console.error('Error fetching GIFs:', error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  useEffect(() => {
    if (!initialFetchDone.current) {
      fetchGifs();
      initialFetchDone.current = true;
    }
  }, [fetchGifs]);

  const handleLoadMore = () => {
    fetchGifs();
  };

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-900 text-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-gray-100">All GIFs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {gifs.map((gif) => (
          <Card key={gif._id} className="bg-gray-800 border-gray-700 overflow-hidden hover:shadow-lg hover:shadow-gray-700/50 transition-shadow duration-300">
            <CardContent className="p-0">
              <img 
                src={`${process.env.REACT_APP_BACKEND_URL}/${gif.url}`} 
                alt={gif.title} 
                className="w-full h-48 object-cover"
                loading="lazy"
              />
            </CardContent>
            <CardFooter className="flex flex-col items-start p-4">
              <h3 className="text-lg font-semibold text-gray-100 truncate w-full mb-2">{gif.title}</h3>
              {gif.tags && gif.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {gif.tags.map((tag, index) => (
                    <Badge key={`${gif._id}-${index}`} variant="secondary" className="bg-gray-700 text-gray-200 hover:bg-gray-600 text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardFooter>
          </Card>
        ))}
        {loading && Array.from({ length: 4 }).map((_, index) => (
          <Card key={`skeleton-${index}`} className="bg-gray-800 border-gray-700 overflow-hidden">
            <CardContent className="p-0">
              <Skeleton className="w-full h-48 bg-gray-700" />
            </CardContent>
            <CardFooter className="flex flex-col items-start p-4">
              <Skeleton className="h-6 w-3/4 mb-2 bg-gray-700" />
              <div className="flex gap-1 mt-2">
                <Skeleton className="h-4 w-16 bg-gray-700" />
                <Skeleton className="h-4 w-16 bg-gray-700" />
                <Skeleton className="h-4 w-16 bg-gray-700" />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      {hasMore && (
        <div className="mt-8 text-center">
          <Button 
            onClick={handleLoadMore} 
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {loading ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default GifList;