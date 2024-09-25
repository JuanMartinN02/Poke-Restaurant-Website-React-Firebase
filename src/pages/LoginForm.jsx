
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from "react";
import '../assets/styles/LoginForm.css';
import  {FaUser} from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { auth, db } from './firebase';
import { toast } from "react-toastify";
import { GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import Headers from "../components/Header-s.jsx";


const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const adminCorreo = [
        "Reinaldo@Molokai.com","Juan@Molokai.com","Andres@Molokai.com",
        "Luis@Molokai.com","Carlos@Molokai.com"
    ]
    //Contraseña de Admin: Molokai2021
    
    const [isAdmin, setIsAdmin] = useState(false);

    //se encarga del login
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Usuario Loggeado correctamente!')
            toast.success("Usuario loggeado correctamente!",{
                position: "top-center",});
                
            //pagina a la que manda despues del login
            window.location.href='/LandingPage';
            {/*if (adminCorreo.includes(email) && password === 'Molokai2021') {
              setIsAdmin(true);
              console.log('Usuario es Admin')
            } */}
        } catch (error) {
            console.log(error.message);
            toast.error(error.message, {
            position: "bottom-center",
          });
        }
    };

    //Login con google
    function googleLogin() {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider).then(async (result) => {
        console.log(result);
        const user = result.user;
        if (result.user) {
          await setDoc(doc(db, "Users", user.uid), {
            email: user.email,
            nombre: user.displayName,
            photo: user.photoURL,
            apellido: "",
            rol: "",
            telefono: "",
          });
          toast.success("Usuario loggeado correctamente!", {
            position: "top-center",
          });
          window.location.href = "/LandingPage";
          {/*if (adminCorreo.includes(email) && password === 'Molokai2021') {
              setIsAdmin(true);
              console.log('Usuario es Admin')
            } */}
        }
      });
    }

    return (
        
        <>
        <Headers/>
        <div className="bodyL">
        <div className="wrapper">
            
            <form onSubmit={handleSubmit}>
                <div className="wrapper-out">
                    <h1><a href="/LandingPage"><IoIosArrowBack className="icon1" /></a><FaUser className='icon2'/> Iniciar Sesión</h1>
                </div>
                
                
                <div className="input-box">

                    <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
    
                <button type="submit">Acceder</button>

                <div className="register_link">
                    <p>¿No tienes cuenta?  <a href="/register">Registrate</a></p>
                </div>

                <div>
                    <p className="continue-p">-- O continua con--</p>
                        <div className="social">
                        <img className="socialImg" src={'./src/assets/imgs/google.jpg'} onClick={googleLogin}/>
                        </div>
                </div>

                
            </form>
            
        </div>
        </div>
        </>
    );
    } 
export default LoginForm; 