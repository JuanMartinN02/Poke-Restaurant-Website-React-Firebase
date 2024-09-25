import "../assets/styles/footer.css";
import facebook from "../assets/imgs/imgFooter/facebook.png";
import instagram from "../assets/imgs/imgFooter/instagram.png";
import twitter from "../assets/imgs/imgFooter/twitter.png";
import linkedin from "../assets/imgs/imgFooter/linkedin.png";
import logoM from "../assets/imgs/imgFooter/logo2.png";
import contacto from "../assets/imgs/imgFooter/contacto.png";
import info from "../assets/imgs/imgFooter/info.png";
import pin from "../assets/imgs/imgFooter/pin.png";
import logoUnimet from "../assets/imgs/imgHeader/LogoUnimet.png";

export default function FooterPrincipal() {
  return (
    <div className="barraF">
      <div>
        <img src={logoM} alt="Logo Molokai" className="logoM" />
      </div>
      <div className="an">
        <div className="contacto">
          <img src={contacto} alt="Contacto" className="contactoImg" />
          <p className="contactoTexto">CONTACTO</p>
        </div>

        <div className="pago">
          <img src={info} alt="Contacto" className="info" />
          <p className="contactos">pagos@pokemolokai.com <br />
            0414-123-6105
          </p>
        </div>
        
      </div>
      <div className="sigue">
        <div className="flex"> 
        <p className="siguenos"> Síguenos: </p>
        <div className="redesSociales">
          <img src={facebook} alt="Facebook" className="facebook"></img>
          <img src={twitter} alt="Twitter" className="twitter"></img>
          <img src={instagram} alt="Instagram" className="instagram"></img>
          <img src={linkedin} alt="Linkedin" className="linkedin"></img>
          <p className="copy">Copyright @2024 - All Right Reserved</p>
        </div>
        </div>
        <div>
          <img src={pin} alt="Acerca" className="pin" />
          <p className="acercade">ACERCA DE</p>
          <p className="creador">Creado por: José García</p>
        </div>
        <div>
          <img src={logoUnimet} alt="Unimet" className="unimet" />
        </div>
        <div className="line-1" />
        <div className="line-2" />
      </div>
    </div>
  );
}
