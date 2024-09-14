import HTMLRenderers from '../../services/admin/HTMLRenderers.jsx';
import PropTypes from 'prop-types';

const AdminTutorDetailsComponent = ({
        tutor,
        formData,
        isEditing,
        handleInputChange,
        handleSaveTutor,
        handleCancel,
        handleEditToggle,
        handleDeleteTutor
    }) => {

    const isTutorEditing = isEditing || false; // Default to false if undefined

    return (
        <div className="tutor-card">
            <div className="name-fields bold-text">
                {HTMLRenderers.renderEditableField(
                    isTutorEditing,
                    formData?.firstname !== undefined ? formData.firstname : tutor.firstname,
                    'text',
                    (e) => handleInputChange('tutors', tutor.id, 'firstname', e.target.value)
                )}
                {HTMLRenderers.renderEditableField(
                    isTutorEditing,
                    formData?.lastname !== undefined ? formData.lastname.toUpperCase() : tutor.lastname.toUpperCase(),
                    'text',
                    (e) => handleInputChange('tutors', tutor.id, 'lastname', e.target.value)
                )}
            </div>
            <div className="tutor-informations">
                <div><span className="bold-text">Genre : </span>
                    {HTMLRenderers.renderGenderField(
                        isTutorEditing,
                        formData?.gender !== undefined ? formData.gender : tutor.gender,
                        (e) => handleInputChange('tutors', tutor.id, 'gender', e.target.value)
                    )}
                </div>
                <div><span className="bold-text">Email : </span>
                    {HTMLRenderers.renderEditableField(
                        isTutorEditing,
                        formData?.email !== undefined ? formData.email : tutor.email,
                        'email',
                        (e) => handleInputChange('tutors', tutor.id, 'email', e.target.value)
                    )}
                </div>
                <div><span className="bold-text">Téléphone : </span>
                    {HTMLRenderers.renderEditableField(
                        isTutorEditing,
                        formData?.phoneNumber !== undefined ? formData.phoneNumber : tutor.phoneNumber,
                        'tel',
                        (e) => handleInputChange('tutors', tutor.id, 'phoneNumber', e.target.value)
                    )}
                </div>
                <div><span className="bold-text">Adresse : </span>
                    {HTMLRenderers.renderEditableField(
                        isTutorEditing,
                        formData?.address !== undefined ? formData.address : tutor.address,
                        'text',
                        (e) => handleInputChange('tutors', tutor.id, 'address', e.target.value)
                    )}
                </div>
                {isTutorEditing ? (
                    <div>
                        <button className="edit-button" onClick={() => handleSaveTutor(tutor.id)}>Enregistrer</button>
                        <button className="cancel-button" onClick={() => handleCancel('tutors', tutor.id)}>Annuler</button>
                    </div>
                ) : (
                    <div className="buttons-container">
                        <button className="edit-button" onClick={() => handleEditToggle('tutors', tutor.id)}>Editer</button>
                        <button className="delete-button" onClick={() => handleDeleteTutor(tutor)}>Supprimer</button>
                    </div>
                )}
            </div>
        </div>
    );
};

AdminTutorDetailsComponent.propTypes = {
    tutor: PropTypes.shape({
        id: PropTypes.number.isRequired,
        firstname: PropTypes.string.isRequired,
        lastname: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phoneNumber: PropTypes.string,
        address: PropTypes.string,
        gender: PropTypes.string.isRequired
    }).isRequired,
    formData: PropTypes.shape({
        firstname: PropTypes.string,
        lastname: PropTypes.string,
        gender: PropTypes.string,
        email: PropTypes.string,
        phoneNumber: PropTypes.string,
        address: PropTypes.string
    }),
    isEditing: PropTypes.bool,
    handleInputChange: PropTypes.func.isRequired,
    handleSaveTutor: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
    handleEditToggle: PropTypes.func.isRequired,
    handleDeleteTutor: PropTypes.func.isRequired
};


export default AdminTutorDetailsComponent;
