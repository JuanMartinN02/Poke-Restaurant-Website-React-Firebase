import React from 'react'
import { Link } from 'react-router-dom';
import "../assets/styles/Navbar.css"

function Navbar() {
  return (
    <>
    
        <div className='nav-container'>
            <h1 className='h1-nav'>NUESTRO MENU!</h1>
            <nav className='navbar'>
                <ul>
                    <li className='choosen'>
                        <Link to={"/Entradas"}>ENTRADAS</Link>
                    </li>

                    <li className='navOption'>
                        <Link to={"/Bowls"}>BOWLS</Link>
                    </li>

                    <li className='navOption'>
                        <Link to={"/Burritos"} className='tittle'>BURRITOS</Link>
                    </li>

                    <li className='navOption'>    
                        <Link to={"/Bebidas"}>BEBIDAS</Link>
                    </li>
                </ul>
            </nav>
        </div>
    </>
  )
}

export default Navbar