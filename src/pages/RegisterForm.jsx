import '../assets/styles/RegisterForm.css';
import  {FaUser} from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import Headers from "../components/Header-s.jsx";

const RegisterForm = () => { 
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [rol, setRol] = useState("");
    const [telf, setTelf] = useState("");
    
    //se encarga del register
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          const user = auth.currentUser;
          console.log(user);
          if (user) {
            //crea el usuario en la database
            await setDoc(doc(db, "Users", user.uid), {
              email: user.email,
              nombre: fname,
              apellido: lname,
              telefono: telf,
              rol: rol,
              photo:""
            });
          }
          console.log("Usuario registrado correctamente!");
          toast.success("Usuario registrado correctamente!",{
            position: "top-center",
          })
          //pagina a la que manda despues del registro
          window.location.href='/Login';
        } catch (error) {
          console.log(error.message);
          toast.error(error.message, {
            position: "bottom-center",
          });
        }
      };

    return (
    <>
    <Headers/>
    <div className="bodyR">
    <div className="wrapper-r">
        
        <form onSubmit={handleRegister}>
            <div className="wrapper-out-r">
                <h1> <a href="/LandingPage"><IoIosArrowBack className="icon-r" /></a> <FaUser className='icon-r2'/></h1>
            </div>
            <div className="input-box-r">
                <input type="text" placeholder="Nombre" onChange={(e) => setFname(e.target.value)} required/>
            </div>
            <div className="input-box-r">
                <input type="text" placeholder="Apellido" onChange={(e) => setLname(e.target.value)} required/>
            </div>
            <div className="input-box-r">
                <input type="text" placeholder="Rol de la universidad" onChange={(e) => setRol(e.target.value)} required/>
                
            </div>
            <div className="input-box-r">
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <div className="input-box-r">
                <input type="int" placeholder="Telefono" onChange={(e) => setTelf(e.target.value)} required/>
            </div>
            <div className="input-box-r">
                <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} required/>
           
            </div>
            <button type="submit">Registrate</button>

            <div className="register_link-r">
                <p>¿Ya tienes cuenta?  <a href="/login">Inicia Sesión</a></p>
            </div>
           
            
        </form>
        </div>
        </div>
        </>
);
}
   

export default RegisterForm;