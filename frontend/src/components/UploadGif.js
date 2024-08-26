import React, { useState } from 'react';
import axios from 'axios';

const UploadGif = () => {
    const [title, setTitle] = useState('');
    const [gifFile, setGifFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('gifFile', gifFile);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/gifs/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('GIF uploaded:', response.data);
            setTitle('');
            setGifFile(null);
        } catch (error) {
            console.error('Error uploading GIF:', error);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-asparagus">
            <h2 className="text-2xl font-bold mb-4 text-darkGreen">Upload a GIF</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="w-full p-2 border rounded-md mb-4 border-asparagus"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter GIF title"
                    required
                />
                <input
                    type="file"
                    className="w-full p-2 border rounded-md mb-4 border-asparagus"
                    onChange={(e) => setGifFile(e.target.files[0])}
                    accept="image/gif"
                    required
                />
                <button type="submit" className="bg-oldGold text-white px-4 py-2 rounded-md hover:bg-asparagus">
                    Upload
                </button>
            </form>
        </div>
    );
};

export default UploadGif;
