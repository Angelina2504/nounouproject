import "../../styles/admin.css";
import {useCheckConnected} from '../../hooks/useCheckConnected.jsx';
import {useCallback, useEffect, useState} from 'react';
import axiosInstance from '../../services/httpClient.js';
import {useNavigate} from 'react-router-dom';
import CardTemplate from '../../components/CardTemplate.jsx';

import "../../styles/cardTemplate.css";

export default function Admin() {

    const { user, loading } = useCheckConnected(); // Récupérer l'utilisateur connecté depuis le contexte
    const navigate = useNavigate();
    const [families, setFamilies] = useState([]);

    /**
     * Check if the user is an admin
     * If not, redirect to /family
     */
    // useCallback to avoid recreating the function at each render
    const checkUserIsAdmin = useCallback(async () => {
      try {
          const response = await axiosInstance.get("/auth/is-admin", { withCredentials: true });
          // If user is not admin, or no user authenticated, redirect to login
          if (!response.data || !response.data.isAdmin) {
              navigate('/family');
          }
      } catch (error) {
          console.error('Erreur lors de la vérification des droits administrateurs', error);
      }
    }, [navigate]);

    /**
     * Fetch families from the API
     */
    const fetchFamilies = async () => {
        try {
            const response = await axiosInstance.get('/admin/families'); // API pour récupérer les familles
            setFamilies(response.data.families);
        } catch (error) {
            console.error('Erreur lors du chargement des familles', error);
        }
    };

    // Fetch families when the component is mounted if the user is an admin
    useEffect(() => {
        if (loading) return; // Attendre que la session utilisateur soit chargée

        checkUserIsAdmin()
            .then(() => fetchFamilies());

    }, [user, loading, navigate, checkUserIsAdmin]);


    const handleEdit = (familyId) => {
        navigate(`/admin/family/${familyId}/edit`);
    };

    const handleDelete = async (familyId) => {
        try {
            await axiosInstance.delete(`/api/families/${familyId}`);
            setFamilies((prevFamilies) => prevFamilies.filter(family => family.id !== familyId));
        } catch (error) {
            console.error('Erreur lors de la suppression de la famille', error);
        }
    };

    const handleShowDetails = (familyId) => {
        navigate(`/admin/family/${familyId}`);
    };

    if (loading) return <p>Chargement...</p>;

    return (
        <section className="admin-page">
            <h1>Gestion des Familles</h1>


            <div className="family-cards">
                {families.map((family) => (
                    <CardTemplate
                        key={family.user.id}
                        family={family}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        handleViewDetails={handleShowDetails}
                    />
                ))}
            </div>
        </section>
    );
}
