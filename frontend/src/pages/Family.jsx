import {useState, useEffect} from 'react';
import AddChildForm from './forms/AddChildForm';
import AddTutorForm from './forms/AddTutorForm';
import TutorList from '../components/TutorList';
import ChildrenList from '../components/ChildrenList';
import UpdateChildForm from './forms/UpdateChildForm';
import UpdateTutorForm from './forms/UpdateTutorForm';
import axiosInstance from '../services/httpClient';
import {useNavigate} from 'react-router-dom';

import '../styles/family.css';

export default function Family() {

    const [children, setChildren] = useState([]);
    const [tutors, setTutors] = useState([]);
    const [selectedChild, setSelectedChild] = useState(null);
    const [selectedTutor, setSelectedTutor] = useState(null);
    const [displayAddChildForm, setDisplayAddChildForm] = useState(false);
    const [displayAddTutorForm, setDisplayAddTutorForm] = useState(false);

    const navigate = useNavigate();

    /**
     * Récupérer la liste des enfants
     * @returns {Promise<void>}
     */
    const fetchChildren = async () => {
        try {
            const response = await axiosInstance.get('/children');
            setChildren(response.data.children);
        } catch (error) {
            console.error('Erreur lors de la récupération des enfants', error);
        }
    };

    /**
     * Récupérer la liste des tuteurs
     * @returns {Promise<void>}
     */
    const fetchTutors = async () => {
        try {
            const response = await axiosInstance.get('/tutors');
            setTutors(response.data.tutors);
        } catch (error) {
            console.error('Erreur lors de la récupération des enfants', error);
        }
    };

    /*******************************************
     *** Fonctions de gestion des événements ***
     ******************************************/

    /**
     * Afficher le formulaire d'ajout d'un enfant
     * @param id
     */
    const handleEditChild = (id) => {
        const child = children.find(c => c.id === id);
        setSelectedChild(child);
        setSelectedTutor(null);
        setDisplayAddChildForm(false); // Hide tutor form when editing
        setDisplayAddTutorForm(false); // Hide tutor form when editing
    };

    /**
     * Gérer le retour de la sauvegarde d'un enfant
     * @returns {Promise<void>}
     */
    const handleSave = async () => {
        await fetchChildren(); // Recharger la liste des enfants après la sauvegarde
        setSelectedChild(null); // Fermer le formulaire d'édition
        setDisplayAddChildForm(false); // Close Add Child Form if it was opened
    };

    /**
     * Annuler l'édition d'un enfant et d'un tuteur, masquer les formulaires
     */
    const handleCancel = () => {
        setSelectedChild(null);
        setSelectedTutor(null);
        setDisplayAddChildForm(false); // Close Add Child Form if it was opened
        setDisplayAddTutorForm(false); // Hide tutor form when editing
    };

    /**
     * Gérer le retorur de la sauvegarde d'un tuteur
     * @returns {Promise<void>}
     */
    const handleTutorSave = async () => {
        await fetchTutors(); // Recharger la liste des enfants après la sauvegarde
        setSelectedTutor(null); // Fermer le formulaire d'édition
    };


    /*****************************************
     *** Fonctions d'appel à l'API backend ***
     *****************************************/

    /**
     * Gérer la suppression d'un enfant
     * @param child
     * @returns {Promise<void>}
     */
    const handleDeleteChild = async (child) => {
        if (!window.confirm(`Êtes-vous sûr de vouloir supprimer cet enfant ${child.firstname} ${child.lastname?.toUpperCase()} ?`)) return;

        try {
            const id = child.id;
            await axiosInstance.delete(`/children/delete/${id}`);
            setChildren((prevChildren) => prevChildren.filter(child => child.id !== id));
            setSelectedChild(null);
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'enfant', error);
        }
    };

    /**
     * Gérer la suppression d'un tuteur
     * @param id
     * @returns {Promise<void>}
     */
    const handleTutorDelete = async (tutor) => {
        if (!window.confirm(`Êtes-vous sûr de vouloir supprimer ce tuteur ${tutor.firstname} ${tutor.lastname?.toUpperCase()} ?`)) return;

        try {
            const id = tutor.id;
            await axiosInstance.delete(`/tutors/delete/${id}`);
            setTutors((prevTutor) => prevTutor.filter(tutors => tutors.id !== id));
        } catch (error) {
            console.error('Erreur lors de la suppression du tuteur', error);
        }
    };

    /**
     * gérer l'édition d'un tuteur
     * @param id
     * @returns {Promise<void>}
     */
    const handleTutorEdit = async (id) => {
        try {
            await axiosInstance.put(`/tutors/edit/${id}`);
            const tutor = tutors.find(t => t.id === id);
            setSelectedTutor(tutor);
            setSelectedChild(null);
            setDisplayAddChildForm(false);
            setDisplayAddTutorForm(false); // Hide tutor form when editing

        } catch (error) {
            console.error('Erreur lors de la modification du tuteur', error);
        }
    };


    /**
     * Navigue vers la page de gestion des contacts d'urgence
     */
    const loadEmergencyContactsManagement = () => {
        navigate('/family/emergency-contacts', {
            state: {childrenList: children}
        });
    };


    useEffect(() => {
        fetchChildren();
        fetchTutors();
    }, []);

    return (
        <div className="family-container">
            <h1>Gestion de la Famille</h1>

            <section className="children-list-section">
                <h2>Liste des Enfants</h2>
                <button className="edit-button" onClick={() => setDisplayAddChildForm(!displayAddChildForm)}>
                    {displayAddChildForm ? 'Annuler' : 'Ajouter un Enfant'}
                </button>

                {displayAddChildForm && (
                    <section className="add-child-section">
                        <h2>Ajouter un Enfant</h2>
                        <AddChildForm onSave={handleSave}
                                      onCancel={handleCancel}
                        />
                    </section>
                )}

                <ChildrenList childrenList={children}
                              onEdit={handleEditChild}
                              onDelete={handleDeleteChild}
                              selectedChildId={selectedChild ? selectedChild.id : null}/>
            </section>

            {selectedChild && (
                <section className="edit-child-section">
                    <h2>Éditer un Enfant : <span>{selectedChild.firstname + ' ' + selectedChild.lastname}</span></h2>
                    <UpdateChildForm child={selectedChild}
                                     onSave={handleSave}
                                     onCancel={handleCancel}/>
                </section>
            )}

            <hr className="separator"/>

            <section className="tutor-list-section">
                <h2>Liste des Tuteurs</h2>
                <button className="edit-button" onClick={() => setDisplayAddTutorForm(!displayAddTutorForm)}>
                    {displayAddTutorForm ? 'Annuler' : 'Ajouter un Second Tuteur'}
                </button>
                <section className="add-tutor-section">
                    {displayAddTutorForm && (
                        <AddTutorForm childrenList={children}
                                      handleSave={handleTutorSave}
                                      onCancel={handleCancel}
                        />
                    )}
                </section>

                <TutorList tutors={tutors}
                           onEdit={handleTutorEdit}
                           onDelete={handleTutorDelete}
                />
            </section>

            {selectedTutor && (
                <section className="edit-tutor-section">
                    <h2>Éditer un Tuteur</h2>
                    <UpdateTutorForm tutor={selectedTutor}
                                     onSave={handleTutorSave}
                                     onCancel={handleCancel}
                    />
                </section>
            )}

            <hr className="separator"/>

            <h2>Contacts d'Urgence</h2>
            <button className="edit-button" onClick={loadEmergencyContactsManagement}>Gérer les Contacts
                d&apos;Urgence
            </button>

        </div>
    );
}
