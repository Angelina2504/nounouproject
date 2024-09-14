import { useState } from 'react';
import axiosInstance from "../../services/httpClient";

import '../../styles/addTutorForm.css';

export default function AddTutorForm({ childrenList, handleSave, onCancel }) {

    const [tutorChildForm, setTutorChildForm] = useState({
        firstname: '',
        lastname: '',
        phoneNumber: '',
        email: '',
        address: '',
        childId: ''
    });

    const handleChange = (e) => {
       const { name, value } = e.target;
        setTutorChildForm((prevTutorChildForm) => ({
            ...prevTutorChildForm,
            [name]: value,
        }));

    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            // Define the payload parsing form data
            const payload = {
                tutor: {
                    gender: tutorChildForm.gender,
                    firstname: tutorChildForm.firstname,
                    lastname: tutorChildForm.lastname,
                    email:tutorChildForm.email,
                    phoneNumber: tutorChildForm.phoneNumber,
                    address: tutorChildForm.address
                },
                childId: tutorChildForm.childId
            };

            await axiosInstance.post('/tutors/create', payload);
            handleSave();

            setTutorChildForm(
                { gender: '',
                  firstname: '',
                  lastname: '',
                  email:'',
                  phoneNumber: '',
                  address: '',
                  childId: '' }
                );
        } catch (error) {
            console.error('Erreur lors de l\'ajout du tuteur', error);
        }
    };

    return (
        <div className="add-tutor-form" onSubmit={handleSubmit}>
            <div>
                <label class="bold-text">Enfant</label>
                <select name="childId" value={tutorChildForm.childId} onChange={handleChange} required>
                    <option key={-1} value={''}>Choisissez un enfant</option>
                    {(childrenList || []).map((child) => (
                        <option key={child.id} value={child.id}>
                            {child.firstname} {child.lastname}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Genre</label>
                <select name="gender" value={tutorChildForm.gender} onChange={handleChange}>
                    <option value="M">Homme</option>
                    <option value="F">Femme</option>
                    <option value="O">Autre</option>
                </select>

                <label>Prénom</label>
                <input type="text" name="firstname" value={tutorChildForm.firstname} onChange={handleChange} required/>

                <label>Nom</label>
                <input type="text" name="lastname" value={tutorChildForm.lastname} onChange={handleChange} required/>

                <label>Email</label>
                <input type="text" name="email" value={tutorChildForm.email} onChange={handleChange} required/>
            </div>
            <div>
                <label>Téléphone</label>
                <input type="text" name="phoneNumber" value={tutorChildForm.phoneNumber} onChange={handleChange} required/>

                <label>Adresse</label>
                <input type="text" name="address" className="tutor-editable-address" value={tutorChildForm.address} onChange={handleChange} required/>
            </div>
            <div className="tutors-buttons-container">
                <button className="tutors-edit-button" onClick={handleSubmit}>Ajouter</button>
                <button className="tutors-cancel-button" onClick={onCancel}>Annuler</button>
            </div>
        </div>
    );
}
