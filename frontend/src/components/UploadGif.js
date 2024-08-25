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
        } catch (error) {
            console.error('Error uploading GIF:', error);
        }
    };

    return (
        <div>
            <h2>Upload a GIF</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter GIF title"
                    required
                />
                <input
                    type="file"
                    onChange={(e) => setGifFile(e.target.files[0])}
                    accept="image/gif"
                    required
                />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default UploadGif;
