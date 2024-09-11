import { useState, useEffect } from "react";
import ProfilList from "../components/ProfilList"
import axiosInstance from "../services/httpClient";

export default function Profile () {

    const [users, setUser] = useState([]);

    // // Fonction pour récupérer la liste des users
    const fetchTutors = async () => {
        try {
            const response = await axiosInstance.get('/tutors');
            setUser(response.data.tutors);
        } catch (error) {
            console.error('Erreur lors de la récupération des enfants', error);
        }
    };

    return (          
        <>
            <ProfilList/>
            
        </>
    );
 }
