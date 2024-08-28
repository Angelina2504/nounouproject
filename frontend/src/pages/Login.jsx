import {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import { useCheckConnected } from "../hooks/useCheckConnected";

import "../styles/login.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const {user, login } = useCheckConnected();

    useEffect(() => {
        // Si l'utilisateur est déjà authentifié, et qu'il arrive quand même sur cette
        // page, on le redirige vers /family
        if (user) {
            navigate("/family");
        }
    }, [user, navigate]);


    const handleLogin = async (e) => {
        e.preventDefault();
        // On réinitialise l'erreur à chaque soumission du formulaire
        setError(null);

        try {
            // Appel à la fonction login du contexte AuthContext
            await login(email, password);

            // Une fois le login terminé, on redirige l'utilisateur vers la page /family
            // S'il est correctement loggué, il sera redirigé vers la page /family sinon il ira sur /login
            navigate("/family");

        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError("Identifiants incorrects. Veuillez réessayer.");
            } else {
                setError("Une erreur est survenue. Veuillez réessayer plus tard.");
            }
        }
    };

    return (
        <section className="login">
            <h2>Se connecter</h2>

            {error && <p className="error">{error}</p>}

            <form className="formLogin" onSubmit={handleLogin}>

                <label htmlFor="">Email</label>
                <input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} required/>

                <label htmlFor="">Mot de passe</label>
                <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} required/>

                <button type="submit">Se connecter</button>
            </form>

        </section>
    )
}
