import {useState, useEffect} from 'react';
import axiosInstance from '../../services/httpClient';
import dateUtils from '../../services/dateUtils';

export default function UpdateChildForm ({child, onSave}) {

    const [childForm, setChildForm] = useState(child);

    useEffect(() => {
        setChildForm(child);
    }, [child]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const payload = {
                id: child.id,
                gender: childForm.gender,
                firstname: childForm.firstname,
                lastname: childForm.lastname,
                birthdate: dateUtils.formatFromJsonToSQLDate(childForm.birthdate),
                allergy: childForm.allergy
                // userId est géré par le controleur qui récupère l'id du user de la session
            };

            await axiosInstance.put(`/children/edit/${child.id}`, payload);
            onSave(); // Appel de la fonction de rappel après la sauvegarde
        } catch (error) {
            console.error('Erreur lors de l\'édition de l\'enfant', error)
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setChildForm((prevChildForm) => ({
            ...prevChildForm,
            [name]: value,
        }));
    };

    return (
        <form className="edit-child-form" onSubmit={handleSubmit}>

            <label>Genre</label>        
            <select name="gender" value={childForm.gender} onChange={handleChange}>
                <option value="M">Homme</option>
                <option value="F">Femme</option>
                <option value="O">Autre</option>
            </select>

            <label>Prénom</label>
            <input type="text" name="firstname" value={childForm.firstname} onChange={handleChange} required/>

            <label>Nom</label>
            <input type="text" name="lastname" value={childForm.lastname} onChange={handleChange} required/>

            <label>Date de Naissance</label>
            <input type="date" name="birthdate" value={
                dateUtils.formatFromJsonToSQLDate(childForm.birthdate)
                } onChange={handleChange} required/>

            <label>Allergies</label>
            <input type="text" name="allergy" value={childForm.allergy} onChange={handleChange}/>

            <button type="submit">Sauvegarder</button>
        </form>
    );
}
