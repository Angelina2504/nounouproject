import React from 'react';

import '../styles/tutorList.css';

export default function TutorList({ tutors, onEdit, onDelete }) {
    return (
        <div className="tutor-list">
            {tutors.length > 0 ? (
                tutors.map((tutor) => (
                    <div key={tutor.id} className="tutor-card-template">
                        <div className="tutor-name">{tutor.firstname} {tutor.lastname}</div>
                        <p>Email: {tutor.email}</p>
                        <p>Téléphone: {tutor.phone_number}</p>

                        <div className="tutor-buttons-container">
                            <button className="tutor-edit-button" onClick={() => onEdit(tutor.id)}>Éditer</button>
                            <button className="tutor-delete-button" onClick={() => onDelete(tutor)}>Supprimer</button>
                        </div>
                    </div>
                ))
            ) : (
                <p>Aucun tuteur déclaré</p>
            )}
        </div>
    );
}
