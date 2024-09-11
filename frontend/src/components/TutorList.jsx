import React from 'react';

export default function TutorList({ tutors, onEdit, onDelete }) {
    return (
        <ul className="tutor-list">
            {(tutors || []).length > 0 ? (
                tutors.map((tutor) => (
                    <li key={tutor.id}>
                        {tutor.gender} {tutor.firstname} {tutor.lastname} - {tutor.email} - {tutor.phoneNumber} {tutor.address} 
                        <button onClick={() => onEdit(tutor.id)}>Éditer</button>
                        <button onClick={() => onDelete(tutor.id)}>Supprimer</button>
                    </li>
                ))
            ) : (
                <li>Aucun tuteur déclaré</li>
            )}
        </ul>
    );
}