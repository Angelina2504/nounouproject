import {useState} from 'react';
import axiosInstance from '../../services/httpClient';
import { useNavigate } from "react-router-dom";
import {useCheckConnected} from '../../hooks/useCheckConnected.jsx';

export default function DeleteUserForm ({ setIsDeleting }) {
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const {logout} = useCheckConnected();

 const handleDelete = async () => {
        try {

            await axiosInstance.post("/users/check-delete", { password });
            // After deleting the user navigate to /login
            logout();
            navigate("/login");

        } catch (error) {
            setError("Erreur lors de la suppression du compte");
            console.error('Erreur lors de la suppression de l\'utilisateur', error);
        }
    };

    return(
        <section className="login-container">
            <h1>Voulez-vous supprimer votre compte ? Si oui, entrez votre mot de passe. Si non, cliquer sur annuler.</h1>

            {error && <p className="error">{error}</p>}

            <div className="formLogin">

                <label htmlFor="password">Mot de passe</label>
                <input type="password"
                    placeholder="Entrez votre mot de passe"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />

                <button onClick={handleDelete}>Supprimer</button>
                <button onClick={() => setIsDeleting(false) }>Annuler</button>
            </div>

        </section>
    )
}
