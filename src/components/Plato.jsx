import "../assets/styles/Plato.css";
import Comida from "../assets/imgs/imgMenu/poke.jpg";
function Plato(props) {
  return (
    
    <div className="plato">
      <img className="fotoplato" src={Comida}/>
      <div className="plato-info">
      <h1 className="nomplato">{props.nombre}</h1>
      <div className="ing-precio"></div>
      <p className="ingplato">{props.ingredientes}</p>
      <p className="precioplato">{props.precio}</p>
      </div>
      <p className="cantplato">{props.cant}</p>
      </div>
    
  );
}
export default Plato;