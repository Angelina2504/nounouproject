import HTMLRenderers from '../../services/admin/HTMLRenderers.jsx';
import AdminTutorDetailsComponent from './AdminTutorDetailsComponent.jsx';
import PropTypes from 'prop-types';

const AdminChildDetailsComponent = ({
        child,
        formData,
        isEditing,
        handleInputChange,
        handleSaveChild,
        handleSaveTutor,
        handleCancel,
        handleEditToggle
    }) => {

    const isChildEditing = isEditing?.child || false; // Default to false if undefined

    return (
        <div className="child-card">
            <h3>
                <div className="name-fields">
                    {HTMLRenderers.renderEditableField(
                        isChildEditing,
                        formData.child?.firstname !== undefined ? formData.child.firstname : child.firstname,
                        'text',
                        (e) => handleInputChange('children', child.id, 'firstname', e.target.value)
                    )}
                    {HTMLRenderers.renderEditableField(
                        isChildEditing,
                        formData.child?.lastname !== undefined ? formData.child.lastname.toUpperCase() : child.lastname.toUpperCase(),
                        'text',
                        (e) => handleInputChange('children', child.id, 'lastname', e.target.value)
                    )}
                </div>
            </h3>
            <div className="child-informations">
                <div><span className="bold-text">Date de naissance : </span>
                    {HTMLRenderers.renderDateField(
                        isChildEditing,
                        formData.child?.birthdate !== undefined ? formData.child.birthdate : child.birthdate,
                        (e) => handleInputChange('children', child.id, 'birthdate', e.target.value)
                    )}
                </div>
                <div><span className="bold-text">Genre : </span>
                    {HTMLRenderers.renderGenderField(
                        isChildEditing,
                        formData.child?.gender !== undefined ? formData.child.gender : child.gender,
                        (e) => handleInputChange('children', child.id, 'gender', e.target.value)
                    )}
                </div>
                <div><span className="bold-text">Allergies : </span>
                    {HTMLRenderers.renderEditableField(
                        isChildEditing,
                        formData.child?.allergy !== undefined ? formData.child.allergy : child.allergy,
                        'text',
                        (e) => handleInputChange('children', child.id, 'allergy', e.target.value)
                    )}
                </div>
                {isChildEditing ? (
                    <div>
                        <button className="edit-button" onClick={() => handleSaveChild(child.id)}>Enregistrer</button>
                        <button className="edit-button" onClick={() => handleCancel('children', child.id)}>Annuler</button>
                    </div>
                ) : (
                    <button className="edit-button" onClick={() => handleEditToggle('children', child.id)}>Editer</button>
                )}
            </div>

            {/* Render tutors for this child */}
            <section className="tutors-details">
                <h4>Tuteur(s):</h4>
                {child.tutorsDetails.map(tutor => (
                    <AdminTutorDetailsComponent
                        key={tutor.id}
                        tutor={tutor}
                        formData={formData.tutors[tutor.id]}
                        isEditing={isEditing.tutors[tutor.id]}
                        handleInputChange={handleInputChange}
                        handleSaveTutor={handleSaveTutor}
                        handleCancel={handleCancel}
                        handleEditToggle={handleEditToggle}
                    />
                ))}
            </section>
        </div>
    );
};

AdminChildDetailsComponent.propTypes = {
    child: PropTypes.shape({
        id: PropTypes.number.isRequired,
        firstname: PropTypes.string.isRequired,
        lastname: PropTypes.string.isRequired,
        birthdate: PropTypes.string.isRequired,
        gender: PropTypes.string.isRequired,
        allergy: PropTypes.string,
        tutorsDetails: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                firstname: PropTypes.string.isRequired,
                lastname: PropTypes.string.isRequired,
                email: PropTypes.string.isRequired,
                phoneNumber: PropTypes.string,
                address: PropTypes.string,
                gender: PropTypes.string.isRequired
            })
        ).isRequired
    }).isRequired,
    formData: PropTypes.shape({
        child: PropTypes.shape({
            firstname: PropTypes.string,
            lastname: PropTypes.string,
            birthdate: PropTypes.string,
            gender: PropTypes.string,
            allergy: PropTypes.string
        }),
        tutors: PropTypes.objectOf(
            PropTypes.shape({
                firstname: PropTypes.string,
                lastname: PropTypes.string,
                email: PropTypes.string,
                phoneNumber: PropTypes.string,
                address: PropTypes.string,
                gender: PropTypes.string
            })
        )
    }).isRequired,
    isEditing: PropTypes.shape({
            child: PropTypes.bool,
        tutors: PropTypes.objectOf(PropTypes.bool)
    }),
    handleInputChange: PropTypes.func.isRequired,
    handleSaveChild: PropTypes.func.isRequired,
    handleSaveTutor: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
    handleEditToggle: PropTypes.func.isRequired
};

export default AdminChildDetailsComponent;