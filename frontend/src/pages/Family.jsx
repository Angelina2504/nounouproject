import { useState, useEffect } from 'react';
import AddChildForm from './forms/AddChildForm';
import AddTutorForm from './forms/AddTutorForm';
import ChildrenList from '../components/ChildrenList';
import axiosInstance from "../services/httpClient";

export default function Family() {

    const [children, setChildren] = useState([]);

    // // Fonction pour récupérer la liste des enfants
    const fetchChildren = async () => {
        try {
            const response = await axiosInstance.get('/children');
            setChildren(response.data.children);
        } catch (error) {
            console.error('Erreur lors de la récupération des enfants', error);
        }
    };

    useEffect(() => {
        fetchChildren();
    }, []);

    // Fonction pour ajouter un enfant
    const handleAddChild = (newChild) => {
        setChildren((prevChildren) => [...prevChildren, newChild]);
    };

    return (
        <div className="family-container">
            <h1>Gestion de la Famille</h1>

            <section className="add-child-section">
                <h2>Ajouter un Enfant</h2>
                <AddChildForm onAddChild={handleAddChild} />
            </section>

            <section className="add-tutor-section">
                <h2>Ajouter un Second Tuteur</h2>
                <AddTutorForm>{children}</AddTutorForm>
            </section>

            <section className="children-list-section">
                <h2>Liste des Enfants</h2>
                <ChildrenList>{children}</ChildrenList>
            </section>
        </div>
    );
}
