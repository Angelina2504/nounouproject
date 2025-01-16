import Logo from '../assets/pictures/logo.png';
import {Link, useNavigate} from 'react-router-dom';
import {useCheckConnected} from '../hooks/useCheckConnected';
import {useEffect, useState} from 'react';
import axiosInstance from '../services/httpClient.js';

import '../styles/navbar.css';

export default function Navbar() {
    const {user, logout} = useCheckConnected();
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    const checkIsAdmin = async () => {
        try {
            const response = await axiosInstance.get('/auth/is-admin', {withCredentials: true});
            setIsAdmin(response.data.isAdmin);
        } catch (error) {
            setIsAdmin(false);
        }
    };

    useEffect(() => {
        // Checks if the user is connected and if he is an admin, redirect to /admin
        checkIsAdmin()
            .then(() => {
                if (user && isAdmin) {
                    navigate('/admin');
                    //else, if the user is connected but not an admin, redirect to /family
                } else if (user && !isAdmin) {
                    navigate('/family');
                } else {
                    //if the user is not connected, redirect to /login (can this else happen?)
                    navigate('/login');
                }
            });
    }, [user, isAdmin, navigate]);


    return (
        <section className="navbar">
            <div className="navbar-left">
                <Link to="/"><img className="logo" src={Logo} alt="Logo"/></Link>
                {user && (
                    <>
                        {!isAdmin && <Link className="navbar-button" to="/family">Ma Famille</Link>}
                        {isAdmin && <Link className="navbar-button" to="/admin">Administration</Link>}
                        {isAdmin && <Link className="navbar-button" to="/admin/download">Download</Link>}
                        <Link className="navbar-button" to="/profile">Mon Profil</Link>
                        <Link className="navbar-button" to="/upload">Upload</Link>
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
