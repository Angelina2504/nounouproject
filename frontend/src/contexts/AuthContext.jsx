import {createContext, useEffect, useState} from 'react';
import PropTypes from "prop-types";
import axiosInstance from '../services/httpClient.js';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await axiosInstance.get("/auth/session", { withCredentials: true });
                setUser(response.data.user);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false); // on termne le chargement, erreur ou pas
            }
        };

        checkSession();
    }, []);

    // Fonction pour se connecter, sauvant l'utilisateur dans le contexte en cas de succès
    const login = async (email, password) => {
        try {
            const response = await axiosInstance.post('/auth/login',
                { email, password },
                { withCredentials: true }
            );
            setUser(response.data.user);

        } catch(error) {
            console.error(error.response ? error.response.data : error.message);
            throw error;
        }
    };

    // Fonction pour se déconnecter, supprimant l'utilisateur du contexte
    const logout = async () => {
      try {
          await axiosInstance.post('/auth/logout', {}, { withCredentials: true });
          setUser(null);
      } catch(error) {
            console.error(error.response ? error.response.data : error.message);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;
