import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ onResults }) => {
    const [query, setQuery] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        const response = await axios.get(`/api/search?query=${query}`);
        onResults(response.data);
    };

    return (
        <form onSubmit={handleSearch}>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un produit..."
            />
            <button type="submit">Rechercher</button>
        </form>
    );
};

export default SearchBar;