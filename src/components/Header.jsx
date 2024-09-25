import "../assets/styles/header.css";
import logoMolokai from "../assets/imgs/imgHeader/Logo Molokai.png";
import logoUnimet from "../assets/imgs/imgHeader/LogoUnimet.png";
import Usuario from "../assets/imgs/imgHeader/Usuario.png";
import Barra from "../assets/imgs/imgHeader/Barra.png";
import { useState } from "react";
import { LuShoppingBasket } from "react-icons/lu";
import { FaBars, FaTimes } from "react-icons/fa";
import { useRef, useEffect } from "react";

const Header = () => {
  const [isLogged, setIsLogged] = useState(true); // Estado de loggeo
  const [isAdmin, setIsAdmin] = useState(true); // Estado de administrador

  useEffect(() => {
    setIsLogged(false);
    setIsAdmin(false);
  }, []);

  const navRef = useRef();
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const scrollToSection = (e) => {
    e.preventDefault();
    const section = document.querySelector("#about-section");
    const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: sectionTop + -144,
      behavior: "smooth",
    });
    showNavbar();
  };

  return (
    <div className="body-header">
      <div className="header">
        <div className="top-bar">
          <div className="uni-logo">
            <img src={logoUnimet} alt="Universidad Metropolitana" />
          </div>
          <div className="perfil">
            {isLogged ? (
              <>
                {isAdmin ? (
                  <a className="admin move-left" href="/admin">
                    Admin
                  </a>
                ) : (
                  <a className="perfil-link  move-left" href="/Profile">
                    Perfil
                  </a>
                )}
              </>
            ) : (
              <>
                <a className="registerh" href="/Manage-Menu">
                  Admin
                </a>
                <img src={Barra} alt="Separador" className="separator" />
                <a className="registerh" href="/register">
                  Registrarse
                </a>
                <img src={Barra} alt="Separador" className="separator" />
                <a href="/Profile"><img src={Usuario} alt="Usuario" className="user-icon" /></a>
                <a className="loginh" href="/login">
                  Iniciar Sesión
                </a>
              </>
            )}
          </div>
        </div>

        <div className="main-header">
          <div className="brand">
            <h1>MOLOKA'I</h1>
          </div>
          <div className="logoMolokai">
            <img src={logoMolokai} alt="Logotipo de MOLOKA'I" />
          </div>
          <nav ref={navRef} className="menu">
            <a href="/">INICIO</a>
            <a href="#about-section" onClick={scrollToSection}>
              NOSOTROS
            </a>
            <a className="pedidos" href="/Entradas">
              MENÚ
            </a>
            <a href="/carro">
              <LuShoppingBasket className="shopcart" />
            </a>
            <button className="btn close-button" onClick={showNavbar}>
              <FaTimes />
            </button>
          </nav>
          <button className="btn" onClick={showNavbar}>
            <FaBars />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
