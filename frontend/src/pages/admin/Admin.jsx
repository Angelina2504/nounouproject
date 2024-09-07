import "../../styles/admin.css";
import {useCheckConnected} from '../../hooks/useCheckConnected.jsx';
import {useCallback, useEffect} from 'react';
import axiosInstance from '../../services/httpClient.js';
import {Outlet, useNavigate} from 'react-router-dom';

export default function Admin() {

    const { user, loading } = useCheckConnected(); // Récupérer l'utilisateur connecté depuis le contexte
    const navigate = useNavigate();

    /**
     * Check if the user is an admin, and redirect to the appropriate page.
     * useCallback to avoid recreating the function at each render
     */
    const checkUserIsAdmin = useCallback(async () => {
      try {
          const response = await axiosInstance.get("/auth/is-admin", { withCredentials: true });
          // If user is not admin, or no user authenticated, redirect to login
          if (!response.data || !response.data.isAdmin) {
              navigate('/family');
          } else {
              navigate('/admin/families');
          }
      } catch (error) {
          console.error('Erreur lors de la vérification des droits administrateurs', error);
      }
    }, [navigate]);

    // Fetch families when the component is mounted if the user is an admin
    useEffect(() => {
        if (loading) return; // Attendre que la session utilisateur soit chargée

        checkUserIsAdmin();

    }, [user, loading, navigate, checkUserIsAdmin]);

    if (loading) return <p>Chargement...</p>;

    return (
        <section className="admin-page">
            <h1>Gestion des Familles</h1>

            <Outlet />

        </section>
    );
}
