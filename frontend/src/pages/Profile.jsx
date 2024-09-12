import { useState, useEffect } from "react";
import axiosInstance from "../services/httpClient";

export default function Profile (onEdit, onDelete) {

    const [user, setUser] = useState([]);

    // // Fonction pour récupérer la liste des users
    const fetchUser = async () => {
        try {
            const response = await axiosInstance.get('/users/profile');
            setUser(response.data.user);
        } catch (error) {
            console.error('Erreur lors de la récupération des enfants', error);
        }
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
                                <button onClick={() => onEdit(user.id)}>Éditer</button>
                                <button onClick={() => onDelete(user.id)}>Supprimer</button>
                            </li>
                    ) : (
                        <li>Aucun utilisateur trouvé</li>
                    )}
                </ul>
            </section>
            
        </>
    );
 }
