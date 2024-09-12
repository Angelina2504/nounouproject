import { useState, useEffect } from "react";
import UpdateUserForm from "./forms/UpdateUserForm";
import axiosInstance from "../services/httpClient";

export default function Profile () {

    const [user, setUser] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    // // Fonction pour récupérer la liste des users
    const fetchUser = async () => {
        try {
            const response = await axiosInstance.get('/users/profile');
            setUser(response.data.user);
        } catch (error) {
            console.error('Erreur lors de la récupération des enfants', error);
        }
    };

    const handleSave = async () => {
        await fetchUser(); // Recharger la liste des enfants après la sauvegarde
        setIsEditing(false); // Fermer le formulaire d'édition
    };

    useEffect(() => {
        fetchUser();
    },[]);


    return (          
        <>
            <section>
                <ul className="user-list">
                    { user ? (
                            <li key={user.id}>
                                {user.gender} {user.firstname} {user.lastname} - {user.email} - {user.phone_number} {user.address} 
                                {/*<button onClick={() => onEdit(user)}>Éditer</button>*/}
                                <button onClick={() => setIsEditing(true)}>Éditer</button>
                                <button onClick={() => handleOnDelete(user.id)}>Supprimer</button>
                            </li>
                    ) : (
                        <li>Aucun utilisateur trouvé</li>
                    )}
                </ul>
            </section>
            
            {isEditing && (
                <section className="edit-user-section">
                    <h2>Éditer mon profil</h2>
                    <UpdateUserForm 
                    user={user} 
                    onSave={handleSave} />
                </section>
            )}        

        </>
    );
 }
