import {useState, useEffect} from 'react';
import axiosInstance from '../../services/httpClient';

export default function UpdateChildForm (child, onSave) {

    const [childForm, setChildForm] = useState(child);

    useEffect(() => {
        setChildForm(child);
    }, [child]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.put(`/children/edit/${child.id}`, childForm);
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
            <label>Prénom</label>
            <input type="text" name="firstname" value={childForm.firstname} onChange={handleChange} required/>

            <label>Nom</label>
            <input type="text" name="lastname" value={childForm.lastname} onChange={handleChange} required/>

            <label>Date de Naissance</label>
            <input type="date" name="birthdate" value={childForm.birthdate} onChange={handleChange} required/>

            <label>Allergies</label>
            <input type="text" name="allergy" value={childForm.allergy} onChange={handleChange}/>

            <button type="submit">Sauvegarder</button>
        </form>
    );
}
