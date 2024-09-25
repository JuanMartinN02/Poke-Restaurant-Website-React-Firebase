import "../assets/styles/Activos.css";
function Activos({ codigo, porcentaje, estado, onMoveToInactive, onMoveToActive}) {
    const Activado = () => {
        if (estado) {
            return  <div className="actBorder">
                    <p className="actCod">{codigo} {porcentaje}%</p>
                    <button className="desacbutton" onClick ={onMoveToInactive}>Desactivar</button>
                    </div>;
        }else{
            return  <div className="desBorder">
                    <p className="desCod">{codigo} {porcentaje}%</p>
                    <button className="actbutton" onClick= {onMoveToActive}>Activar</button>
                    </div>;
        }
    }

    return (
        Activado()
  );
}
export default Activos;