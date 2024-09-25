import React, { useEffect, useRef, useState } from "react";
import { auth, db, storage } from "./firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import '../assets/styles/Profile.css';
import Header from '../components/Header-p';
import ImgUser from '../assets/imgs/imgUser/no_perfil.png';
import change_pfp from '../assets/imgs/imgUser/change_pfp.png';

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const [profilePic, setProfilePic] = useState(ImgUser);
  const [telf, setTelf] = useState("");
  const [rol, setRol] = useState("");
  const [name, setName] = useState("");
  const [last_name, setLast_name] = useState("");
  const fileInputRef = useRef(null);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserDetails(data);
          setTelf(data.telefono || "");
          setRol(data.rol || "");
          setName(data.nombre || "");
          setLast_name(data.apellido || "");
          if (data.photo) {
            setProfilePic(data.photo);
          }
        } else {
          console.log("Usuario no está loggeado");
        }
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSave = async (event) => {
    event.preventDefault();
    const change = doc(db, "Users", auth.currentUser.uid);
    await updateDoc(change, {
      nombre: name,
      apellido: last_name,
      rol: rol,
      telefono: telf,
    });
    console.log("Changes saved");
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const storageRef = ref(storage, `profilePics/${auth.currentUser.uid}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        setProfilePic(downloadURL);
        await updateDoc(doc(db, "Users", auth.currentUser.uid), {
          photo: downloadURL,
        });
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Error uploading file. Please try again.");
      }
    }
  };

  if (!userDetails) {
    return <div className="loading_screen_profile">loading...</div>;
  }

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  return (
    <>
      <form onSubmit={handleSave}>
        <div className='bodyProfile'>
          <Header enlacep="/Profile" primero="Perfil" enlaces="Profile_security" segundo="Metodos y Seguridad" enlacet="/Profile_history" tercero="Historial" enlacec="/LandingPage" cuarto="Inicio" />
          <div className='User_Profile'>
            <div className="Img_user_container">
              <img className="Img_user" src={profilePic} alt="User" />
            </div>
            <img className="Img_change" src={change_pfp} alt="Change" onClick={() => fileInputRef.current.click()} />
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleImageUpload}
            />
          </div>
          <div className='container_user_options'>
            <h2 className='titulo_profile'>Nombre</h2>
            <input className='item_profile' value={name} onChange={(e) => setName(e.target.value)} />
            <div className='titulo_profile'>Apellido</div>
            <input className='item_profile' value={last_name} onChange={(e) => setLast_name(e.target.value)} />
            <div className='titulo_profile'>Rol Universitario</div>
            <input className='item_profile' value={rol} onChange={(e) => setRol(e.target.value)} />
            <div className='titulo_profile'>Telefono</div>
            <input className='item_profile' value={telf} onChange={(e) => setTelf(e.target.value)} />
            <button type="submit" className='profile_save_button_responsive'>Guardar Cambios</button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Profile;
