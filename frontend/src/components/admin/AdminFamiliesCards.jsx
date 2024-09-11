import { useEffect, useState } from 'react';
import axiosInstance from '../../services/httpClient.js';
import CardTemplate from './CardTemplate.jsx';

export default function AdminFamiliesCards() {
    const [families, setFamilies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerms, setSearchTerms] = useState('');

    const fetchFamilies = async (search = '') => {
        setLoading(true); // On active le chargement
        try {
            // If a search term is provided, add it to the query string with query parameter search, otherwise, fetch all families
            // The URL will look like /admin/families?search=xxxxxx or /admin/families
            const response = await axiosInstance.get(`/admin/families${search ? `?search=${search}` : ""}`);
            setFamilies(response.data.families);
        } catch (error) {
            console.error('Erreur lors du chargement des familles', error);
        } finally {
            setLoading(false); // Désactiver le chargement
        }
    };

    useEffect(() => {
        fetchFamilies();
    }, []);


    /**
     * Handle input changes for the search field.
     * @param {Event} e - the event triggered when the user types in the search field
     */
    const handleSearchChange = (e) => {
        setSearchTerms(e.target.value);
    };

    /**
     * Handle search submission.
     * When the user clicks the search button, this function will trigger the fetchFamilies call with the search term.
     */
    const handleSearchSubmit = (e) => {
        e.preventDefault(); // Prevent the refresh of the page on form submission
        fetchFamilies(searchTerms);
    };

    return (
        <section className="admin-families-cards">
            {/* Ajout d'un header pour le bandeau de recherche */}
            <div className="family-search-header">
                <form className="family-search-container" onSubmit={handleSearchSubmit}>
                    <label htmlFor="family-search">Rechercher une famille</label>
                    <input name="family-search"
                           type="text"
                           value={searchTerms}
                           placeholder="Rechercher une famille"
                           onChange={handleSearchChange}
                    />
                    <button className="family-search-button" type="submit">Rechercher</button>
                    <small className="family-search-hint">Recherche par prénom, nom ou email d'utilisateur, ou par prénom ou nom d'enfant</small>
                </form>
            </div>

            {/* Affichage du chargement pendant la récupération des données */}
            {loading ? (
                <p>Chargement des familles...</p>
            ) : (
                <div className="family-cards">
                    {/* Affichage des cartes des familles ou d'un message si aucune famille trouvée */}
                    {families.length > 0 ? (
                        families.map((family) => (
                            <CardTemplate
                                key={family.user.id}
                                family={family}
                            />
                        ))
                    ) : (
                        <p className="no-result-text">Aucun résultat.</p> // Message lorsque la liste des familles est vide
                    )}
                </div>
            )}
        </section>
    );
}
