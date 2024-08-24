import Logo from "../assets/pictures/logo.png";
import { Link } from "react-router-dom";
import { useCheckConnected } from "../hooks/useCheckConnected"


import "../styles/navbar.css"

export default function Navbar() {
    const { user, logout } = useCheckConnected();

    return(
        <section className="navbar">
       <Link to="/"> <img className="logo" src={Logo} alt="Logo : le message des signes et des mots est entouré de jouets" /></Link>

       { user ? (
            <>
                <button className="deconexion" onClick={logout} >Se déconnecter</button>
                <Link to="/profile">Mon Profil</Link>
                <Link to="/family">Ma Famille</Link>
            </>
            ) : (
            <>
                <Link to="/login">Se connecter</Link>
                    &nbsp;&nbsp;
                <Link to="/register">S&rsquo;inscrire</Link>
            </>
            )
        
        }

        </section>
    );
} 
