import React, { useState } from 'react';

const Home = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Search for:', searchQuery);
        // Implement search logic here
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
                <button type="submit" className="bg-oldGold text-white px-4 py-2 rounded-md mt-2 hover:bg-asparagus">
                    Search
                </button>
            </form>
        </div>
    );
};

export default Home;
