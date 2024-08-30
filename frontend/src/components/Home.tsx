import React, { useState } from 'react';
import { Button } from './ui/button';

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
  
    const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Search for:', searchQuery);
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4 text-darkGreen">Welcome to bgif</h1>
            <form onSubmit={handleSearch} className="mb-4">
                <input
                    type="text"
                    className="w-full p-2 border rounded-md shadow-sm border-asparagus"
                    placeholder="Search for GIFs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit" className="bg-darkGreen custom text-white px-4 py-2 rounded-md mt-2 hover:bg-asparagus">
                    Search
                </Button>
            </form>
        </div>
    );
};

export default Home;
