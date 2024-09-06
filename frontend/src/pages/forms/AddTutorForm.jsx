import { useState } from 'react';
import axiosInstance from "../../services/httpClient";
import { useCheckConnected } from "../../hooks/useCheckConnected";

export default function AddTutorForm({ children }) {

    const { user } = useCheckConnected();

    const [tutorChildForm, setTutorChildForm] = useState({
        firstname: '',
        lastname: '',
        phoneNumber: '',
        email: '',
        address: '',
        userId: user?.id || '',
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
                    firstname: tutorChildForm.firstname,
                    lastname: tutorChildForm.lastname,
                    email:tutorChildForm.email,
                    phoneNumber: tutorChildForm.phoneNumber,
                    address: tutorChildForm.address,
                    userId: tutorChildForm.userId
                },
                childId: tutorChildForm.childId
            };

            await axiosInstance.post('/tutors/create', payload);
        
            setTutorChildForm(
                { firstname: '', 
                  lastname: '',
                  email:'',
                  phoneNumber: '',
                  address: '',  
                  userId: user?.id || '',
                  childId: '' }
                );
        } catch (error) {
            console.error('Erreur lors de l\'ajout du tuteur', error);
        }
    };

    return (
        <form className="add-tutor-form" onSubmit={handleSubmit}>
            <label>Prénom</label>
            <input type="text" name="firstname" value={tutorChildForm.firstname} onChange={handleChange} required />

            <label>Nom</label>
            <input type="text" name="lastname" value={tutorChildForm.lastname} onChange={handleChange} required />

            <label>Email</label>
            <input type="text" name="email" value={tutorChildForm.email} onChange={handleChange} required />

            <label>Téléphone</label>
            <input type="text" name="phoneNumber" value={tutorChildForm.phoneNumber} onChange={handleChange} required />

            <label>Adresse</label>
            <input type="text" name="address" value={tutorChildForm.address} onChange={handleChange} required />

            <label>Enfant</label>
            <select name="childId" value={tutorChildForm.childId} onChange={handleChange} required>
                <option key={-1} value={''}>Choisissez un enfant</option>
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
