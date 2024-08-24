import { Navigate, Outlet } from "react-router-dom";
import { useCheckConnected } from "../hooks/useCheckConnected"

export default function PrivateRoute() {
    // Vérifie si l'utilisateur est connecté = s'il est dans le contexte, et s'il est en cours de chargement
    const { user, loading } = useCheckConnected();

    // Si on est en cours de chargement, on affiche un message de chargement
    if (loading) {
        return <p>Chargement en cours...</p>;
    }

    // Si l'utilisateur n'est pas connecté, on redirige vers la page de login
    if (!user) {
        return <Navigate to="/login" />;
    }

    // SI l'utilisateur est connecté, on affiche le composant enfant
    return <Outlet />;
}
