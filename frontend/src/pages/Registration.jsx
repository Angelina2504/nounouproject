import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import { useAuth } from "../contexts/AuthContext"; // Importer le contexte d'authentification

import "../styles/register.css"

export default function Registration() {
    const [inscription, setInscription] = useState({
        email: "",
        mp: "",
        confirmationMp: ""
    });

    const [error, setError] = useState("");

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInscription((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

         if (inscription.mp !== inscription.confirmationMp) {
            setError("Les mots de passe ne correspondent pas");
             return;
        }

        try {
            const response = await axios.post("http://localhost:3333/auth/register", {
                email: inscription.email,
                password: inscription.mp
            });

            if (response.status === 201) {
        
                await login(inscription.email, inscription.mp);
                navigate("/family"); 
            } else {
                setError("Erreur lors de l'inscription : " + response.data.message);
            }
        } catch (error) {
            setError("Erreur lors de l'inscription : " + (error.response?.data?.message || error.message));
        }
    };
    

    return(
        <section className="register">
        <h2>S'inscrire</h2>

        {error && <p className="error">{error}</p>}

        <form className="formRegister" onSubmit={handleRegister}>

            <label htmlFor="email">email</label>
            <input  type="email" name="email" value={inscription.email} onChange={handleChange} required />

            <label htmlFor="mp">Mot de passe</label>
            <input  type="password" name="mp" value={inscription.mp} onChange={handleChange} required />


            <label htmlFor="confirmationMp">Confirmation du mot de passe</label>
            <input type="password" name="confirmationMp" value={inscription.confirmationMp} onChange={handleChange} required />

            <button type="submit">S'inscrire</button>

        </form>
        </section>
    );
}