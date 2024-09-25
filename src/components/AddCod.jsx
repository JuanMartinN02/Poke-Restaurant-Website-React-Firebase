import '../assets/styles/AddCod.css';
import { useState, useEffect } from 'react';

function AddCod({ show, onClose }) {
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [promosList, setPromosList] = useState([]);

    useEffect(() => {
        const storedPromos = JSON.parse(localStorage.getItem('PROMOS')) || [];
        setPromosList(storedPromos);
    }, []);

    const handleSave = () => {
        if (input1.length > 0 && input1.length <= 6 && input2 >= 1 && input2 <= 100) {
            const promo = {
                id: Date.now(),
                nombreCod: input1,
                descuento: input2 / 100,
                estado: true,
            };

            let storedPromos = JSON.parse(localStorage.getItem('PROMOS')) || [];
            storedPromos.push(promo);
            localStorage.setItem('PROMOS', JSON.stringify(storedPromos));
            
            setPromosList(storedPromos); // Actualiza el estado con las promociones almacenadas

            console.log('Promoción guardada:', promo);

            setInput1(''); // Limpiar input1
            setInput2(''); // Limpiar input2
            onClose();
            window.location.reload();
        } else {
            alert('Por favor, asegúrese de que todos los campos sean válidos.');
        }
    };

    if (!show) {
        return null;
    }

    return (
        <div className="popup-overlay-ac">
            <div className="popup-ac">
                <div className='datosCodigo-ac'></div>
                <input 
                    type='text' 
                    className='input-Cod-ac ' 
                    placeholder='Codigo' 
                    maxLength={6}
                    value={input1} 
                    onChange={(e) => setInput1(e.target.value)} 
                />
                <input 
                    type='number' 
                    className='input-Cod-ac' 
                    placeholder='Porcentaje' 
                    min={1} 
                    max={100} 
                    value={input2} 
                    onChange={(e) => setInput2(e.target.value)} 
                />
                <button className='boton-Cod-ac' onClick={handleSave}>Activar</button>
                <button className='boton-Cod-ac' onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
}

export default AddCod;
