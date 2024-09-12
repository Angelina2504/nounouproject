import {useState, useEffect} from 'react';
import axiosInstance from '../../services/httpClient';

export default function DeleteUserForm () {

 const handleOnDelete = async (id) => {
        try {
            await axiosInstance.delete(`/users/profile/`);
            setUser((prevUserForm) => prevUserForm.filter(user => user.id !== id));
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'utilisateur', error);
        }
    };

    return(
        <section className="login-container">
            <h1>Se connecter</h1>

            {error && <p className="error">{error}</p>}

            <form className="formLogin" onSubmit={handleLogin}>

                <label htmlFor="email">Email</label>
                <input type="email"
                    placeholder="Entrez votre email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />

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