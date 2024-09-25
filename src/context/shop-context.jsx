import React, { createContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../../products';

export const ShopContext = createContext(null);


const getDefaultCart = () => {
    let cart = {};
    for (let i = 1; i < PRODUCTS.length + 1; i++) {
        cart[i] = 0;
    }
    return cart;
};

const getCartFromLocalStorage = () => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : getDefaultCart();
};

export const ShopContextProvider = (props) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem('PRODUCTS')) || [];
        const deletedProductIds = JSON.parse(localStorage.getItem('DELETED_PRODUCTS')) || [];

        const filteredPredefinedProducts = PRODUCTS.filter(product => !deletedProductIds.includes(product.id));
        
        const filteredStoredProducts = storedProducts.filter(product => !deletedProductIds.includes(product.id));

        setProducts([...filteredPredefinedProducts, ...filteredStoredProducts]);
    }, []); 

    const [cartItems, setCartItems] = useState(getCartFromLocalStorage());

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = products.find((product) => product.id === Number(item));
                if (itemInfo) {
                    totalAmount += cartItems[item] * itemInfo.price;
                } else {
                    console.warn(`Product with ID ${item} not found.`);
                }
            }
        }
        return totalAmount;
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) - 1 }));
    };

    const contextValue = { cartItems, addToCart, removeFromCart, getTotalCartAmount };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};
