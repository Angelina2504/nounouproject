import React, { useState } from 'react';
import axiosInstance from "../../services/httpClient";

export default function AddTutorForm({ children }) {
    const [tutor, setTutor] = useState({
        firstname: '',
        lastname: '',
        phoneNumber: '',
        address: '',
        childId: children.length > 0 ? children[0].id : null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTutor((prevTutor) => ({
            ...prevTutor,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/tutors', tutor);
            setTutor({ firstname: '', lastname: '', phoneNumber: '', address: '', childId: children.length > 0 ? children[0].id : null });
        } catch (error) {
            console.error('Erreur lors de l\'ajout du tuteur', error);
        }
    };

    return (
        <form className="add-tutor-form" onSubmit={handleSubmit}>
            <label>Prénom</label>
            <input type="text" name="firstname" value={tutor.firstname} onChange={handleChange} required />

            <label>Nom</label>
            <input type="text" name="lastname" value={tutor.lastname} onChange={handleChange} required />

            <label>Téléphone</label>
            <input type="text" name="phoneNumber" value={tutor.phoneNumber} onChange={handleChange} required />

            <label>Adresse</label>
            <input type="text" name="address" value={tutor.address} onChange={handleChange} required />

            <label>Enfant</label>
            {/*<select name="childId" value={tutor.childId} onChange={handleChange} required>*/}
            <select name="childId" value={undefined} onChange={handleChange} required>
                <option key={-1} value={null}>Choisissez un enfant</option>
                {(children || []).map((child) => (
                    <option key={child.id} value={child.id}>
                        {child.firstname} {child.lastname}
                    </option>
                ))}
            </select>

            <button type="submit">Ajouter Tuteur</button>
        </form>
    );
}
