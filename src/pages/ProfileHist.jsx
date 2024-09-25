import "../assets/styles/Admin.css";
import "../assets/styles/AdminHist.css";
import Header from "../components/Header-p.jsx";
import Order from "../components/Order.jsx";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import Plato from "../components/Plato.jsx";
import {doc, getDoc} from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from "../pages/firebase";

function ProfileHist() {

const [email, setEmail] = useState("");

// buscar correo
  const fetchUserData = async (user) => {
    try {
      console.log("Fetching user data for user:", user.uid);
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setEmail(data.email || "Email not available");
      } else {
        setEmail("Email not available");
      }
    } catch (error) {
      setEmail("Error fetching email");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is logged in:", user);
        fetchUserData(user);
      } else {
        console.log("No user logged in");
        setEmail("No user logged in");
      }
    });

    return () => unsubscribe();
  }, []);

// buscar correo
    
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
        pedido.correo.includes(email),
    );

    return (
    <div className="bodyA">
        <Header enlacep="/Profile" primero="Perfil" enlaces="Profile_security" segundo="Metodos y Seguridad" enlacet="/Profile_history" tercero="Historial" enlacec="/LandingPage" cuarto="Inicio" />
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

export default ProfileHist;
