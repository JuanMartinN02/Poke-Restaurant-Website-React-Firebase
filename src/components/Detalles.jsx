import React, { useState } from 'react';
import "../assets/styles/Detalles.css";
import exit from "../assets/imgs/imgDetalles/Exit.png";
import delivery from "../assets/imgs/imgDetalles/imagenDelivery.png";
import PropTypes from 'prop-types';

const Detalles = ({ onNext }) => {
  const [horaEntrega, setHoraEntrega] = useState('2pm');

  const handleHoraClick = () => {
    
    // Se que debe haber una forma muchisimo mas optimizada,
    // pero tendre esta mientras sigo con los demas ajustes
    const horas = ['8am', '9am', '10am', '11am', '12pm',
       '1pm', '2pm', '3pm', '4pm', '5pm', '6pm'];
    const index = horas.indexOf(horaEntrega);
    
    if (index === 10) {
      setHoraEntrega('8am');
    } else if (index === 11) {
      setHoraEntrega('8am');
    } else if (index >= 0 && index < 16) {
      setHoraEntrega(horas[index + 1]);
    }
  };

  return (
    <div>
      <div className="top-bar-c">
        <a href={"/Carro"}>
          <button className="blueBar">
            <img src={exit} className="exit" alt="Exit" />
          </button>
        </a>
      </div>
    
      <div className="linea"></div>
      <div className="circulos">
        <div className="circuloRelleno" />
        <div className="circulo" />
        <div className="circulo" />
      </div>

      <div className="nombreEstados">
        <p>Detalles</p>
        <p>Método de pago</p>
        <p>Confirmación</p>
      </div>
      <p className="estadoActual">Detalles</p>

      <div className="delivery">
        <img src={delivery} className="imgDelivery" alt="Delivery" />
        <p className="horaEntrega">Hora de entrega</p>
        <button className="hora" onClick={handleHoraClick}>
          <p className="set-hora">{horaEntrega}</p>
        </button>
      </div>
      <button className="confirmar-boton" onClick={onNext}>
        <p className="confirmar">Confirmar</p>
      </button>
    </div>
  );
};

Detalles.propTypes = {
  onNext: PropTypes.func.isRequired,
};

export default Detalles;
