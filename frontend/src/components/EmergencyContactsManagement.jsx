import {useState, useEffect, useCallback} from 'react';
import axiosInstance from '../services/httpClient';
import {useLocation, useNavigate} from 'react-router-dom';

import '../styles/emergencyContactsManagement.css';

export default function EmergencyContactsManagement() {
    const location = useLocation();
    const navigate = useNavigate();
    const childrenList = location.state?.childrenList || []; // récupère la liste des enfants passée en paramètre du navigate options
    const userId = location.state?.userId || undefined; // récupère l'id de l'utilisateur passé en paramètre du navigate options
    const [displayAddContactForm, setDisplayAddContactForm] = useState(false);

    const [emergencyContacts, setEmergencyContacts] = useState([]);
    const [newContactForm, setNewContactForm] = useState({
        firstname: '',
        lastname: '',
        gender:  'F', // Valeur par défaut
        relationship: '',
        address: '',
        phone_number: '',
        childId: ''
    });

    const [newEditContactForm, setNewEditContactForm] = useState({
        firstname: '',
        lastname: '',
        gender: 'F',
        relationship: '',
        address: '',
        phone_number: '',
        childId: ''
    });

    const [editingContact, setEditingContact] = useState(null); // Le contact en cours d'édition

    const [isAdmin, setIsAdmin] = useState(false);

    // FIXME this is a copy of the function in Admin.jsx, should be moved to a shared file
    /**
     * Check if the user is an admin, and redirect to the appropriate page.
     * useCallback to avoid recreating the function at each render
     */
    const checkUserIsAdmin = useCallback(async () => {
        try {
            const response = await axiosInstance.get("/auth/is-admin", { withCredentials: true });
            // If user is not admin, or no user authenticated, we will return false
            setIsAdmin(!(!response.data || !response.data.isAdmin));
            return isAdmin;
        } catch (error) {
            console.error('Erreur lors de la vérification des droits administrateurs', error);
        }
    }, [isAdmin]);


    /**
     * Fetch emergency contacts from the API, for children of the connected user
     * @returns {Promise<void>}
     */
    const fetchEmergencyContacts = useCallback( async (isAdmin = false) => {
        try {
            const emergencyContactsURL = (isAdmin && userId) ? `/admin/emergency-contacts?userId=${userId}` : '/emergency-contacts';
            const response = await axiosInstance.get(emergencyContactsURL);
            setEmergencyContacts(response.data.childrenEmergencyContacts);
        } catch (error) {
            console.error('Erreur lors de la récupération des contacts d\'urgence', error);
        }
    }, [userId]);

    /**
     * Fetch emergency contacts when the component is mounted
     */
    useEffect(() => {
        checkUserIsAdmin();
    }, [checkUserIsAdmin]);


    useEffect(() => {
        fetchEmergencyContacts(isAdmin);
    }, [fetchEmergencyContacts, isAdmin]);

    /**
     * Reset the form and cancel editing mode
     */
    const resetAddForm = () => {
        setDisplayAddContactForm(false); // Hide add form
        setNewContactForm({
            firstname: '',
            lastname: '',
            gender: 'F',
            relationship: '',
            address: '',
            phone_number: '',
            childId: ''
        });
    };

    /**
     * Reset the form and cancel editing mode
     */
    const resetEditForm = () => {
        setEditingContact(null);
        setNewContactForm({
            firstname: '',
            lastname: '',
            gender:  'F', // Valeur par défaut
            relationship: '',
            address: '',
            phone_number: '',
            childId: ''
        });
    };

    // Back button function
    const handleBack = () => {
        if (isAdmin && userId) {
            // Redirige vers l'URL d'administration avec l'ID de l'utilisateur
            navigate(`/admin/families/${userId}`);
        } else {
            navigate('/family'); // Redirige les utilisateurs non-admins vers la page de la famille
        }
    };

    /**
     * Handle the change of the selected child
     * @param e
     */
    const handleSelectChildChange = (e) => {
        const {name, value} = e.target;
        setNewContactForm((prevNewContactForm) => ({
            ...prevNewContactForm,
            [name]: value
        }));
    };

    /**
     * Handle the change of the form fields in the edit form
     * @param e
     */
    const handleEditFormChange = (e) => {
        const { name, value } = e.target;
        setNewEditContactForm((prevForm) => ({
            ...prevForm,
            [name]: value
        }));
    };

    /**
     * Handle the change of the form fields
     * @param e
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewContactForm((prevNewContactForm) => ({
            ...prevNewContactForm,
            [name]: value
        }));
    };

    /**
     * Handle adding a new emergency contact
     * @returns {Promise<void>}
     */
    const handleAddContact = async (e) => {
        e.preventDefault();
        try {

            const payload = {
                    emergencyContact: newContactForm
            };

            await axiosInstance.post(`/emergency-contacts/create`, payload);

            // Rafraîchir les contacts d'urgence après la mise à jour réussie
            await fetchEmergencyContacts();

            // Réinitialiser le formulaire
            resetAddForm()
        } catch (error) {
            console.error('Erreur lors de l\'ajout du contact', error);
        }
    };

    /**
     * Handle editing an emergency contact
     * @param childId
     * @param contact
     */
    const handleEditContact = (childId, contact) => {
        setEditingContact(contact);
        setNewEditContactForm({
            ...contact,
            childId: childId
        });
    };

    /**
     * Handle saving the edited contact
     * @returns {Promise<void>}
     */
    const handleSaveEdit = async (e) => {
        e.preventDefault();
        try {

            const payload = {
                emergencyContact: {
                    ...newEditContactForm,
                    childId: newEditContactForm.childId
                }
            }

            await axiosInstance.put(`/emergency-contacts/edit/${editingContact.id}`, payload);
            // Rafraîchir les contacts d'urgence après la mise à jour réussie
            await fetchEmergencyContacts();
            // Réinitialiser le formulaire et l'état d'édition
            resetEditForm();
        } catch (error) {
            console.error('Erreur lors de la modification du contact', error);
        }
    };

    // Function to handle toggling the add contact form and reset the form if closing
    const toggleAddContactForm = () => {
        if (displayAddContactForm) {
            resetAddForm();  // Reset the form fields when the form is being hidden
        }
        setDisplayAddContactForm(!displayAddContactForm); // Toggle form visibility
    };

    /**
     * Handle canceling the add form
     */
    const handleCancelAdd = () => {
        resetAddForm();
    };

    /**
     * Handle canceling the editing to reset the form
     */
    const handleCancelEdit = () => {
        resetEditForm();
    };

    /**
     *
     * @returns {Promise<void>}
     * @param contact
     * @param childId
     */
    const handleDeleteContact = async (contact, childId) => {
        if (!window.confirm(`Êtes-vous sûr de vouloir supprimer cet utilisateur ${contact.firstname} ${contact.lastname} ?`)) return;

        try {
            await axiosInstance.delete(`/emergency-contacts/delete/${contact.id}?childId=${childId}`);
            // Rafraîchir les contacts d'urgence après la mise à jour réussie
            await fetchEmergencyContacts();
        } catch (error) {
            console.error('Erreur lors de la suppression du contact', error);
        }
    };


    return (
        <div className="emergency-contacts-manager-container">
            <div className="back-button-container">
                <button className="back-button" onClick={handleBack}>Retour</button>
            </div>

            <h1>{!isAdmin ? 'Gestion des ' : ''} Contacts d&apos;Urgence
                {!isAdmin &&
                    <button className={displayAddContactForm ? 'contact-cancel-button' : 'contact-add-button'}
                        onClick={toggleAddContactForm}>
                        {displayAddContactForm ? 'Annuler' : 'Ajouter un Contact d\'Urgence'}
                    </button>}
                </h1>

            {displayAddContactForm && (
                <form className="emergency-contact-form-container" onSubmit={handleAddContact}>
                    <div>
                        <label htmlFor="childId"><span className="bold-text">Enfant</span></label>
                        <select name="childId" value={newContactForm.childId} onChange={handleSelectChildChange} required>
                            <option value="">Sélectionner un enfant</option>
                            {childrenList.map(child => (
                                <option key={child.id} value={child.id}>{child.firstname} {child.lastname}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="gender">Genre </label>
                        <select name="gender" value={newContactForm.gender} onChange={handleChange} required>
                            <option value="M">Homme</option>
                            <option value="F">Femme</option>
                            <option value="O">Autre</option>
                        </select>

                        <label htmlFor="firstname">Prénom </label>
                        <input
                            name="firstname"
                            type="text"
                            placeholder="Prénom"
                            value={newContactForm.firstname}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="lastname">Nom </label>
                        <input
                            name="lastname"
                            type="text"
                            placeholder="Nom"
                            value={newContactForm.lastname}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="relationship">Relation </label>
                        <input
                            name="relationship"
                            type="text"
                            placeholder="Relation"
                            value={newContactForm.relationship}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="address">Adresse </label>
                        <input
                            name="address"
                            type="text"
                            className="editable-address"
                            placeholder="Adresse"
                            value={newContactForm.address}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="phoneNumber">Numéro de téléphone </label>
                        <input
                            name="phone_number"
                            type="tel"
                            placeholder="Numéro de téléphone"
                            value={newContactForm.phone_number}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="contact-buttons-container">
                        <button className="contact-edit-button" type="submit">Ajouter un Contact</button>
                        <button className="contact-cancel-button" onClick={handleCancelAdd}>Annuler</button> {/* Now resets the form */}
                    </div>

                </form>
            )}

            <h3>Liste des Contacts d&apos;Urgence par Enfant</h3>

            <div className="emergency-contacts-list">
                {emergencyContacts.length === 0 ? (
                    <p>Aucun contact d&apos;Urgence disponible.</p>
                ) : (
                    emergencyContacts.map(child => (
                        <div key={child.id} className="child-contacts-block">
                            <h2>Enfant : <strong>{child.firstname} {child.lastname}</strong></h2>
                            <div className="contact-details-block">
                                {child.emergency_contacts.length === 0 ? (
                                    <p>Aucun contact d&apos;Urgence enregistré pour cet enfant.</p>
                                ) : ''}
                                {child.emergency_contacts.map(contact => (
                                    <form key={contact.id} className="contact-details" onSubmit={handleSaveEdit}>
                                        {editingContact && editingContact.id === contact.id ? (
                                            <>
                                                {/* Editing Mode */}
                                                <p>
                                                    <span className="bold-text">Genre : </span>
                                                    <select className="editable-field" name="gender"
                                                            value={newEditContactForm.gender}
                                                            onChange={handleEditFormChange}
                                                            required
                                                    >
                                                        <option value="M">Homme</option>
                                                        <option value="F">Femme</option>
                                                        <option value="O">Autre</option>
                                                    </select>
                                                </p>
                                                <p>
                                                    <span className="bold-text">Prénom : </span>
                                                    <input
                                                        name="firstname"
                                                        type="text"
                                                        value={newEditContactForm.firstname}
                                                        onChange={handleEditFormChange}
                                                        placeholder="Prénom"
                                                        required
                                                    />
                                                </p>
                                                <p>
                                                    <span className="bold-text">Nom : </span>
                                                    <input
                                                        name="lastname"
                                                        type="text"
                                                        value={newEditContactForm.lastname}
                                                        onChange={handleEditFormChange}
                                                        placeholder="Nom"
                                                        required
                                                    />
                                                </p>
                                            <p>
                                                <span className="bold-text">Relation : </span>
                                                <input
                                                    name="relationship"
                                                    type="text"
                                                    value={newEditContactForm.relationship}
                                                    onChange={handleEditFormChange}
                                                    placeholder="Relation"
                                                    required
                                                />
                                            </p>
                                                <p>
                                                    <span className="bold-text">Téléphone : </span>
                                                    <input
                                                        name="phone_number"
                                                        type="tel"
                                                        value={newEditContactForm.phone_number}
                                                        onChange={handleEditFormChange}
                                                        placeholder="Numéro de téléphone"
                                                        required
                                                    />
                                                </p>
                                                <p>
                                                    <span className="bold-text">Adresse : </span>
                                                    <input
                                                        name="address"
                                                        type="text"
                                                        className="editable-address"
                                                        value={newEditContactForm.address}
                                                        onChange={handleEditFormChange}
                                                        placeholder="Adresse"
                                                        required
                                                    />
                                                </p>
                                                <div className="contact-buttons-container">
                                                    <button
                                                        className="contact-save-button"
                                                        type="submit"
                                                    >
                                                        Enregistrer
                                                    </button>
                                                    <button
                                                        className="contact-cancel-button"
                                                        onClick={handleCancelEdit}
                                                    >
                                                        Annuler
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                {/* Display Mode */}
                                                <p className="contact-details-name"><strong>{contact.firstname} {contact.lastname}</strong></p>
                                                <p><span
                                                    className="bold-text">Genre :</span> {contact.gender === 'M' ? 'Homme' : (contact.gender === 'F' ? 'Femme' : 'Autre')}
                                                </p>
                                                <p><span className="bold-text">Relation : </span>{contact.relationship}
                                                </p>
                                                <p className={isAdmin ? 'bold-text contact-red-text' : ''}><span className="bold-text">Téléphone : </span>{contact.phone_number}
                                                </p>
                                                <p><span className="bold-text">Adresse : </span>{contact.address}</p>
                                                {!isAdmin &&
                                                    <div className="contact-buttons-container">
                                                        <button
                                                            className="contact-edit-button"
                                                            onClick={() => handleEditContact(child.id, contact)}
                                                        >
                                                            Éditer
                                                        </button>
                                                        <button
                                                            className="contact-delete-button"
                                                            onClick={() => handleDeleteContact(contact, child.id)}
                                                        >
                                                            Supprimer
                                                        </button>
                                                    </div>
                                                }
                                            </>
                                        )}
                                    </form>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>

        </div>
    );
}
