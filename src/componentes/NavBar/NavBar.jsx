import React from 'react'
import "./NavBar-styles.css"
import logo from "/img/logo.png"
import { Outlet, Link } from "react-router-dom"
function Navbar(){
    return (
        <nav className="nav-bar">
            <div><img src={logo} alt="" className="logo"/></div>
            <h1>LifeBreathe</h1>
            <ul className="items">
            <li><a href="#header">Inicio</a></li>
            <li><a href="#clima">Datos del Aire</a></li>
            <li><a href="#recomendaciones">Recomendaciones para la salud</a></li>
            <li><a href="#compocision">Composicion del Aire</a></li>
            </ul>
            <Outlet/>
        </nav>
        )
    }

export default Navbar
