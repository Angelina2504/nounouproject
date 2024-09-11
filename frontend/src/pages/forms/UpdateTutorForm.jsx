import {useState, useEffect} from 'react';
import axiosInstance from '../../services/httpClient';

export default function UpdateTutordForm ({tutor, handleSave}) {

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
                phoneNumber: tutorForm.phoneNumber,
                adress: tutorForm.adress
                // userId est géré par le controleur qui récupère l'id du user de la session
            };

            await axiosInstance.put(`/tutors/edit/${tutor.id}`, payload);
            handleSave(); // Appel de la fonction de rappel après la sauvegarde
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
        <form className="edit-tutor-form" onSubmit={handleSubmit}>

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

            <label>Numéro de téléphone</label>
            <input type="text" name="phoneNumber" value={tutorForm.phoneNumber} onChange={handleChange}/>

            <label>Adress</label>
            <input type="text" name="adress" value={tutorForm.adress} onChange={handleChange} />

            <button type="submit">Sauvegarder</button>
        </form>
    );
}
