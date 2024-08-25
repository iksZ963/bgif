import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import UploadGif from './components/UploadGif';
import GifList from './components/GifList';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/upload" element={<UploadGif />} />
                <Route path="/gifs" element={<GifList />} />
            </Routes>
        </Router>
    );
}

export default App;
