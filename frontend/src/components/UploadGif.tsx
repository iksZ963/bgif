import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Badge } from "./ui/badge"
import { AlertCircle, X, Upload } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { useToast } from "../hooks/use-toast"

const UploadGif: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [gifFile, setGifFile] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setError('File size should not exceed 10MB');
        return;
      }
      setGifFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!gifFile || !title) {
      setError('Please provide a GIF and a title.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('gifFile', gifFile);
    formData.append('tags', tags.join(','));

    setIsUploading(true);
    setError(null);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/gifs/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('GIF uploaded:', response.data);
      toast({
        title: "Success",
        description: "GIF uploaded successfully!",
      });
      setTitle('');
      setGifFile(null);
      setTags([]);
      setPreviewUrl(null);
    } catch (error) {
      console.error('Error uploading GIF:', error);
      setError('Error uploading GIF. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-card text-card-foreground">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-primary">Upload a GIF</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium text-muted-foreground">Title</Label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter GIF title"
              className="bg-input text-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gifFile" className="text-sm font-medium text-muted-foreground">GIF File</Label>
            <div className="flex items-center justify-center w-full">
              <label htmlFor="gifFile" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-secondary hover:bg-secondary/80 border-border">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-3 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">GIF (MAX. 10MB)</p>
                </div>
                <Input
                  id="gifFile"
                  type="file"
                  accept="image/gif"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
            {previewUrl && (
              <div className="mt-4">
                <img src={previewUrl} alt="GIF preview" className="max-w-full h-auto rounded-md" />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags" className="text-sm font-medium text-muted-foreground">Tags</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag, idx) => (
                <Badge key={idx} variant="secondary" className="text-sm bg-secondary text-secondary-foreground">
                  {tag}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground rounded-full"
                    onClick={() => handleTagRemove(tag)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
            <Input
              id="tags"
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              placeholder="Enter tags (press Enter to add)"
              className="bg-input text-foreground"
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </form>
      </CardContent>
      <CardFooter>
        <Button 
          type="submit" 
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90" 
          onClick={handleSubmit}
          disabled={isUploading}
        >
          {isUploading ? 'Uploading...' : 'Upload GIF'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UploadGif;