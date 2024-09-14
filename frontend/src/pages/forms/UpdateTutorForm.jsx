import {useState, useEffect} from 'react';
import axiosInstance from '../../services/httpClient';

import '../../styles/ediitTutorForm.css';

export default function UpdateTutordForm ({tutor, onSave, onCancel}) {

    const [tutorForm, setTutorForm] = useState(tutor);

    useEffect(() => {
        setTutorForm(tutor);
    }, [tutor]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const payload = {
                id: tutor.id,
                gender: tutorForm.gender,
                firstname: tutorForm.firstname,
                lastname: tutorForm.lastname,
                email: tutorForm.email,
                phoneNumber: tutorForm.phone_number,
                address: tutorForm.address
                // userId est géré par le controleur qui récupère l'id du user de la session
            };

            await axiosInstance.put(`/tutors/edit/${tutor.id}`, payload);
            onSave(); // Appel de la fonction de rappel après la sauvegarde
        } catch (error) {
            console.error('Erreur lors de l\'édition de l\'enfant', error)
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTutorForm((prevTutorForm) => ({
            ...prevTutorForm,
            [name]: value,
        }));
    };

    return (
        <div className="edit-tutor-form">
            <div>
                <label>Genre</label>
                <select name="gender" value={tutorForm.gender} onChange={handleChange}>
                    <option value="M">Homme</option>
                    <option value="F">Femme</option>
                    <option value="O">Autre</option>
                </select>

                <label>Prénom</label>
                <input type="text" name="firstname" value={tutorForm.firstname} onChange={handleChange} required/>

                <label>Nom</label>
                <input type="text" name="lastname" value={tutorForm.lastname} onChange={handleChange} required/>

                <label>Email</label>
                <input type="email" name="email" value={tutorForm.email} onChange={handleChange} required/>
            </div>

            <div>
                <label>Numéro de téléphone</label>
                <input type="text" name="phone_number" value={tutorForm.phone_number} onChange={handleChange}/>

                <label>Adresse</label>
                <input type="text" name="address" className="tutor-editable-address" value={tutorForm.address} onChange={handleChange} />
            </div>

            <div className="tutors-buttons-container">
                <button className="tutors-edit-button" onClick={handleSubmit}>Enregistrer</button>
                <button className="tutors-cancel-button" onClick={onCancel}>Annuler</button>
            </div>
        </div>
    );
}
