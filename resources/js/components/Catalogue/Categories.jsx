import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Categories = ({ onSelect }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await axios.get('/api/categories');
            setCategories(response.data);
        };
        fetchCategories();
    }, []);

    return (
        <div>
            <h2>Catégories</h2>
            <ul>
                {categories.map(category => (
                    <li key={category.id} onClick={() => onSelect(category.id)}>
                        {category.nom}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;