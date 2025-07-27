import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Produits = () => {
    const [produits, setProduits] = useState([]);

    useEffect(() => {
        const fetchProduits = async () => {
            const response = await axios.get('/api/produits');
            setProduits(response.data);
        };
        fetchProduits();
    }, []);

    return (
        <div>
            <h2>Produits</h2>
            <ul>
                {produits.map(produit => (
                    <li key={produit.id}>
                        <a href={`/produits/${produit.id}`}>{produit.nom}</a> - {produit.prix}€
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Produits;