import React from 'react';

export default function ChildrenList({ children }) {
    return (
        <ul className="children-list">
            {children.length > 0 ? (
                children.map((child) => (
                    <li key={child.id}>
                        {child.firstname} {child.lastname} - {child.birthdate} - Allergies: {child.allergy || "Aucune"}
                        {/* Vous pourriez ajouter des boutons pour éditer ou supprimer l'enfant */}
                    </li>
                ))
            ) : (
                <li>Aucun enfant déclaré</li>
            )}
        </ul>
    );
}
