
export default function TutorList({ users, onEdit, onDelete }) {
    return (
        <ul className="user-list">
            {(users || []).length > 0 ? (
                users.map((user) => (
                    <li key={user.id}>
                        {user.gender} {user.firstname} {user.lastname} - {user.email} - {user.phoneNumber} {user.address} 
                        <button onClick={() => onEdit(user.id)}>Éditer</button>
                        <button onClick={() => onDelete(user.id)}>Supprimer</button>
                    </li>
                ))
            ) : (
                <li>Aucun utilisateur trouvé</li>
            )}
        </ul>
    );
}