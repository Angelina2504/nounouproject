import { useState } from 'react';
import axiosInstance from "../../services/httpClient";

import '../../styles/addChildForm.css';

export default function AddChildForm({onSave, onCancel}) {

    const [childForm, setChildForm] = useState({
        gender: '' || 'M',
        firstname: '',
        lastname: '',
        birthdate: '',
        allergy: ''
    });

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
                gender: childForm.gender,
                firstname: childForm.firstname,
                lastname: childForm.lastname,
                birthdate: childForm.birthdate,
                allergy: childForm.allergy
                 // userId est géré par le controleur qui récupère l'id du user de la session
              }
            };

            await axiosInstance.post('/children/create', payload);
            onSave();

            setChildForm(
                {
                  gender: '',
                  firstname: '',
                  lastname: '',
                  birthdate: '',
                  allergy: '' }
                );
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'enfant', error);
        }
    };

    return (
        <div className="add-child-form">
            <div>
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
            </div>
            <div>
                <label>Date de Naissance</label>
                <input type="date" name="birthdate" value={childForm.birthdate} onChange={handleChange} required/>

                <label>Allergies</label>
                <input type="text" name="allergy" value={childForm.allergy} onChange={handleChange}/>
            </div>
            <div className="children-buttons-container">
                <button className="children-edit-button" onClick={handleSubmit}>Ajouter</button>
                <button className="children-cancel-button" onClick={onCancel}>Annuler</button>
            </div>
        </div>
    );
}
