import { useState, useEffect } from 'react';
import AddChildForm from './forms/AddChildForm';
import AddTutorForm from './forms/AddTutorForm';
import TutorList from '../components/TutorList';
import ChildrenList from '../components/ChildrenList';
import UpdateChildForm from './forms/UpdateChildForm';
import UpdateTutorForm from './forms/UpdateTutorForm';
import axiosInstance from "../services/httpClient";

export default function Family() {

    const [children, setChildren] = useState([]);
    const [tutors, setTutors] = useState([]);
    const [selectedChild, setSelectedChild] = useState(null);
    const [selectedTutor, setSelectedTutor] = useState(null);

    // // Fonction pour récupérer la liste des enfants
    const fetchChildren = async () => {
        try {
            const response = await axiosInstance.get('/children');
            setChildren(response.data.children);
        } catch (error) {
            console.error('Erreur lors de la récupération des enfants', error);
        }
    };
    
    // Fonction pour ajouter un enfant
    const handleAddChild = (newChild) => {
        setChildren((prevChildren) => [...prevChildren, newChild]);
    };

    // // Fonction pour récupérer la liste des enfants
    const fetchTutors = async () => {
        try {
            const response = await axiosInstance.get('/tutors');
            setTutors(response.data.tutors);
        } catch (error) {
            console.error('Erreur lors de la récupération des enfants', error);
        }
    };

    const handleEdit = (id) => {
        const child = children.find(c => c.id === id);
        setSelectedChild(child);
        setSelectedTutor(null);
    };

    const handleSave = async () => {
        await fetchChildren(); // Recharger la liste des enfants après la sauvegarde
        setSelectedChild(null); // Fermer le formulaire d'édition
    };

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/children/delete/${id}`);
            setChildren((prevChildren) => prevChildren.filter(child => child.id !== id));
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'enfant', error);
        }
    };

    const handleTutorDelete = async (id) => {
        try {
            await axiosInstance.delete(`/tutors/delete/${id}`);
            setTutors((prevTutor) => prevTutor.filter(tutors => tutors.id !== id));
        } catch (error) {
            console.error('Erreur lors de la suppression du tuteur', error);
        }
    };

    const handleTutorEdit = async (id) => {
        try  {
            await axiosInstance.put(`/tutors/edit/${id}`);
            const tutor = tutors.find(t => t.id === id);
        setSelectedTutor(tutor);
        setSelectedChild(null);
           
        }catch (error){
            console.error('Erreur lors de la modification du tuteur', error);
        }
    }

    const handleTutorSave = async () => {
        await fetchTutors(); // Recharger la liste des enfants après la sauvegarde
        setSelectedTutor(null); // Fermer le formulaire d'édition
    };

   useEffect(() => {
        fetchChildren();
        fetchTutors();
    },[]);


    return (
        <div className="family-container">
            <h1>Gestion de la Famille</h1>

            <section className="add-child-section">
                <h2>Ajouter un Enfant</h2>
                <AddChildForm onAddChild={handleAddChild} onSave={handleSave}/>
            </section>

            <section className="add-tutor-section">
                <h2>Ajouter un Second Tuteur</h2>
                <AddTutorForm childrenList={children} handleSave={handleTutorSave}></AddTutorForm>
            </section>

            <section className="children-list-section">
                <h2>Liste des Enfants</h2>
                <ChildrenList childrenList={children} onEdit={handleEdit} onDelete={handleDelete} />
            </section>

            <section className="tutor-list-section">
                <h2>Liste des Tuteurs</h2>
                <TutorList tutors={tutors} onEdit={handleTutorEdit} onDelete={handleTutorDelete}/>
            </section>

            
            {selectedChild && (
                <section className="edit-child-section">
                    <h2>Éditer un Enfant</h2>
                    <UpdateChildForm child={selectedChild} onSave={handleSave} />
                </section>
            )}

            {selectedTutor && (
                <section className="edit-tutor-section">
                    <h2>Éditer un Tuteur</h2>
                    <UpdateTutorForm tutor={selectedTutor} onSave={handleTutorSave} />
                </section>
            )}
        
        </div>
    );
}
