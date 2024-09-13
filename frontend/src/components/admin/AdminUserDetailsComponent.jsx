import HTMLRenderers from '../../services/admin/HTMLRenderers.jsx';
import PropTypes from 'prop-types';

const AdminUserDetailsComponent = ({
        userDetails,
        formData,
        isEditing,
        handleInputChange,
        handleSaveUser,
        handleCancel,
        handleEditToggle,
        handleDeleteUser
    }) => {
    return (
        <div className="user-details">
            <div className="name-fields">
                <h2>Compte utilisateur :&nbsp;
                    {HTMLRenderers.renderEditableField(
                        isEditing,
                        formData.firstname !== undefined ? formData.firstname : userDetails.firstname,
                        'text',
                        (e) => handleInputChange('user', undefined, 'firstname', e.target.value)
                    )}
                    &nbsp;
                    {HTMLRenderers.renderEditableField(
                        isEditing,
                        formData.lastname !== undefined ? formData.lastname?.toUpperCase() : userDetails.lastname.toUpperCase(),
                        'text',
                        (e) => handleInputChange('user', undefined, 'lastname', e.target.value)
                    )}
                </h2>
            </div>
            <div className="user-informations">
                <div><span className="bold-text">Genre : </span>
                    {HTMLRenderers.renderGenderField(
                        isEditing,
                        formData.gender || userDetails.gender,
                        (e) => handleInputChange('user', undefined, 'gender', e.target.value)
                    )}
                </div>
                <div><span className="bold-text">Email : </span>
                    {HTMLRenderers.renderEditableField(
                        isEditing,
                        formData.email !== undefined ? formData.email : userDetails.email,
                        'email',
                        (e) => handleInputChange('user', undefined, 'email', e.target.value)
                    )}
                </div>
                <div><span className="bold-text">Téléphone : </span>
                    {HTMLRenderers.renderEditableField(
                        isEditing,
                        formData.phoneNumber !== undefined ? formData.phoneNumber : userDetails.phoneNumber,
                        'tel',
                        (e) => handleInputChange('user', undefined, 'phoneNumber', e.target.value)
                    )}
                </div>
                <div><span className="bold-text">Addresse : </span>
                    {HTMLRenderers.renderEditableField(
                        isEditing,
                        formData.address !== undefined ? formData.address : userDetails.address,
                        'text',
                        (e) => handleInputChange('user', undefined, 'address', e.target.value),
                        'editable-address'
                    )}
                </div>
                {isEditing ? (
                    <div>
                        <button className="edit-button" onClick={handleSaveUser}>Enregistrer</button>
                        <button className="cancel-button" onClick={() => handleCancel('user')}>Annuler</button>
                    </div>
                ) : (
                    <div className="buttons-container">
                        <button className="edit-button" onClick={() => handleEditToggle('user')}>Editer</button>
                        <button className="delete-button" onClick={() => handleDeleteUser(userDetails)}>Supprimer</button>
                    </div>
                )}
            </div>
        </div>
    );
};

AdminUserDetailsComponent.propTypes = {
    userDetails: PropTypes.shape({
        id: PropTypes.number.isRequired,
        firstname: PropTypes.string.isRequired,
        lastname: PropTypes.string.isRequired,
        gender: PropTypes.string,
        email: PropTypes.string.isRequired,
        phoneNumber: PropTypes.string,
        address: PropTypes.string
    }).isRequired,
    formData: PropTypes.shape({
        firstname: PropTypes.string,
        lastname: PropTypes.string,
        gender: PropTypes.string,
        email: PropTypes.string,
        phoneNumber: PropTypes.string,
        address: PropTypes.string
    }).isRequired,
    isEditing: PropTypes.bool.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleSaveUser: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
    handleEditToggle: PropTypes.func.isRequired,
    handleDeleteUser: PropTypes.func.isRequired
};

export default AdminUserDetailsComponent;
