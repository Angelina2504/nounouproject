import Logo from "../assets/pictures/logo.png";
import { Link } from "react-router-dom";
import { useCheckConnected } from "../hooks/useCheckConnected"

import "../styles/navbar.css"
import {useEffect, useState} from 'react';
import axiosInstance from '../services/httpClient.js';

export default function Navbar() {
    const { user, logout } = useCheckConnected();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkIsAdmin = async () => {
            try {
                const response = await axiosInstance.get("/auth/is-admin", { withCredentials: true });
                setIsAdmin(response.data.isAdmin);
            } catch (error) {
                setIsAdmin(false);
            }
        };

        checkIsAdmin();
    }, [user]);

    return(
        <section className="navbar">
       <Link to="/"> <img className="logo" src={Logo} alt="Logo : le message des signes et des mots est entouré de jouets" /></Link>

       { user ? (
            <>
                <button className="deconexion" onClick={logout} >Se déconnecter</button>
                {isAdmin ? (
                    <Link to="/admin">Administration</Link>) : ''}
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
