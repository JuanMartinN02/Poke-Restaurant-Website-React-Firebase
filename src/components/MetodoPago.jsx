import React, { useState, useEffect } from 'react';
import "../assets/styles/MetodoPago.css"; 
import exit from "../assets/imgs/imgDetalles/Exit.png";
import paypal from "../assets/imgs/imgMetodoPago/PayPal.png";
import debito from "../assets/imgs/imgMetodoPago/Debito.png";
import PropTypes from 'prop-types';

const MetodoPago = ({ onNext, onBack }) => {
  const [isSeleccionPago2Clicked, setSeleccionPago2Clicked] = useState(false);
  const [isSeleccionPago1Clicked, setSeleccionPago1Clicked] = useState(false);
  const [nombreTarjeta, setNombreTarjeta] = useState('');
  const [nroTarjeta, setNroTarjeta] = useState('');
  const [fechaTarjeta, setFechaTarjeta] = useState('');
  const [ccvTarjeta, setCcvTarjeta] = useState('');
  const [confirmEnabled, setConfirmEnabled] = useState(false);
  const [metodo, setMetodo] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'nombreTarjeta') setNombreTarjeta(value);
    else if (name === 'nroTarjeta') setNroTarjeta(value);
    else if (name === 'fechaTarjeta') setFechaTarjeta(value);
    else if (name === 'ccvTarjeta') setCcvTarjeta(value);
  }

  useEffect(() => {
    if ((isSeleccionPago1Clicked || isSeleccionPago2Clicked) && nombreTarjeta && nroTarjeta && fechaTarjeta && ccvTarjeta) {
      setConfirmEnabled(true);
    } else {
      setConfirmEnabled(false);
    }
    
    // Define cual es el metodo de pago seleccionado
    if (isSeleccionPago2Clicked) {
      setMetodo("PayPal");
    } else if (isSeleccionPago1Clicked) {
      setMetodo("Tarjeta");
    }

  }, [isSeleccionPago1Clicked, isSeleccionPago2Clicked, nombreTarjeta, nroTarjeta, fechaTarjeta, ccvTarjeta]);

  const handleConfirm = () => {
    if (isSeleccionPago2Clicked || (isSeleccionPago1Clicked && nombreTarjeta && nroTarjeta && fechaTarjeta && ccvTarjeta)) {
      onNext();
      console.log("Método de Pago seleccionado:", metodo);
    } else {
      alert('Por favor seleccione un método de pago o ingrese todos los datos');
    }
  }

  return (
    <detalles>
      <div className="top-bar-c">
        <button onClick={onBack} className="blueBar">
          <img src={exit} className="exit" alt="Exit"></img>
        </button>
      </div>

      <div className="linea"></div>
      <div className="circulos">       
        <div className="circulo" />
        <div className="circuloRelleno" />
        <div className="circulo"/>
      </div>
      
      <div className="nombreEstados">
        <p>Detalles</p>
        <p>Método de pago</p>
        <p>Confirmación</p>
      </div>
      <p className="estadoActual">Método de pago</p>

      <div className="metodoPago">
        <p className="pagar">¿Cómo desea pagar?</p>
        <div className="metodos">
          <button className={isSeleccionPago2Clicked ? 'seleccionPago2 clicked' : 'seleccionPago2'} onClick={() => {
            setSeleccionPago2Clicked(true);
            setSeleccionPago1Clicked(false);
          }}></button>
          <img src={debito} className="debito" alt="Debito" />
          <button className={isSeleccionPago1Clicked ? 'seleccionPago1 clicked' : 'seleccionPago1'} onClick={() => {
            setSeleccionPago1Clicked(true);
            setSeleccionPago2Clicked(false);
          }}></button>
          <img src={paypal} className="paypal" alt="Paypal" />
        </div>

        {isSeleccionPago1Clicked && (
          <>
            <p className="pagar">Detalles del pago</p>
            <input 
              name='nombreTarjeta' 
              value={nombreTarjeta} 
              onChange={(e) => {
                const re = /^[a-zA-Z\s]*$/;
                if (e.target.value === '' || re.test(e.target.value)) {
                  setNombreTarjeta(e.target.value);
                }
              }} 
              className='nombreTarjeta' 
              placeholder='Nombre en tarjeta' 
            />
            <input 
              name='nroTarjeta' 
              value={nroTarjeta} 
              onChange={(e) => {
                const re = /^[0-9\b]+$/;
                if (e.target.value === '' || (re.test(e.target.value) && e.target.value.length <= 16)) {
                  setNroTarjeta(e.target.value);
                }
              }} 
              className='nroTarjeta' 
              placeholder='Número de tarjeta' 
            />
            <br />
            <input name='fechaTarjeta' value={fechaTarjeta} onChange={handleInputChange} className='fechaTarjeta' placeholder='Fecha de expiración' />
            <input 
              name='ccvTarjeta' 
              value={ccvTarjeta} 
              onChange={handleInputChange} 
              className='ccvTarjeta' 
              placeholder='CCV' 
              maxLength={3} 
              inputmode='numeric'
              pattern="[0-9]{3}"
              title="Please enter exactly 3 digits"
            />
            <br /><br />
          </>
        )}
      </div>

      <button className="confirmar-boton" onClick={handleConfirm} disabled={!confirmEnabled}>
        <p className="confirmar">Confirmar</p>
      </button>
    </detalles>
  );
};

MetodoPago.propTypes = {
  onNext: PropTypes.func.isRequired,
  
};

export default MetodoPago;