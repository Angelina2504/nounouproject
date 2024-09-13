import { useState, useEffect } from 'react';
import axiosInstance from '../services/httpClient';
import {useLocation} from 'react-router-dom';

export default function EmergencyContactsManagement() {
    const location = useLocation();
    const childrenList = location.state?.childrenList || []; // récupère la liste des enfants passée en paramètre du navigate options

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
    const [editingContact, setEditingContact] = useState(null); // Le contact en cours d'édition
    const [isEditing, setIsEditing] = useState(false);

    /**
     * Fetch emergency contacts from the API, for children of the connected user
     * @returns {Promise<void>}
     */
    const fetchEmergencyContacts = async () => {
        try {
            const response = await axiosInstance.get('/emergency-contacts');
            setEmergencyContacts(response.data.childrenEmergencyContacts);
        } catch (error) {
            console.error('Erreur lors de la récupération des contacts d\'urgence', error);
        }
    };

    /**
     * Fetch emergency contacts when the component is mounted
     */
    useEffect(() => {
        fetchEmergencyContacts();
    }, []);

    /**
     * Reset the form and cancel editing mode
     */
    const resetForm = () => {
        setIsEditing(false);
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
    const handleAddContact = async () => {
        try {

            const payload = {
                    emergencyContact: newContactForm
            };

            await axiosInstance.post(`/emergency-contacts/create`, payload);

            // Rafraîchir les contacts d'urgence après la mise à jour réussie
            await fetchEmergencyContacts();

            // Réinitialiser le formulaire
            resetForm()
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
        setIsEditing(true);
        setEditingContact(contact);
        setNewContactForm({
            ...contact,
            childId: childId
        });
    };

    /**
     * Handle saving the edited contact
     * @returns {Promise<void>}
     */
    const handleSaveEdit = async () => {
        try {

            const payload = {
                emergencyContact: {
                    ...newContactForm,
                    childId: newContactForm.childId
                }
            }

            await axiosInstance.put(`/emergency-contacts/edit/${editingContact.id}`, payload);
            // Rafraîchir les contacts d'urgence après la mise à jour réussie
            await fetchEmergencyContacts();
            // Réinitialiser le formulaire et l'état d'édition
            resetForm();
        } catch (error) {
            console.error('Erreur lors de la modification du contact', error);
        }
    };

    /**
     * Handle canceling the editing to reset the form
     */
    const handleCancel = () => {
        resetForm();
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
        <div className="emergency-contacts-manager">
            <h3>Ajouter un Contact d&apos;Urgence</h3>

            <label htmlFor="childId">Enfant</label>
            <select name="childId" value={newContactForm.childId} onChange={handleSelectChildChange} required >
                <option value="">Sélectionner un enfant</option>
                {childrenList.map(child => (
                    <option key={child.id} value={child.id}>{child.firstname} {child.lastname}</option>
                ))}
            </select>

            <label htmlFor="gender">Genre</label>
            <select name="gender" value={newContactForm.gender} onChange={handleChange}>
                <option value="M">Homme</option>
                <option value="F">Femme</option>
                <option value="O">Autre</option>
            </select>

            <label htmlFor="firstname">Prénom</label>
            <input
                name="firstname"
                type="text"
                placeholder="Prénom"
                value={newContactForm.firstname}
                onChange={handleChange}
            />

            <label htmlFor="lastname">Nom</label>
            <input
                name="lastname"
                type="text"
                placeholder="Nom"
                value={newContactForm.lastname}
                onChange={handleChange}
            />

            <label htmlFor="address">Adresse</label>
            <input
                name="address"
                type="text"
                placeholder="Adresse"
                value={newContactForm.address}
                onChange={handleChange} />

            <label htmlFor="phoneNumber">Numéro de téléphone</label>
            <input
                name="phone_number"
                type="tel"
                placeholder="Numéro de téléphone"
                value={newContactForm.phone_number}
                onChange={handleChange}
            />

            <label htmlFor="relationship">Relation</label>
            <input
                name="relationship"
                type="text"
                placeholder="Relation"
                value={newContactForm.relationship}
                onChange={handleChange}
            />

            {isEditing ? (
                <div className="buttons-container">
                    <button className="edit-button" onClick={handleSaveEdit}>Enregistrer</button>
                    <button className="edit-button" onClick={handleCancel}>Annuler</button>
                </div>
            ) : (
                <button className="edit-button" onClick={handleAddContact}>Ajouter un Contact</button>
            )}

            <h3>Contacts d&apos;Urgence</h3>
            {emergencyContacts.length === 0 ? (
                <p>Aucun contact d&apos;Urgence disponible.</p>
            ) : (
                <ul>
                    {emergencyContacts.map(child => (
                        <li key={child.id}>
                            Enfant : <strong>{child.firstname} {child.lastname}</strong>
                            <ul>
                                {child.emergency_contacts.map(contact => (
                                    <li key={contact.id}>
                                        {contact.firstname} {contact.lastname} ({contact.relationship})
                                        - {contact.phone_number}
                                        <button onClick={() => handleEditContact(child.id, contact)}>Éditer</button>
                                        <button onClick={() => handleDeleteContact(contact, child.id)}>Supprimer</button>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
