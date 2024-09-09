import React from 'react';

export default function ChildrenList({ children, onEdit, onDelete }) {
    return (
        <ul className="children-list">
            {children.length > 0 ? (
                children.map((child) => (
                    <li key={child.id}>
                        {child.firstname} {child.lastname} - {child.birthdate} - Allergies: {child.allergy || "Aucune"}
                        <button onClick={() => onEdit(child.id)}>Éditer</button>
                        <button onClick={() => onDelete(child.id)}>Supprimer</button>
                    </li>
                ))
            ) : (
                <li>Aucun enfant déclaré</li>
            )}
        </ul>
    );
}
