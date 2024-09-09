import React from 'react';

export default function TutorList({ tutors }) {
    return (
        <ul className="tutor-list">
            {(tutors || []).length > 0 ? (
                tutors.map((tutor) => (
                    <li key={tutor.id}>
                        {tutor.firstname} {tutor.lastname} - {tutor.email} - {tutor.phoneNumber} {tutor.address} 
                        {/*You can add buttons to edit or delete children*/}
                    </li>
                ))
            ) : (
                <li>Aucun tuteur déclaré</li>
            )}
        </ul>
    );
}