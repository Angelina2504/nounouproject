import {useState, useEffect} from 'react';

export default function UpdateUserForm ({user, onSave, onCancel}) {

    const [userForm, setUserForm] = useState(user);

    useEffect(() => {
        setUserForm(user);
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserForm((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(userForm);
    };

    return (
        <div className="update-user-form">
            {/* First row with Gender, Firstname, and Lastname */}
            <div className="profile-field">
                <label>Genre :</label>
                <select name="gender" value={userForm.gender} onChange={handleChange}>
                    <option value="M">Homme</option>
                    <option value="F">Femme</option>
                    <option value="O">Autre</option>
                </select>

                <label className="inline">Prénom :</label>
                <input
                    type="text"
                    name="firstname"
                    value={userForm.firstname}
                    onChange={handleChange}
                />

                <label className="inline">Nom :</label>
                <input
                    type="text"
                    name="lastname"
                    value={userForm.lastname}
                    onChange={handleChange}
                />
            </div>

            {/* Second row with Email, Phone, and Address */}
            <div className="profile-field">
                <label>Email :</label>
                <input
                    type="text"
                    name="email"
                    value={userForm.email}
                    onChange={handleChange}
                />&nbsp;
                <span className="bold-text info">Attention, il s&apos;agit de votre identifiant pour vous connecter !</span>
            </div>
            <div className="profile-field">
                <label>Téléphone :</label>
                <input
                    type="text"
                    name="phone_number"
                    value={userForm.phone_number}
                    onChange={handleChange}
                />

                <label className="inline">Adresse :</label>
                <input
                    type="text"
                    name="address"
                    value={userForm.address}
                    onChange={handleChange}
                />
            </div>

            <div className="profile-buttons-container">
                <button className="save-button" onClick={handleSubmit}>
                    Enregistrer
                </button>
                <button className="cancel-button" onClick={onCancel}>
                    Annuler
                </button>
            </div>
        </div>
    );
}