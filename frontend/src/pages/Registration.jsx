import { useState } from "react";
import axiosInstance from "../services/httpClient";
import { useNavigate } from "react-router-dom"; 
import { useAuth } from "../contexts/AuthContext"; // Importer le contexte d'authentification

import "../styles/register.css"

export default function Registration() {
    const [inscription, setInscription] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: ""
    });
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const [error, setError] = useState("");

    const navigate = useNavigate();
    const { login } = useAuth();

    // Fonction pour gérer les changements du champ de confirmation du mot de passe
    const handlePasswordConfirmationChange = (e) => {
        setPasswordConfirmation(e.target.value);
    };

    // Fonction pour gérer les changements des champs du formulaire, excepté le mot de passe de confirmation qui ne doit pas
    // être transmis à l'appel API, sa validation est faite uniquement côté front
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInscription((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Fonction pour gérer l'inscription d'un nouvel utilisateur
    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

         if (inscription.password && passwordConfirmation &&
             inscription.password !== passwordConfirmation) {
            setError("Les mots de passe ne correspondent pas.");
             return;
        }

        try {
            const response = await axiosInstance.post(
                "/auth/register",
                inscription);

            if (response.status === 201) {
        
                await login(inscription.email, inscription.password);
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
        <h2>S&apos;inscrire</h2>

        {error && <p className="error">{error}</p>}

        <form className="formRegister" onSubmit={handleRegister}>

            <label htmlFor="firstname">Prénom</label>
            <input  type="text" name="firstname" value={inscription.firstname} onChange={handleChange} required />

            <label htmlFor="lastname">Nom</label>
            <input  type="text" name="lastname" value={inscription.lastname} onChange={handleChange} required />

            <label htmlFor="email">Email</label>
            <input  type="email" name="email" value={inscription.email} onChange={handleChange} required />

            <label htmlFor="password">Mot de passe</label>
            <input  type="password" name="password" value={inscription.password} onChange={handleChange} required />

            <label htmlFor="passwordConfirmation">Confirmation du mot de passe</label>
            <input type="password" name="passwordConfirmation" value={passwordConfirmation} onChange={handlePasswordConfirmationChange} required />

            <label htmlFor="phoneNumber">Téléphone</label>
            <input  type="text" name="phoneNumber" value={inscription.phoneNumber} onChange={handleChange} required />

            <label htmlFor="address">Adresse</label>
            <input  type="text" name="address" value={inscription.address} onChange={handleChange} required />

            <button type="submit">S&apos;inscrire</button>

        </form>
        </section>
    );
}
