import React from "react";
import './Entradas.css';
import "../../assets/styles/header.css";
import Header from "../../components/Header.jsx";
import Navbar from "../../components/Navbar.jsx";
import { PRODUCTS } from '../../../products.js';
import { Product } from "../Menu/Product.jsx";
import { useState, useEffect } from "react";

const Entradas = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem('PRODUCTS')) || [];
        const deletedProductIds = JSON.parse(localStorage.getItem('DELETED_PRODUCTS')) || [];

        const filteredPredefinedProducts = PRODUCTS.filter(product => !deletedProductIds.includes(product.id));
        
        const filteredStoredProducts = storedProducts.filter(product => !deletedProductIds.includes(product.id));

        setProducts([...filteredPredefinedProducts, ...filteredStoredProducts]);
    }, []); 

    return (

        <>
            <div className="main-box">
                <div className="nav-menu"><Navbar /></div>

                <div className="products">
                    {products.filter(product=> product.productType == "entrada").map((product) => (
                        <Product key={product.id}data={product} />
                    ))}

                </div>
            </div>

            <div className="headerc"><Header /></div>
        </>
    );
}
export default Entradas; 