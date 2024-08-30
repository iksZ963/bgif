import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Gif {
    _id: string;
    url: string;
    title: string;
  }
  
  const GifList: React.FC = () => {
    const [gifs, setGifs] = useState<Gif[]>([]);
  
    useEffect(() => {
      const fetchGifs = async () => {
        try {
          const response = await axios.get<Gif[]>(`${process.env.REACT_APP_API_URL}/gifs`);
          setGifs(response.data);
        } catch (error) {
          console.error('Error fetching GIFs:', error);
        }
      };
  
      fetchGifs();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-darkGreen">All GIFs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {gifs.map((gif) => (
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-asparagus" key={gif._id}>
                        <img src={`${process.env.REACT_APP_BACKEND_URL}/${gif.url}`} alt={gif.title} className="w-full h-auto" />
                        <h3 className="p-2 text-center text-lg font-semibold text-darkGreen">{gif.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GifList;
