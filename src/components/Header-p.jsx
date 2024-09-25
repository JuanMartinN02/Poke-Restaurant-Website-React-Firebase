/* eslint-disable no-unused-vars */
import "../assets/styles/header-p.css";
import logoMolokai from "../assets/imgs/imgHeader/Logo Molokai.png";
import logoUnimet from "../assets/imgs/imgHeader/LogoUnimet.png";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useRef } from "react";


const Header = (props) => {

  const navRef = useRef();
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  }
  return (
    <div className="body-header-p">

      <div className="header-p">
        <div className="top-bar-p">
          <div className="uni-logo-p">
            <img src={logoUnimet} alt="Universidad Metropolitana" />
          </div>
        </div>
        
        <div className="main-header-p">
          
          <div className="logoMolokai-p">
            <img src={logoMolokai} alt="Logotipo de MOLOKA'I" />
          </div>
          <nav ref= {navRef} className="menu-p">
            <a href={props.enlacep}> {props.primero}</a>
            <a href={props.enlaces}>{props.segundo}</a>
            <a href={props.enlacet}>{props.tercero}</a>
            <a href={props.enlacec}>{props.cuarto}</a>
            <button className="close-icon-p" onClick={showNavbar}><FaTimes/></button>
          </nav>
            <button className="menu-icon-p" onClick={showNavbar}><FaBars/></button>


        </div>
      </div>
    </div>
  );
};

export default Header;
