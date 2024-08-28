import React, { useState, useEffect } from 'react';
import { useCheckConnected } from '../../hooks/useCheckConnected';
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../../services/httpClient";

export default function AddChildForm({ onAddChild }) {
    const { connected } = useCheckConnected();
    const navigate = useNavigate();

    const [child, setChild] = useState({
        firstname: '',
        lastname: '',
        birthdate: '',
        allergy: '',
        userId: connected?.id || null  // Utiliser null si connected n'est pas défini
    });

    // FIXME a-t-on besoin de checker la connexion encore ici ? Ca casse pas le contexte ?
    // useEffect(() => {
    //     if (!connected) {
    //         navigate('/login');  // Redirige vers la page de login si l'utilisateur n'est pas connecté
    //     }
    // }, [connected, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setChild((prevChild) => ({
            ...prevChild,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/children', child);
            onAddChild(response.data);
            setChild({ firstname: '', lastname: '', birthdate: '', allergy: '' });
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'enfant', error);
        }
    };

    return (
        <form className="add-child-form" onSubmit={handleSubmit}>
            <label>Prénom</label>
            <input type="text" name="firstname" value={child.firstname} onChange={handleChange} required/>

            <label>Nom</label>
            <input type="text" name="lastname" value={child.lastname} onChange={handleChange} required/>

            <label>Date de Naissance</label>
            <input type="date" name="birthdate" value={child.birthdate} onChange={handleChange} required/>

            <label>Allergies</label>
            <input type="text" name="allergy" value={child.allergy} onChange={handleChange}/>

            <button type="submit">Ajouter</button>
        </form>
    );
}
