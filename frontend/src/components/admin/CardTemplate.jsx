import {useNavigate} from 'react-router-dom';
import "../../styles/cardTemplate.css";

export default function CardTemplate({ family }) {

    const navigate = useNavigate();

    const handleViewDetails = (userId) => {
        navigate(`/admin/families/${userId}`);
    };

    return (
        <div className="card-template">
            <h2>{family.user.firstname} {family.user.lastname}</h2>
            <p>Email : {family.user.email}</p>

            <h3>Enfant(s) :</h3>
            {family.children.map(child => (
                <p key={child.id}>{child.firstname} {child.lastname}, Né(e) le {new Date(child.birthdate).toLocaleDateString()}</p>
            ))}

            <button onClick={() => handleViewDetails(family.user.id)}>Voir les détails</button>
        </div>
    );
}
