import '../assets/styles/AddProd.css';
import { useState, useEffect } from 'react';
import { PRODUCTS } from '../../products.js';

function AddProd({ show, onClose, productToEdit }) {
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState('');
    const [input4, setInput4] = useState('');
    const [image, setImage] = useState(null);
    const [allProducts, setAllProducts] = useState([...PRODUCTS]);

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem('PRODUCTS')) || [];
        const deletedProducts = JSON.parse(localStorage.getItem('DELETED_PRODUCTS')) || [];
        const filteredProducts = PRODUCTS.filter(product => !deletedProducts.includes(product.id));
        setAllProducts([...filteredProducts, ...storedProducts]);
    }, []);

    useEffect(() => {
        if (!show) {
            setInput1('');
            setInput2('');
            setInput3('');
            setInput4('');
            setImage(null);
        } else if (productToEdit) {
            setInput1(productToEdit.productName);
            setInput2(productToEdit.productDesc);
            setInput3(productToEdit.price);
            setInput4(productToEdit.productType);
            setImage(productToEdit.productImage);
        }
    }, [show, productToEdit]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePublish = () => {
        const newProduct = {
            id: productToEdit ? productToEdit.id : Date.now(),
            productName: input1.toUpperCase(),
            price: parseFloat(input3),
            productImage: image,
            productDesc: input2.toUpperCase(),
            productType: input4.toLowerCase(),
        };

        let storedProducts = JSON.parse(localStorage.getItem('PRODUCTS')) || [];
        let deletedProducts = JSON.parse(localStorage.getItem('DELETED_PRODUCTS')) || [];

        if (productToEdit) {
            const index = storedProducts.findIndex(p => p.id === productToEdit.id);
            if (index !== -1) {
                storedProducts[index] = newProduct;
            } else {
                const predefIndex = PRODUCTS.findIndex(p => p.id === productToEdit.id);
                if (predefIndex !== -1) {
                    // Mark the product in PRODUCTS as deleted and add the new product to local storage
                    deletedProducts.push(productToEdit.id);
                    localStorage.setItem('DELETED_PRODUCTS', JSON.stringify(deletedProducts));
                    newProduct.id = Date.now();
                    storedProducts.push(newProduct);
                }
            }
        } else {
            storedProducts.push(newProduct);
        }
        localStorage.setItem('PRODUCTS', JSON.stringify(storedProducts));
        const filteredProducts = PRODUCTS.filter(product => !deletedProducts.includes(product.id));
        setAllProducts([...filteredProducts, ...storedProducts]);
        console.log('Producto agregado/modificado:', newProduct);

        setInput1('');
        setInput2('');
        setInput3('');
        setInput4('');
        setImage(null);
        onClose();
        window.location.reload();
    };

    const handleDelete = () => {
        let storedProducts = JSON.parse(localStorage.getItem('PRODUCTS')) || [];
        let updatedProducts = storedProducts.filter(p => p.id !== productToEdit.id);

        let deletedProducts = JSON.parse(localStorage.getItem('DELETED_PRODUCTS')) || [];
        deletedProducts.push(productToEdit.id);
        localStorage.setItem('DELETED_PRODUCTS', JSON.stringify(deletedProducts));

        localStorage.setItem('PRODUCTS', JSON.stringify(updatedProducts));
        const filteredProducts = PRODUCTS.filter(product => !deletedProducts.includes(product.id));
        setAllProducts([...filteredProducts, ...updatedProducts]);
        console.log('Producto eliminado:', productToEdit);

        setInput1('');
        setInput2('');
        setInput3('');
        setInput4('');
        setImage(null);
        onClose();
        window.location.reload();
    };

    const isFormValid = () => {
        return input1 && input3 && input4 && image;
    };

    if (!show) {
        return null;
    }

    return (
        <div className="popup-overlay-add">
            <div className="popup-add">
                <div className='datosProduct'>
                    <div className="image-container">
                        <input 
                            type="file" 
                            className='input-img' 
                            accept="image/*" 
                            onChange={handleImageChange} 
                            style={{ display: 'none' }}
                        />
                        {image && <img src={image} alt="Image Preview" onClick={() => document.querySelector('.input-img').click()} />}
                        {!image && <button className='img-Product' onClick={() => document.querySelector('.input-img').click()}>Seleccionar imagen</button>}
                    </div>
                    <input 
                        type='text' 
                        className='input-Product nombre' 
                        placeholder='Nombre del Plato' 
                        value={input1} 
                        onChange={(e) => setInput1(e.target.value)} 
                    />
                </div>
                <textarea 
                    className='input-Product large' 
                    placeholder='Ingredientes' 
                    value={input2} 
                    onChange={(e) => setInput2(e.target.value)} 
                />
                <input 
                    type='number' 
                    className='input-Product' 
                    placeholder='Precio' 
                    value={input3} 
                    onChange={(e) => setInput3(e.target.value)} 
                />
                <input 
                    type='text' 
                    className='input-Product' 
                    placeholder='Tipo de Plato (EJ: Entrada, Bowl)' 
                    value={input4} 
                    onChange={(e) => setInput4(e.target.value)} 
                />
                <div className="button-container">
                    <button 
                        className='boton-Product' 
                        onClick={handlePublish} 
                        disabled={!isFormValid()}
                    >
                        {productToEdit ? 'Modificar' : 'Publicar'}
                    </button>
                    {productToEdit && (
                        <button 
                            className='boton-Product' 
                            onClick={handleDelete}
                        >
                            Eliminar
                        </button>
                    )}
                    <button className='boton-Product' onClick={onClose}>Cerrar</button>
                </div>
            </div>
        </div>
    );
}

export default AddProd;
