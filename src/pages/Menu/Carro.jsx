import React, {useContext} from "react";
import '../Menu/Carro.css';
import "../../assets/styles/header.css";
import { PRODUCTS } from "../../../products.js";
import {ShopContext} from '../../context/shop-context'
import {CartItem} from './cart-item.jsx'
import backArrow from '../../assets/imgs/imgCarro/back.png'
import { useState, useEffect } from "react";

const Carro = () => {
    const { cartItems, getTotalCartAmount } = useContext(ShopContext);
    const totalAmount = getTotalCartAmount();
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
            <div className="cart">
                <div className="titulo">
                    <h1>Articulos en tu carrito</h1>
                </div>

                <div className="cart-items">
                    {products.map((product) => {
                        if(cartItems[product.id] !== 0){
                            return <CartItem data={product}/>
                        }
                    })}
                     
                </div>

                <div className="checkout">
                    <p>Subtotal: ${totalAmount}</p>
                    <a href="/Entradas"><button>Continuar Comprando</button></a>
                    <a href="/Checkout"><button>Checkout</button></a>
                </div>
            </div>
        </>
    );
    } 
export default Carro; 