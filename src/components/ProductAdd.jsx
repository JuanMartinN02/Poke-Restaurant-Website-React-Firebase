import { useState } from "react";
import AddProduc from "./AddProd.jsx";
export const NewProduct = () => {
  const [showPopupAddProduct, setShowPopupAddProduct] = useState(false);
    const togglePopupAdd = () => {
        setShowPopupAddProduct(!showPopupAddProduct);
    };


  return (
    <div className='productAdd-a'>          
          <button className='addProduct' onClick={togglePopupAdd}>Agregar Producto</button>
          <AddProduc show={showPopupAddProduct} onClose={togglePopupAdd}/>
    </div>
  )
}