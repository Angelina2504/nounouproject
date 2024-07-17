import Logo from "../assets/pictures/logo.png"
import { Link } from "react-router-dom"

import "../styles/navbar.css"

export default function Navbar(isLoggedIn) {
    return(
        <section className="navbar">
       <Link to="/"> <img className="logo" src={Logo} alt="Logo : le message des signes et des mots est entouré de jouets" /></Link>


       {isLoggedIn === true || undefined ? <Link to="">Se connecter</Link> : <button className="deconexion">se déconnecter</button> }
       
        
        </section>
    );
} 