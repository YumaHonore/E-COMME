import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Categories from '../components/Catalogue/Categories';
import Produits from '../components/Catalogue/Produits';
import ProduitDetails from '../components/Catalogue/ProduitDetails';
import SearchBar from '../components/Catalogue/SearchBar';

const App = () => {
    return (
        <Router>
            <SearchBar />
            <Routes>
                <Route path="/produits/:id" element={<ProduitDetails />} />
                <Route path="/" element={<Produits />} />
            </Routes>
            <Categories onSelect={(id) => console.log(`Catégorie sélectionnée: ${id}`)} />
        </Router>
    );
};

export default App;