import React from 'react';

export default function ChildrenList({ childrenList, onEdit, onDelete }) {
    return (
        <ul className="children-list">
            {childrenList.length > 0 ? (
                childrenList.map((child) => (
                    <li key={child.id}>
                        {child.gender} - {child.firstname} {child.lastname} - {new Date(child.birthdate).toLocaleDateString()} - Allergies: {child.allergy || "Aucune"}
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
