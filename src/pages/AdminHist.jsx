import "../assets/styles/Admin.css";
import "../assets/styles/AdminHist.css";
import Headerp from "../components/Header-p.jsx";
import Order from "../components/Order.jsx";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import Plato from "../components/Plato.jsx";

function AdminHist() {
    const navRefA = useRef(null);
    const [selectedPedido, setSelectedPedido] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const showBusq = () => {
        if (navRefA.current) {
            navRefA.current.classList.toggle("responsive_bus");
        } else {
            console.error("navRefA.current is undefined");
        }
    };

    const [pedidosList, setPedidos] = useState([]);

    useEffect(() => {
        const storedPedidos = JSON.parse(localStorage.getItem('PEDIDOS')) || [];
        setPedidos(storedPedidos);
    }, []);

    const handlePedidoClick = (pedido) => {
        setSelectedPedido(pedido);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredPedidos = pedidosList.filter(pedido =>
        pedido.id.toString().includes(searchTerm.toUpperCase()) ||
        pedido.horaPedido.includes(searchTerm.replace(" ", '')) ||
        pedido.fechaPedido.includes(searchTerm)
    );

    return (
        <div className="bodyA">
            <Headerp
                primero="Inicio" enlacep="LandingPage"
                segundo="Gestionar Menú" enlaces="Manage-Menu"
                tercero="Gestionar Historial" enlacet="Manage-Historial"
                cuarto="Gestionar Promociones" enlacec="Manage-Coupons"
            />
            <div className="adminh-wrap">
                <div className="listapedidos">
                    <h1 className="pedidotitulo">
                        <div className="textotitulo">PEDIDO'S</div>
                        <button className="lupa-icon-admin" onClick={showBusq}><FaMagnifyingGlass /></button>
                    </h1>
                    <div className="pedidoshistorial" ref={navRefA}>
                        <button className="close-icon-admin" onClick={showBusq}><FaTimes /></button>
                        <input
                            className="busqueda"
                            type="text"
                            placeholder="Buscar"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <div className="ordenes">
                            {filteredPedidos.map((pedido) => (
                                <Order
                                    key={pedido.id}
                                    codigo={pedido.id}
                                    hora={pedido.horaPedido}
                                    fecha={pedido.fechaPedido}
                                    onClickOrder={() => handlePedidoClick(pedido)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="detallepedido">
                    <h1 className="detalletitulo">DETALLES DEL PEDIDO</h1>
                    <div className="separador"></div>
                    {selectedPedido ? (
                        <div className="detalles">
                            <div className="datospedido">
                                <div className="dato">
                                    <p className="titulodato">Metodo Pago</p>
                                    <p className="infodato">{selectedPedido.metodoPago}</p>
                                </div>
                                <div className="dato">
                                    <p className="titulodato">Estado Actual</p>
                                    <p className="infodato">{selectedPedido.estado}</p>
                                </div>
                                <div className="dato">
                                    <p className="titulodato">Total Pagado</p>
                                    <p className="infodato">{selectedPedido.total}$</p>
                                </div>
                            </div>
                            <div className="tuOrden">
                                <div className="orden">
                                    {selectedPedido.productosPedido.map((detalle, index) => (
                                        <Plato
                                            key={index}
                                            nombre={detalle.nombre}
                                            ingredientes={detalle.ingredientes}
                                            precio={detalle.precio + "$"}
                                            cant={detalle.cantidad}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="detalletitulo">Selecciona un pedido para ver los detalles</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminHist;
