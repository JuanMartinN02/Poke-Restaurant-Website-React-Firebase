import "../assets/styles/Admin.css";
import "../assets/styles/AdminPromo.css";
import Headerp from "../components/Header-p.jsx";
import { useState, useEffect } from "react";
import Activos from "../components/Activos.jsx";
import AddCod from "../components/AddCod.jsx";

function AdminPromo() {
    const [showPopup, setShowPopup] = useState(false);
    const [savedDataList, setSavedDataList] = useState([]);

    useEffect(() => {
        const storedPromos = JSON.parse(localStorage.getItem('PROMOS')) || [];
        setSavedDataList(storedPromos);
    }, []);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const changeState = (index, newState) => {
        // Cambiar el estado del código promocional en savedDataList
        const updatedPromos = [...savedDataList];
        updatedPromos[index].estado = newState;
        setSavedDataList(updatedPromos);

        // Actualizar localStorage con el nuevo estado
        localStorage.setItem('PROMOS', JSON.stringify(updatedPromos));
        
    };


    return (
        <div className="bodyA">
            <Headerp
                primero="Inicio" enlacep="LandingPage"
                segundo="Gestionar Menú" enlaces="Manage-Menu"
                tercero="Gestionar Historial" enlacet="Manage-Historial"
                cuarto="Gestionar Promociones" enlacec="Manage-Coupons"
            />
            <div className="adminp-wrap">
                <div className="adminp-wrap-inside">
                    <div className="activos">
                        <h1 className="tituloA">Activos</h1>
                        <div className="lineA"></div>
                        <button className="addCod" onClick={togglePopup}>Agregar</button>
                        <AddCod show={showPopup} onClose={togglePopup} />
                        <div className="codigos">
                            {savedDataList.map((data, index) => (
                                <div key={index} className="data-item">
                                    {data.estado && (
                                        <Activos
                                            codigo={data.nombreCod}
                                            porcentaje={data.descuento*100}
                                            estado={data.estado}
                                            onMoveToInactive={() => changeState(index, false)}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="desactivados">
                        <h1 className="tituloA">Inactivos</h1>
                        <div className="lineA"></div>
                        <div className="codigos">
                            {savedDataList.map((data, index) => (
                                <div key={index} className="data-item">
                                    {!data.estado && (
                                        <Activos
                                            codigo={data.nombreCod}
                                            porcentaje={data.descuento*100}
                                            estado={data.estado}
                                            onMoveToActive={() => changeState(index, true)}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPromo;
