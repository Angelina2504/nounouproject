import '../styles/childrenList.css';

export default function ChildrenList({ childrenList, onEdit, onDelete, selectedChildId }) {
    return (
        <div className="children-list">
            {childrenList.length > 0 ? (
                childrenList.map((child) => (
                    <div key={child.id}
                        className={`children-card-template ${selectedChildId === child.id ? 'selected-child' : ''}`}>
                        <div className="child-name">{child.firstname} {child.lastname}</div>
                        <p>{child.gender === 'M' ? 'Né ' : (child.gender === 'F' ? 'Née ' : 'Né(e) ')}
                            le {new Date(child.birthdate).toLocaleDateString()}</p>
                        <p>Allergies: {child.allergy || 'Aucune'}</p>

                        <div className="children-buttons-container">
                            <button className="children-edit-button" onClick={() => onEdit(child.id)}>Éditer</button>
                            <button className="children-delete-button" onClick={() => onDelete(child)}>Supprimer</button>
                        </div>
                    </div>
                ))
            ) : (
                <p>Aucun enfant déclaré</p>
            )}
        </div>

    );
}
