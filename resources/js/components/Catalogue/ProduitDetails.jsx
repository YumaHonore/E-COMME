import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProduitDetails = ({ match }) => {
    const [produit, setProduit] = useState(null);

    useEffect(() => {
        const fetchProduit = async () => {
            const response = await axios.get(`/api/produits/${match.params.id}`);
            setProduit(response.data);
        };
        fetchProduit();
    }, [match.params.id]);

    if (!produit) return <div>Chargement...</div>;

    return (
        <div>
            <h2>{produit.nom}</h2>
            <p>{produit.description}</p>
            <p>Prix: {produit.prix}€</p>
            <p>Catégorie: {produit.categorie.nom}</p>
        </div>
    );
};

export default ProduitDetails;