import { useState } from 'react';
/*import { useCheckConnected } from '../../hooks/useCheckConnected';*/
/*import { useNavigate } from 'react-router-dom';*/
import axiosInstance from "../../services/httpClient";

export default function AddChildForm({ onAddChild }) {
    /*const { connected } = useCheckConnected();*/
   /* const navigate = useNavigate();*/

    const [childForm, setChildForm] = useState({
        firstname: '',
        lastname: '',
        birthdate: '',
        allergy: ''
      /*  userId: connected?.id || null   Utiliser null si connected n'est pas défini */
    });

    // FIXME a-t-on besoin de checker la connexion encore ici ? Ca casse pas le contexte ?
    // useEffect(() => {
    //     if (!connected) {
    //         navigate('/login');  // Redirige vers la page de login si l'utilisateur n'est pas connecté
    //     }
    // }, [connected, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setChildForm((prevChildForm) => ({
            ...prevChildForm,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const payload = {
              child: {  
                firstname: childForm.firstname,
                lastname: childForm.lastname,
                birthdate: childForm.birthdate,
                allergy: childForm.allergy
              }
            }

            await axiosInstance.post('/children/create', payload);
           
            setChildForm(
                { firstname: '',
                  lastname: '',
                  birthdate: '',
                  allergy: '' }
                );
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'enfant', error);
        }
    };

    return (
        <form className="add-child-form" onSubmit={handleSubmit}>
            <label>Prénom</label>
            <input type="text" name="firstname" value={childForm.firstname} onChange={handleChange} required/>

            <label>Nom</label>
            <input type="text" name="lastname" value={childForm.lastname} onChange={handleChange} required/>

            <label>Date de Naissance</label>
            <input type="date" name="birthdate" value={childForm.birthdate} onChange={handleChange} required/>

            <label>Allergies</label>
            <input type="text" name="allergy" value={childForm.allergy} onChange={handleChange}/>

            <button type="submit">Ajouter</button>
        </form>
    );
}
