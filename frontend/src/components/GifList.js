import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GifList = () => {
    const [gifs, setGifs] = useState([]);

    useEffect(() => {
        // Fetch GIFs from the backend
        const fetchGifs = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/gifs`);
                setGifs(response.data);
            } catch (error) {
                console.error('Error fetching GIFs:', error);
            }
        };

        fetchGifs();
    }, []);

    return (
        <div>
            <h2>All GIFs</h2>
            <div>
                {gifs.map((gif) => (
                    <div key={gif._id}>
                        <h3>{gif.title}</h3>
                        <img src={gif.url} alt={gif.title} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GifList;
