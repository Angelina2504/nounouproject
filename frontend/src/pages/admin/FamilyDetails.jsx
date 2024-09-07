import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../services/httpClient';

/******************************************************
 TODO WORK IN PROGRESS, BROKEN PAGE
 ******************************************************/


export default function FamilyDetails() {
    const { id } = useParams();
    const [family, setFamily] = useState(null);

    useEffect(() => {
        const fetchFamilyDetails = async () => {
            try {
                const response = await axiosInstance.get(`/api/families/${id}`);
                setFamily(response.data);
            } catch (error) {
                console.error('Erreur lors du chargement des détails de la famille', error);
            }
        };

        fetchFamilyDetails();
    }, [id]);

    if (!family) return <p>Chargement...</p>;

    return (
        <section className="family-details">
            <h1>Détails de la Famille</h1>
            <h2>{family.user.firstname} {family.user.lastname}</h2>
            <p>Email : {family.user.email}</p>

            <h3>Tuteurs :</h3>
            {family.tutors.map(tutor => (
                <p key={tutor.id}>{tutor.firstname} {tutor.lastname}</p>
            ))}

            <h3>Enfants :</h3>
            {family.children.map(child => (
                <p key={child.id}>{child.firstname} {child.lastname}, Né(e) le {child.birthdate}</p>
            ))}

            <h3>Contacts d'urgence :</h3>
            {family.emergencyContacts.map(contact => (
                <p key={contact.id}>{contact.firstname} {contact.lastname}, {contact.relationship}, {contact.phone}</p>
            ))}

            <h3>Tâches :</h3>
            {family.todos.map(todo => (
                <p key={todo.id}>{todo.title}: {todo.description}</p>
            ))}
        </section>
    );
}
