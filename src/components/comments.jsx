import "../assets/styles/comments.css";
import perfil from "../assets/imgs/imgComments/perfil.png";
import star from "../assets/imgs/imgComments/star.png";

export default function Comments() {
  return (
    <div className="p">
      <div className="barraC">
        <p className="comentariosDestacados">Comentarios destacados</p>
      </div>
      <div className="comentariosContainer">
        <div className="comentario">
          <img src={perfil} alt="Perfil" className="perfilf" />
          <p className="nombre">Nombre Apellido</p>
          <img src={star} alt="Estrella" className="star" />
          <div className="cajadecomentarios">
            <p className="comentarioTexto">Comentario...</p>
          </div>
        </div>
        <div className="comentario">
          <img src={perfil} alt="Perfil" className="perfilf" />
          <p className="nombre">Nombre Apellido</p>
          <img src={star} alt="Estrella" className="star" />
          <div className="cajadecomentarios">
            <p className="comentarioTexto">Comentario...</p>
          </div>
        </div>
        <div className="comentario">
          <img src={perfil} alt="Perfil" className="perfilf" />
          <p className="nombre">Nombre Apellido</p>
          <img src={star} alt="Estrella" className="star" />
          <div className="cajadecomentarios">
            <p className="comentarioTexto">Comentario...</p>
          </div>
        </div>
      </div>
      <div class="container">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/57uchgd0qjv-607%3A1175?alt=media&token=4bc8fdd8-6839-43b8-8219-c5c4480dbbb8"
          alt="Not Found"
          class="imagenOrdenaYa"
        />
        <div class="contornoOrdenaYa">
          <p class="ordenaYa">Ordena YA</p>
        </div>
      </div>
    </div>
  );
}
