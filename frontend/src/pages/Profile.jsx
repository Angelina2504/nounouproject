import { useState, useEffect } from "react";
import UpdateUserForm from "./forms/UpdateUserForm";
import axiosInstance from "../services/httpClient";
import DeleteUserForm from "./forms/DeleteUserForm";

import '../styles/profile.css';
import {useNavigate} from 'react-router-dom';

export default function Profile () {
    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        gender: '' || 'F',
        email: '',
        phone_number: '',
        address: ''
    });

    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false); // To manage delete mode
    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
            const response = await axiosInstance.get('/users/profile');
            setUser(response.data.user);
        } catch (error) {
            console.error('Erreur lors de la récupération du profil utilisateur', error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const handleDeleteClick = () => {
        setIsDeleting(true);
    };

    const handleUpdateSave = async (updatedData) => {
        try {

            const payload = {
                gender: updatedData.gender,
                firstname: updatedData.firstname,
                lastname:updatedData.lastname,
                email:updatedData.email,
                phoneNumber:updatedData.phone_number,
                address: updatedData.address
                // userId est géré par le controleur qui récupère l'id du user de la session
            };

            await axiosInstance.put('/users/profile/edit', payload);
            setUser(updatedData);
            setIsEditing(false);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du profil utilisateur', error);
        }
    };

    return (
        // <h1>Détails du Profil</h1>
        <section className="profile-container">
            <div className="back-button-container">
                <button className="back-button" onClick={() => navigate(-1)}>Retour</button>
            </div>

            {/* Render the profile details when not editing or deleting */}
            {!isEditing && !isDeleting && (
                <div className="profile-details">
                    <div className="profile-field">
                        <h1>Mon profil : {user.firstname} {user.lastname.toUpperCase()}</h1>
                    </div>
                    <div className="profile-field">
                        <label className="no-margin-bottom">Genre :</label>
                        <p>{user.gender === 'M' ? 'Homme' : user.gender === 'F' ? 'Femme' : 'Autre'}</p>
                    </div>

                    <div className="profile-field">
                        <label className="no-margin-bottom">Email :</label>
                        <p>{user.email}</p>
                    </div>

                    <div className="profile-field">
                        <label className="no-margin-bottom">Téléphone :</label>
                        <p>{user.phone_number}</p>
                    </div>

                    <div className="profile-field">
                        <label className="no-margin-bottom">Adresse :</label>
                        <p>{user.address}</p>
                    </div>

                    <div className="profile-buttons-container">
                        <button className="edit-button" onClick={handleEditClick}>Éditer</button>
                        <button className="delete-button" onClick={handleDeleteClick}>Supprimer</button>
                    </div>
                </div>
            )}

            {/* Render the update form when editing */}
            {isEditing && (
                <UpdateUserForm
                    user={user}
                    onSave={handleUpdateSave}
                    onCancel={handleCancelEdit}
                />
            )}

            {/* Render the delete form when deleting */}
            {isDeleting && (
                <DeleteUserForm
                    setIsDeleting={setIsDeleting}
                />
            )}
        </section>
    );
 }
