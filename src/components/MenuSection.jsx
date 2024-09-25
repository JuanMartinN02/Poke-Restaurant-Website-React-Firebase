import React from "react";
import "../assets/styles/menuSection.css";
import leafImage from "../assets/imgs/imgMenuSection/hoja.png";
import mololove from "../assets/imgs/imgMenuSection/Mololove.png";
import kilauea from "../assets/imgs/imgMenuSection/kilauea.png";
import salmonTherapy from "../assets/imgs/imgMenuSection/salmonTherapy.png";
import crazyOasis from "../assets/imgs/imgMenuSection/crazyOasis.png";

const MenuSection = () => {
  return (
    <div className="menuSection">
      <div className="dots">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>

      <header className="he">
        <h1>BOWL Ó BURRITO</h1>
      </header>
      <br />
      <div className="carousel">
        <div className="cards-container">
          <div className="card_f">
            <img src={mololove} alt="Mololove" />
            <h2>MOLOLOVE</h2>
            <p className="price">16$</p>
            <p className="ingredientes">
              BASE, ATÚN, SALMÓN, CAMARÓN, RÁBANO, ZANAHORIA, KALE, AGUACATE,
              SALSAS
            </p>
          </div>
          <div className="card_f">
            <img src={kilauea} alt="Kilauea" />
            <h2>KILAUEA</h2>
            <p className="price">13$</p>
            <p className="ingredientes">
              BASE, ATÚN, SALMÓN, CAMARÓN, RÁBANO, ZANAHORIA, KALE, AGUACATE,
              SALSAS
            </p>
          </div>
          <div className="card_f">
            <img src={salmonTherapy} alt="Salmon Therapy" />
            <h2>SALMON THERAPY</h2>
            <p className="price">16$</p>
            <p className="ingredientes">
              BASE, ATÚN, SALMÓN, CAMARÓN, RÁBANO, ZANAHORIA, KALE, AGUACATE,
              SALSAS
            </p>
          </div>
          <div className="card_f">
            <img src={crazyOasis} alt="Crazy Oasis" />
            <h2>CRAZY OASIS</h2>
            <p className="price">16$</p>
            <p className="ingredientes">
              BASE, ATÚN, SALMÓN, CAMARÓN, RÁBANO, ZANAHORIA, KALE, AGUACATE,
              SALSAS
            </p>
          </div>
        </div>
      </div>
      <button className="view-menu-btn">Ver Menú</button>
      <div className="leaf-container">
        <img src={leafImage} alt="Leaf" className="leaf" />
      </div>
    </div>
  );
};

export default MenuSection;
