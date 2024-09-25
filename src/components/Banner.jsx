import "../assets/styles/Banner.css";
import imgPrincipal from "../assets/imgs/imgBanner/Banner-Poke.jpg";
import imgSecundaria from "../assets/imgs/imgBanner/Banner-Poki.jpg";
import FlechaDerecha from "../assets/imgs/imgBanner/FlechaDerecha.png";
import FlechaIzquierda from "../assets/imgs/imgBanner/FlechaIzquierda.png";
import FlechaAbajo from "../assets/imgs/imgBanner/FlechaAbajo.png";
import { useState, useEffect } from "react";

const Banner = () => {
  const images = [imgPrincipal, imgSecundaria];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 7000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <header className="banner">
      <div className="imgPoke">
        <img
          src={images[currentImageIndex]}
          alt="Banner Principal"
          className="banner-image"
        />
      </div>
      <div className="overlay">
        <h1 className="title">THIS IS HOW WE POKÉ</h1>
        <h2 className="text1">¡Haz clic ahora y déjate sorprender!</h2>
        <div className="order-button-container">
          <button className="order-button">ORDENA YA</button>
        </div>
        <h3 className="text2">¡No te arrepentirás!</h3>
        <div className="arrow-down">
          <img src={FlechaAbajo} alt="Flecha Abajo" />
        </div>
      </div>
      <div className="arrows">
        <div className="arrow-left" onClick={handlePrevClick}>
          <img src={FlechaIzquierda} alt="Flecha Izquierda" />
        </div>
        <div className="arrow-right" onClick={handleNextClick}>
          <img src={FlechaDerecha} alt="Flecha Derecha" />
        </div>
      </div>
    </header>
  );
};

export default Banner;
