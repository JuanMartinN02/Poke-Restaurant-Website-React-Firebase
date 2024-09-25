import { useState, useEffect } from 'react';
import moment from 'moment-timezone'; // npm install moment-timezone
import "../assets/styles/Confirmado.css";
import exit from "../assets/imgs/imgDetalles/Exit.png";
// import delivery from "../assets/imgs/imgDetalles/imagenDelivery.png";
import PropTypes from 'prop-types';

const Confirmar = ({ onNext, onBack  }) => {

  const [horaVenezuela, setHoraVenezuela] = useState('');

  useEffect(() => {
    const getHoraVenezuela = () => {
      const horaActual = moment().tz('America/Caracas').format('HH:mm:ss');
      setHoraVenezuela(horaActual);
    };

    getHoraVenezuela();
  }, []);

  return (
    <detalles>
      <div className="top-bar-c">
      <button onClick={onBack} className="blueBar">
          <img src={exit} className="exit"  alt="Exit"></img>
        </button>
      </div>
      <br/>
      <p className="pagoExitoso">¡Pago exitoso!</p>
      
      <div className="finalizadoCuadro">
        <br/>
        <p className="informacion">Número de Orden: </p>
        <br />
        <p className="informacion">Método de pago: </p>
        <br />
        <p className="informacion">Fecha de pedido: {moment().format('DD/MM/YYYY')}</p>
        <br />
        <p className="informacion">Hora de pedido: {horaVenezuela}</p>
        <br />
      </div>


      <button className="comentar-boton" onClick={onNext}>
        <p className="comentar">Comentar</p>
      </button>
      <br />
      <a href='/Entradas'>
      <button className="confirmar-boton">
        <p className="confirmar">Menú</p>
      </button>
      </a>
    </detalles>
  );
};

Confirmar.propTypes = {
  onNext: PropTypes.func.isRequired,
};


export default Confirmar;