import Logo from "../assets/pictures/logo.png"
import { Link } from "react-router-dom"

export default function Navbar(isLoggedIn) {
    return(
        <>
        <img className="logo" src={Logo} alt="Logo : le message des signes et des mots est entouré de jouets" />


       {isLoggedIn === true || undefined ? <Link to="">Se connecter</Link> : <button>se déconnecter</button> }
       
        
        </>
    );
} 