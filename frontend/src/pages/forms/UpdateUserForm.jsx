import {useState, useEffect} from 'react';
import axiosInstance from '../../services/httpClient';

export default function UpdateUserForm ({user, onSave}) {

    const [userForm, setUserForm] = useState(user);

    useEffect(() => {
        setUserForm(user);
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const payload = {
                gender: userForm.gender,
                firstname: userForm.firstname,
                lastname:userForm.lastname,
                email:userForm.email,
                phoneNumber:userForm.phone_number,
                address: userForm.address
                // userId est géré par le controleur qui récupère l'id du user de la session
            };

            await axiosInstance.put(`/users/profile/edit`, payload);
            onSave(); // Appel de la fonction de rappel après la sauvegarde
        } catch (error) {
            console.error('Erreur lors de l\'édition de l\'utilisateur', error)
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserForm((prevUserForm) => ({
            ...prevUserForm,
            [name]: value,
        }));
    };

    return (
        <form className="edit-user-form" onSubmit={handleSubmit}>

            <label>Genre</label>        
            <select name="gender" value={userForm.gender} onChange={handleChange}>
                <option value="M">Homme</option>
                <option value="F">Femme</option>
                <option value="O">Autre</option>
            </select>

            <label>Prénom</label>
            <input type="text" name="firstname" value={userForm.firstname} onChange={handleChange} required/>

            <label>Nom</label>
            <input type="text" name="lastname" value={userForm.lastname} onChange={handleChange} required/>

            <label>Email</label>
            <input type="email" name="email" value={userForm.email} onChange={handleChange} required/>

            <label>Numéro de téléphone</label>
            <input type="text" name="phone_number" value={userForm.phone_number} onChange={handleChange}/>

            <label>Adresse</label>
            <input type="text" name="address" value={userForm.address} onChange={handleChange} />

            <button type="submit">Sauvegarder</button>
        </form>
    );
}
