import "../../styles/admin/admin.css";
import {useCheckConnected} from '../../hooks/useCheckConnected.jsx';
import {useCallback, useEffect} from 'react';
import axiosInstance from '../../services/httpClient.js';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';

export default function Admin() {

    const { user, loading } = useCheckConnected(); // Récupérer l'utilisateur connecté depuis le contexte
    const navigate = useNavigate();
    const location = useLocation()

    /**
     * Check if the user is an admin, and redirect to the appropriate page.
     * useCallback to avoid recreating the function at each render
     */
    const checkUserIsAdmin = useCallback(async () => {
      try {
          const response = await axiosInstance.get("/auth/is-admin", { withCredentials: true });
          // If user is not admin, or no user authenticated, we will redirect to login
          return !(!response.data || !response.data.isAdmin);
      } catch (error) {
          console.error('Erreur lors de la vérification des droits administrateurs', error);
      }
    }, []);

    // Fetch families when the component is mounted if the user is an admin
    useEffect(() => {
        if (loading) return; // Attendre que la session utilisateur soit chargée

        // check if user is admin, if not, redirect to family page, else, go to admin/families
        checkUserIsAdmin()
            .then((isAdmin) => {
                if (isAdmin && location.pathname === "/admin") {
                    navigate('/admin/families');
                } else if (!isAdmin) {
                    navigate('/family');
                }
            });

    }, [user, loading, navigate, checkUserIsAdmin, location]);

    if (loading) return <p>Chargement...</p>;

    return (
        <section className="admin-page">
            <h1>Gestion des Familles</h1>

            <Outlet />

        </section>
    );
}
