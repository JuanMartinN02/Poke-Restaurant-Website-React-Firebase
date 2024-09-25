import { useState } from "react";
import AddProd from "./AddProd.jsx"; // Asegúrate de que el nombre del componente sea correcto

export const Product = (props) => {
    const { id, productName, price, productImage, productDesc, productType } = props.data;

    const [showPopupAddProduct, setShowPopupAddProduct] = useState(false);
    const togglePopupAdd = () => {
        setShowPopupAddProduct(!showPopupAddProduct);
    };

    return (
        <div className='product-a'>
            <div className='img-container'>
                <img src={productImage} alt="Imagen producto" />
            </div>

            <div className='description'>
                <div className='name-container'>
                    <p>
                        <b className='name'>{productName}</b>
                    </p>
                </div>

                <div className='horizontal-line'></div>

                <p className='prodDesc'>{productDesc}</p>

                <div className='price-container'>
                    <p>
                        <b className='price'>${price}</b>
                    </p>
                </div>
                <button className='modProduct' onClick={togglePopupAdd}>Modificar</button>
                <AddProd 
                    show={showPopupAddProduct} 
                    onClose={togglePopupAdd} 
                    productToEdit={{ id, productName, price, productImage, productDesc, productType }} 
                />
            </div>
        </div>
    );
};
