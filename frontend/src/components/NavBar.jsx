import Logo from '../assets/pictures/logo2.png';
import {Link} from 'react-router-dom';
import {useCheckConnected} from '../hooks/useCheckConnected';
import {useEffect, useState} from 'react';
import axiosInstance from '../services/httpClient.js';

import '../styles/navbar.css';

export default function Navbar() {
    const {user, logout} = useCheckConnected();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkIsAdmin = async () => {
            try {
                const response = await axiosInstance.get('/auth/is-admin', {withCredentials: true});
                setIsAdmin(response.data.isAdmin);
            } catch (error) {
                setIsAdmin(false);
            }
        };

        checkIsAdmin();
    }, [user]);

    return (
        // <section className="navbar">
        //
        //     <Link to="/"> <img className="logo" src={Logo}
        //                        alt="Logo : le message des signes et des mots est entouré de jouets"/></Link>
        //     {user ? (
        //         <>
        //             {isAdmin ? (
        //                 <Link className="navbar-button" to="/admin">Administration</Link>) : ''}
        //                 <Link className="navbar-button" to="/profile">Mon Profil</Link>
        //                 <Link className="navbar-button" to="/family">Ma Famille</Link>
        //                 <button className="deconnexion" onClick={logout}>Se déconnecter</button>
        //         </>
        //     ) : (
        //         <>
        //             <Link className="navbar-button" to="/login">Se connecter</Link>
        //             &nbsp;&nbsp;
        //             <Link className="navbar-button" to="/register">S&rsquo;inscrire</Link>
        //         </>
        //     )
        //
        //     }
        //
        // </section>

        <section className="navbar">
            <div className="navbar-left">
                <Link to="/"><img className="logo" src={Logo} alt="Logo"/></Link>
                {user && (
                    <>
                    {isAdmin ? (
                        <Link className="navbar-button" to="/admin">Administration</Link>) : ''}
                        <Link className="navbar-button" to="/family">Ma Famille</Link>
                        <Link className="navbar-button" to="/profile">Mon Profil</Link>
                        {user.isAdmin && <Link className="navbar-button" to="/admin">Administration</Link>}
                    </>
                )}
            </div>
            {user && (
                <div className="navbar-right">
                    <button className="deconnexion" onClick={logout}>Se déconnecter</button>
                </div>
            )}
        </section>
    );
}
