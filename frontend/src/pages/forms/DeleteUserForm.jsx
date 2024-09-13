import {useState, useEffect} from 'react';
import axiosInstance from '../../services/httpClient';

export default function DeleteUserForm () {
    const [password, setPassword] = useState("");
  


 const handleDelete = async (id) => {
        try {

            /*
            - verifier compte ==> back confirmation du couple id connecté et password ( back connait l'id user connecté)
            >> définir une route qui va récupérer ce user avec comme param le password uniquement (l'id sera récupéré côté back encore une fois)
            /!\ on serait tenté de faire un GET et d'envoyer le pass en clair dans l'url... get(/users?password=xxxxxx) évidemment, c'est interdit... on doit l'envoyer dans un payload (body), donc un post.

            - si ok , le back doit me retourner un user Id
            >> cette route retourne l'id de l'user trouvé, ou une erreur si ça ne matche pas

            - recupère l'id et l'envoie dans le delete
            >> définir la route pour delete un user, le controleur et le repository 
            */

            await axiosInstance.delete(`/users/{userId}`);
            setUser((prevUserForm) => prevUserForm.filter(user => user.id !== id));
        } catch (error) {
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
                <button type="submit">Annuler</button>
            </form>

        </section>
    )
}