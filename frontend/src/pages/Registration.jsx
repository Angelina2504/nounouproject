import {useEffect, useState} from 'react';
import axiosInstance from "../services/httpClient";
import { useNavigate } from "react-router-dom";
import { useCheckConnected } from "../hooks/useCheckConnected"; // Importer le contexte d'authentification

import "../styles/register.css"

export default function Registration() {
    const [inscription, setInscription] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: '',
        gender: 'F' // Valeur par défaut
    });
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const [error, setError] = useState("");

    const navigate = useNavigate();
    const { user, login } = useCheckConnected();

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
            const response = await axiosInstance.post("/auth/register", inscription);

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

    useEffect(() => {
        if (user) {
            navigate("/family");
        }
    }, [user, navigate]);

    return (
        <>
        <div className="register-back-button-container">
            <button className="back-button" onClick={() => navigate(-1)}>Retour</button>
        </div>
        <section className="register">
            <h1>S&rsquo;inscrire</h1>

            {error && <p className="error">{error}</p>}

            <form className="formRegister" onSubmit={handleRegister}>
                    <label htmlFor="gender">Genre</label>
                    <select name="gender" value={inscription.gender} onChange={handleChange} required>
                        <option value="M">Homme</option>
                        <option value="F">Femme</option>
                        <option value="O">Autre</option>
                    </select>

                    <label htmlFor="firstname">Prénom</label>
                    <input type="text" name="firstname" value={inscription.firstname} placeholder={'Prénom'}
                           onChange={handleChange} required/>

                    <label htmlFor="lastname">Nom</label>
                    <input type="text" name="lastname" value={inscription.lastname} placeholder={'Nom'}
                           onChange={handleChange} required/>

                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={inscription.email} placeholder={'Email'} onChange={handleChange}
                           required/>

                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" name="password" value={inscription.password} placeholder={'Mot de passe'}
                           onChange={handleChange} required/>

                    <label htmlFor="passwordConfirmation">Confirmation du mot de passe</label>
                    <input type="password" name="passwordConfirmation" value={passwordConfirmation}
                           placeholder={'Confirmation du mot de passe'} onChange={handlePasswordConfirmationChange}
                           required/>

                    <label htmlFor="phoneNumber">Téléphone</label>
                    <input type="text" name="phoneNumber" value={inscription.phoneNumber} placeholder={'Téléphone'}
                           onChange={handleChange} required/>

                    <label htmlFor="address">Adresse</label>
                    <input type="text" name="address" value={inscription.address} placeholder={'Adresse'}
                           onChange={handleChange} required/>

                    <button type="submit">S&rsquo;inscrire</button>

                </form>
            </section>
        </>
    );
}
