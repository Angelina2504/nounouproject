import {useState} from 'react';
import axiosInstance from '../../services/httpClient';
import { useNavigate } from "react-router-dom";

export default function DeleteUserForm ({ setIsDeleting }) {
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

 const handleDelete = async () => {
        try {

            await axiosInstance.post("/users/checkDelete", { password });
            // After deleting the user navigate to /login
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

            <form className="formLogin" onSubmit={handleDelete}>

                <label htmlFor="password">Mot de passe</label>
                <input type="password"
                    placeholder="Entrez votre mot de passe"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Supprimer</button>
                <button onClick={() => setIsDeleting(false) }>Annuler</button>
            </form>

        </section>
    )
}