import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./pages/LoginForm.jsx";
import RegisterForm from "./pages/RegisterForm.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Entradas from "../src/pages/Menu/Entradas.jsx";
import AdminMenu from "../src/pages/AdminMenu/AdminMenu.jsx"
import AdminHist from "../src/pages/AdminHist.jsx"
import AdminPromo from "../src/pages/AdminPromo.jsx"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/Profile.jsx";
import Profile_Sec from "./pages/Profile_Sec.jsx";
import ProfileHist from "./pages/ProfileHist.jsx";
import { useEffect, useState } from "react";
import { auth } from "./pages/firebase.js";
import Carro from "../src/pages/Menu/Carro.jsx";
import { ShopContextProvider } from "./context/shop-context";
import Bowls from "./pages/Menu/Bowls.jsx";
import Burritos from "./pages/Menu/Burritos.jsx";
import Bebidas from "./pages/Menu/Bebidas.jsx";
import Checkout from "./pages/Checkout.jsx";

function App() {
  const [user, setUser] = useState();
  
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    }); 
  });
  return (
        <ShopContextProvider>
          <BrowserRouter>
              <Routes>
                
                <Route index element={<LandingPage />}/>
                <Route path="/Login" element={<LoginForm />} />
                <Route path="/Register" element={<RegisterForm />} />
                <Route path="/Profile" element={<Profile />} />
                <Route path="/Profile_security" element={<Profile_Sec />} />
                <Route path="/Profile_history" element={<ProfileHist />} />
                <Route path="/LandingPage" element={<LandingPage />} />
                <Route path="/Manage-Menu" element={<AdminMenu/>}/>
                <Route path="/Manage-Coupons" element={<AdminPromo/>}/>
                <Route path="/Manage-Historial" element={<AdminHist/>}/>
                <Route path="/Entradas" element={<Entradas />} />
                <Route path="/Bowls" element={<Bowls />} />
                <Route path="/Burritos" element={<Burritos />} />
                <Route path="/Bebidas" element={<Bebidas />} />
                <Route path="/Carro" element={<Carro />} />
                <Route path="/Checkout" element={<Checkout />} />
              </Routes>
              <ToastContainer />
          </BrowserRouter>
        </ShopContextProvider>
  )
}

export default App;
