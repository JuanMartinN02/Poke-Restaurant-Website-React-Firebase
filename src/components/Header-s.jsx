import "../assets/styles/header-s.css";
import logoMolokai from "../assets/imgs/imgHeader/Logo Molokai.png";
import logoUnimet from "../assets/imgs/imgHeader/LogoUnimet.png";


const Header = () => {
  return (
    <div className="body-header-s">
    <header className="header-s">
      <div className="top-bar-s">
        <div className="uni-logo-s">
          <img src={logoUnimet} alt="Universidad Metropolitana" />
        </div>
      </div>

      <div className="main-header-s">
        <div className="brand-s"> 
        </div>
        <div className="logoMolokai-s">
          <img src={logoMolokai} alt="Logotipo de MOLOKA'I" />
        </div>
      </div>
    </header>
    </div>
  );
};

export default Header;
