import { useState, useEffect } from 'react';
import '../assets/styles/Profile_Sec.css';
import Header from '../components/Header-p';
import Change_Pass from '../components/Change_Pass';
import { updatePassword, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from "./firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

function Profile_Sec() {
  const [newPassword, setNewPassword] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPaypalModal, setShowPaypalModal] = useState(false);
  const [email, setEmail] = useState("Loading...");

  const handleModalPasswordOpen = () => setShowPasswordModal(true);
  const handleModalPasswordClose = () => setShowPasswordModal(false);
  const handleModalPaypalOpen = () => setShowPaypalModal(true);
  const handleModalPaypalClose = () => setShowPaypalModal(false);

  const [PaypalUser, setPaypalUser] = useState("Usuario");
  const [PaypalPassword, setPaypalPassword] = useState("Contraseña");

  const handleChangePassword = async (event) => {
    event.preventDefault();
    if (newPassword.length < 6) {
      return;
    }
    try {
      await updatePassword(auth.currentUser, newPassword);
      setShowPasswordModal(false);
    } catch (error) {
      console.error("Error updating password: ", error);
    }
  };

  const [cards] = useState([
    {
      title: 'Contraseña',
      text: 'Cambiar',
      button: handleModalPasswordOpen,
    },
    {
      title: 'Pago en Linea',
      text: 'Paypal',
      button: handleModalPaypalOpen,
    },
  ]);

  const [card_preferencias] = useState([
    {
      title: 'Preferencias',
      text_1: 'Deseo recibir informacion de promociones',
      text_2: 'Deseo recibir informacion de eventos',
    },
  ]);

  const [classState_1, setClassState] = useState({
    firstCheck: 'fa-li fa fa-square-o first-check',
    secondCheck: 'fa-li fa fa-square-o second-check'
  });

  const handleFirstClick = () => {
    setClassState((prevClassState) => ({
      ...prevClassState,
      firstCheck: prevClassState.firstCheck === 'fa-li fa fa-square-o first-check'
        ? 'fa-li fa fa-check-square-o first-check'
        : 'fa-li fa fa-square-o first-check'
    }));
  };

  const handleSecondClick = () => {
    setClassState((prevClassState) => ({
      ...prevClassState,
      secondCheck: prevClassState.secondCheck === 'fa-li fa fa-square-o second-check'
        ? 'fa-li fa fa-check-square-o second-check'
        : 'fa-li fa fa-square-o second-check'
    }));
  };

  const handleSave_Paypal = async (event) => {
    event.preventDefault();
    const change = doc(db, "Users", auth.currentUser.uid);
    await updateDoc(change, {
      usuario_paypal: PaypalUser,
      password_paypal: PaypalPassword,
    });
    console.log("Changes saved");
  };

  const fetchUserData = async (user) => {
    try {
      console.log("Fetching user data for user:", user.uid);
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log("User data fetched:", data);
        setEmail(data.email || "Email not available");
      } else {
        console.log("User document does not exist");
        setEmail("Email not available");
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
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

  const card_correo = [
    {
      title: 'Correo Electronico',
      text_1: email,
    },
  ];

  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <div className='bodyProfile_Sec'>
        <Header enlacep="/Profile" primero="Perfil" enlaces="Profile_security" segundo="Metodos y Seguridad" enlacet="/Profile_history" tercero="Historial" enlacec="/LandingPage" cuarto="Inicio" />
        <section className='section_options'>
          <div className='card_box'>
            <div className='cards'>
              {cards.map((card, i) => (
                <div key={i} className='cards_buttons_sec'>
                  <h3 className='titles_security'>{card.title}</h3>
                  <div className='card'>
                    <button className='cards_button' onClick={card.button}>{card.text}</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='card_box_2'>
            <div className='cards'>
              {card_correo.map((card, i) => (
                <div key={i} className='cards'>
                  <h3 className='titles_security'>{card.title}</h3>
                  <div className='card'>
                    <p className='display_correo'>{card.text_1}</p>
                  </div>
                </div>
              ))}
              {card_preferencias.map((card, i) => (
                <div key={i} className='cards'>
                  <h3 className='titles_security'>{card.title}</h3>
                  <div className='card_preferences'>
                    <ul className='fa-ul'>
                      <li>
                        <i
                          className={classState_1.firstCheck}
                          onClick={handleFirstClick}
                        ></i>
                      </li>
                    </ul>
                    <p className='preference_text'>{card.text_1}</p>
                    <ul className='fa-ul'>
                      <li>
                        <i
                          className={classState_1.secondCheck}
                          onClick={handleSecondClick}
                        ></i>
                      </li>
                    </ul>
                    <p className='preference_text_2'>{card.text_2}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Change_Pass show={showPasswordModal} handleClose={handleModalPasswordClose} operation="Cambiar Contraseña">
        <form onSubmit={handleChangePassword}>
          <div>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="password_change_input"
            />
          </div>
          <button type="submit" className="password_change_button">Guardar</button>
        </form>
      </Change_Pass>

      <Change_Pass show={showPaypalModal} handleClose={handleModalPaypalClose} operation="Paypal">
        <form onSubmit={handleSave_Paypal}>
          <div>
            <input
              type="user"
              value={PaypalUser}
              onChange={(e) => setPaypalUser(e.target.value)}
              className="password_change_input"
            />
            <input
              type="password"
              value={PaypalPassword}
              onChange={(e) => setPaypalPassword(e.target.value)}
              className="password_change_input"
            />
          </div>
          <button type="submit" className="password_change_button">Guardar</button>
        </form>
      </Change_Pass>
    </>
  );
}

export default Profile_Sec;
