import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import UploadGif from './components/UploadGif';
import GifList from './components/GifList';
import './index.css'; // Ensure global styles are imported

const App: React.FC = () => {
    return (
        <Router>
            <div className="navbar bg-darkGreen p-4 flex justify-between items-center text-white">
                <a href="/" className="text-lg">Home</a>
                <a href="/gifs" className="text-lg">GIFs</a>
                <a href="/upload" className="text-lg">Upload</a>
            </div>
            <div className="container mx-auto p-4 bg-celadon">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/upload" element={<UploadGif />} />
                    <Route path="/gifs" element={<GifList />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
