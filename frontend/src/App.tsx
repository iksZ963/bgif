import React from 'react';
import Navbar from './components/Navbar';
import './index.css'; // Ensure global styles are imported


const App: React.FC = () => {
    return (
        <div>
            {< Navbar />}
        </div>
    );
}

export default App;
