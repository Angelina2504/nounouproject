

export default function CardTemplate({ family, handleEdit, handleDelete, handleViewDetails }) {
    return (
        <div className="card-template">
            <h2>{family.user.firstname} {family.user.lastname}</h2>
            <p>Email : {family.user.email}</p>

            <h3>Enfant(s) :</h3>
            {family.children.map(child => (
                <p key={child.id}>{child.firstname} {child.lastname}, Né(e) le {child.birthdate}</p>
            ))}

            <button onClick={() => handleEdit(family.id)}>Éditer</button>
            <button onClick={() => handleDelete(family.id)}>Supprimer</button>
            <button onClick={() => handleViewDetails(family.id)}>Voir les détails</button>
        </div>
    );
}
