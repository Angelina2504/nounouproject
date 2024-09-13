import { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axiosInstance from '../../services/httpClient.js';
import '../../styles/familyDetails.css';
import dateUtils from '../../services/dateUtils.js';
import AdminUserDetailsComponent from './AdminUserDetailsComponent.jsx';
import AdminChildDetailsComponent from './AdminChildDetailsComponent.jsx';

export default function AdminFamilyDetails() {

    /********************************************/
    /* States and hooks to manage the component */
    /********************************************/

    // Get the userId from the route URL parameter (via useParams).
    const { userId } = useParams();
    // State to store the family's details fetched from the API.
    const [familyDetails, setFamilyDetails] = useState(null);
    // Loading state to show a loading message while fetching data.
    const [loading, setLoading] = useState(true);
    // React Router hook to navigate between pages.
    const navigate = useNavigate();

    // Tracks whether each part of the UI (user, children, tutors) is in edit mode.
    const [isEditing, setIsEditing] = useState({
        user: false,   // Editing state for the user details.
        children: {},  // Editing states for each child (object with child IDs as keys).
        tutors: {}     // Editing states for each tutor (object with tutor IDs as keys).
    });

    // Stores form data for editing. Similar structure to familyDetails, but holds the data being edited.
    const [formData, setFormData] = useState({
        user: {},      // Data for the user being edited.
        children: {},  // Data for each child being edited.
        tutors: {}     // Data for each tutor being edited.
    });

    /**********************************/
    /******** Hook useEffect() ********/
    /**********************************/
    // This useEffect runs when the component is mounted or when the userId changes.
    // It fetches the family details for the given userId from the API.
    // The data is stored in both familyDetails and formData states.
    //
    // The structure of the familyDetails object is as follows:
    // familyDetails: {
    //    userDetails: { id, firstname, lastname, ... },              // informations about the user
    //    childrenDetails: [                                          // array of children, each child has the following structure
    //        { id, firstname, lastname, ... , birthdate,
    //          tutorsDetails: [                                    // array of tutors for this child
    //              { id, firstname, lastname, ... },
    //              { id, firstname, lastname, ... },
    //           ]
    //        }, {...}, {...}
    //    ]
    //  }
    useEffect(() => {
        const fetchFamilyDetails = async () => {
            try {
                // Fetch the family details for the given userId from the API
                const response = await axiosInstance.get(`/admin/families/${userId}`, { withCredentials: true });
                const familyData = response.data.familyDetails;

                // Store the fetched family details in the state
                setFamilyDetails(familyData);

                // Initialize formData based on the fetched data.
                // This is done to allow editing without modifying the original data until saved.
                setFormData({
                    user: {
                        id: familyData.userDetails.id,
                        firstname: familyData.userDetails.firstname,
                        lastname: familyData.userDetails.lastname,
                        email: familyData.userDetails.email,
                        gender: familyData.userDetails.gender,
                        phoneNumber: familyData.userDetails.phoneNumber,
                        address: familyData.userDetails.address
                    },
                    // childrenDetails is an array. We're converting it into an object where each child ID is a key
                    // and the value is the child details. This makes it easier to access and update child data.
                    // This is done using the reduce() function on the childrenDetails array.
                    children: familyData.childrenDetails.reduce((acc, child) => ({
                        ...acc,
                        [child.id]: { // Each child has an ID, which becomes the key in this object.
                            id: child.id,
                            firstname: child.firstname,
                            lastname: child.lastname,
                            gender: child.gender,
                            birthdate: dateUtils.formatFromJsonToSQLDate(child.birthdate), // Format birthdate here
                            allergy: child.allergy,
                            userId: familyData.userDetails.id  // Associate the child with the user's ID.
                        }
                    }), {}),
                    // tutorsDetails for each child are added to the formData similarly, as an object with tutor IDs as keys
                    // and tutor details as values. This is done using nested reduce() function on tutorsDetails array.
                    tutors: familyData.childrenDetails.reduce((acc, child) => {
                        child.tutorsDetails.forEach(tutor => {
                            acc[tutor.id] = {
                                id: tutor.id,
                                firstname: tutor.firstname,
                                lastname: tutor.lastname,
                                email: tutor.email,
                                gender: tutor.gender,
                                phoneNumber: tutor.phoneNumber,
                                address: tutor.address,
                                userId: familyData.userDetails.id
                            };
                        });
                        return acc;
                    }, {})
                });


            } catch (error) {
                console.error(`Error while fetching family details for user ${userId}`, error);
            } finally {
                // Once data is fetched (or an error occurs), set loading to false.
                setLoading(false);
            }
        };

        fetchFamilyDetails();
    }, [userId]); // Re-run the effect when the userId changes


    // *****************************************************************
    // ** Methods handle the edit mode and form data for each entity. **
    // ** They are called when the user interacts with the UI.        **
    // *****************************************************************

    /**
     * Toggle the edit mode for a specific entity (user, child or tutor) by changing the value of 'isEditing'.
     * @param entityType - Type of the entity ('user', 'children', or 'tutors').
     * @param [entityId] - Optional ID of the specific entity being edited (for children and tutors).
     */
    const handleEditToggle = (entityType, entityId) => {
        // If entityId is defined, toggle the specific entity (child or tutor).
        // If not, toggle the entire entity type (for user).
        // If no entityId is provided, we are toggling the edit mode for the user.
        setIsEditing(prev => ({
            ...prev,
            [entityType]: entityId !== undefined
                ? { ...prev[entityType], [entityId]: !prev[entityType][entityId] }
                : !prev[entityType]
        }));
    };

    /**
     * Update the formData object with the new value entered in an input field when the user types in it.
     * @param entityType - The type of entity ('user', 'children', 'tutors').
     * @param entityId - Optional ID of the entity (for children and tutors).
     * @param field - The field being updated (e.g., 'firstname', 'birthdate').
     * @param value - The new value being entered by the user.
     */
    const handleInputChange = (entityType, entityId, field, value) => {
        // Update the formData for the specified entity.
        // If the field is 'birthdate', we format it for SQL (YYYY-MM-DD) before updating the state.
        // This is because of the different formats used in the database and the input fields.
        setFormData(prev => ({
            ...prev,
            [entityType]: entityId !== undefined ? {
                    ...prev[entityType],
                    [entityId]: {
                        ...prev[entityType][entityId],
                        // Convertir la date de naissance au format SQL
                        [field]: field === 'birthdate' ? dateUtils.formatFromJsonToSQLDate(value) : value
                    }
                } : {
                    ...prev[entityType],
                // Convertir la date de naissance au format SQL
                    [field]: field === 'birthdate' ? dateUtils.formatFromJsonToSQLDate(value) : value
                }
        }));
    };

    /**
     * Cancel the changes made in the form fields and revert to the original values.
     * @param entityType - The type of entity ('user', 'children', 'tutors').
     * @param entityId - Optional ID of the entity (for children and tutors).
     */
    const handleCancel = (entityType, entityId) => {
        // Revert the formData to the original familyDetails for each entity.
        if (entityType === 'user') {
            setFormData(prev => ({
                ...prev,
                user: {...familyDetails.userDetails}
            }));
        } else if (entityType === 'children') {
            const childrenDetails = familyDetails.childrenDetails
                .find(child => child.id === entityId);
            setFormData(prev => ({
                ...prev,
                children: {
                    ...prev.children,
                    [entityId]: {
                        ...childrenDetails,    // Revert to the original child details
                        userId: familyDetails.userDetails.id  // Ensure userId is kept
                    }
                }
            }));
        } else if (entityType === 'tutors') {
            const childId = familyDetails.childrenDetails
                .find(child => child.tutorsDetails
                    .find(tutor => tutor.id === entityId));
            setFormData(prev => ({
                ...prev,
                tutors: {
                    ...prev.tutors,
                    [entityId]: {
                        ...childId.tutorsDetails          // Revert to the original child details
                            .find(tutor => tutor.id === entityId),
                        userId: familyDetails.userDetails.id   // Ensure userId is kept
                    }
                }
            }));
        }

        // Exit the edit mode for the entity
        setIsEditing(prev => ({
            ...prev,
            [entityType]: entityId !== undefined
                ? {...prev[entityType], [entityId]: false}
                : false
        }));
    };


    // *************************************************************
    // * Methods to save the changes, performing API backend calls *
    // *************************************************************

    /**
     * Method to save the changes made to the user details.
     * @returns {Promise<void>}
     */
    const handleSaveUser = async () => {
        try {
            await axiosInstance.put(`/admin/users/${userId}`, formData.user, { withCredentials: true });

            // Update local state with the new formData values
            setFamilyDetails(prev => ({
                ...prev,
                userDetails: { ...formData.user }
            }));

            // Exit the edit mode
            setIsEditing(prev => ({ ...prev, user: false }));
        } catch (error) {
            console.error(`Erreur lors de la sauvegarde des détails de l'utilisateur :`, error);
        }
    };

    /**
     * Method to save the updated child details by sending a PUT request to the API.
     * @param childId - The ID of the child whose details are being updated.
     */
    const handleSaveChild = async (childId) => {
        try {
            // Get the child data from formData using the childId.
            const childPayload =  formData.children[childId] || {};

            // Send the updated child data to the backend using a PUT request.
            await axiosInstance.put(`/admin/children/${childId}`, childPayload, { withCredentials: true });

            // After a successful update, update the local familyDetails state with the new data.
            setFamilyDetails(prev => ({
                ...prev,
                // Replace the old child data with the updated data from formData.
                childrenDetails: prev.childrenDetails.map(child =>
                    child.id === childId ? { ...child, ...formData.children[childId] } : child  // Assurez-vous de merger correctement
                )
            }));

            // Exit the edit mode for the child being saved.
            setIsEditing(prev => ({
                ...prev,
                children: {
                    ...prev.children,
                    [childId]: false // Mark this child as not being edited anymore.
                }
            }));
        } catch (error) {
            console.error(`Erreur lors de la sauvegarde des détails de l'enfant :`, error);
        }
    };

    /**
     * Method to save the updated tutor details by sending a PUT request to the API.
     * @param tutorId - The ID of the tutor being saved.
     */
    const handleSaveTutor = async (tutorId) => {
        try {
            // Get the tutor data from formData using the tutorId.
            await axiosInstance.put(`/admin/tutors/${tutorId}`, formData.tutors[tutorId], { withCredentials: true });

            // Update the local familyDetails state with the new tutor data.
            setFamilyDetails(prev => ({
                ...prev,
                // For each child, find the tutor by tutorId and update the tutor details.
                childrenDetails: prev.childrenDetails.map(child => ({
                    ...child,
                    tutorsDetails: child.tutorsDetails.map(tutor =>
                        tutor.id === tutorId ? { ...tutor, ...formData.tutors[tutorId] } : tutor
                    )
                }))
            }));

            // Exit the edit mode for the tutor being saved.
            setIsEditing(prev => ({
                ...prev,
                tutors: {
                    ...prev.tutors,
                    [tutorId]: false // Mark this tutor as not being edited anymore.
                }
            }));
        } catch (error) {
            console.error(`Erreur lors de la sauvegarde des détails du tuteur :`, error);
        }
    };

    // ************************************************************************
    // * Methods to delete user, child or tutor, performing API backend calls *
    // ************************************************************************

    // Function to handle User deletion
    const handleDeleteUser = async (user) => {
        if (!window.confirm(`Êtes-vous sûr de vouloir supprimer cet utilisateur ${user.firstname} ${user.lastname} ?`)) return;

        try {
            const userId = user.id;
            const response = await axiosInstance.delete(`/admin/users/${userId}`);

            if (response.status === 204) {
                // Navigate back to the families list after user deletion
                navigate('/admin/families');
            } else {
                console.error('Erreur lors de la suppression de l\'utilisateur :', response);
            }
        } catch (error) {
            console.error('Erreur lors de la suppression:', error);
        }
    };

    // Function to handle Child deletion
    const handleDeleteChild = async (child) => {
        if (!window.confirm(`Êtes-vous sûr de vouloir supprimer cet enfant ${child.firstname} ${child.lastname?.toUpperCase()} ?`)) return;

        try {
            const childId = child.id;
            const response = await axiosInstance.delete(`/admin/children/${childId}`);

            if (response.status === 204) {
                // After deletion, update the local state by removing the deleted child
                setFamilyDetails(prev => ({
                    ...prev,
                    childrenDetails: prev.childrenDetails.filter(child => child.id !== childId),
                }));
            } else {
                console.error('Erreur lors de la suppression de l\'enfant:', response);
            }
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'enfant :', error);
        }
    };

    // Function to handle Tutor deletion
    const handleDeleteTutor = async (tutor) => {
        if (!window.confirm(`Êtes-vous sûr de vouloir supprimer ce tuteur ${tutor.firstname} ${tutor.lastname?.toUpperCase()} ?`)) return;

        try {
            const tutorId = tutor.id;
            const response = await axiosInstance.delete(`/admin/tutors/${tutorId}`);

            if (response.status === 204) {
                // After deletion, update the local state by removing the deleted tutor
                setFamilyDetails(prev => ({
                    ...prev,
                    // For each child, find the tutor by tutorId and update the tutor details.
                    childrenDetails: prev.childrenDetails.map(child => ({
                        ...child,
                        tutorsDetails: child.tutorsDetails.filter(tutor => tutor.id !== tutorId
                        )
                    }))


                    // tutorsDetails: prev.tutorsDetails.filter(tutor => tutor.id !== tutorId),
                }));
            } else {
                console.error('Erreur lors de la suppression du tuteur :', response);
            }
        } catch (error) {
            console.error('Erreur lors de la suppression du tuteur :', error);
        }
    };

    /*************************************************/
    /******** Template when loading/no result ********/
    /*************************************************/

    // If the data is still loading, display a loading message
    if (loading) {
        return <p>Chargement des détails de la famille...</p>;
    }

    // In case the familyDetails object is empty, display a message
    if (!familyDetails) {
        return <p>Aucune donnée disponible pour cette famille.</p>;
    }


    /**************************************************/
    /****************** JSX Template ******************/
    /**************************************************/
    return (
        <section className="family-details-container">
            <button onClick={() => navigate(-1)} className="back-button">← Retour</button>
            <h1>Détails de la Famille</h1>


            {/* AdminUserDetailsComponent */}
            <AdminUserDetailsComponent
                userDetails={familyDetails.userDetails}
                formData={formData.user}
                isEditing={isEditing.user}
                handleInputChange={handleInputChange}
                handleSaveUser={handleSaveUser}
                handleCancel={handleCancel}
                handleEditToggle={handleEditToggle}
                handleDeleteUser={handleDeleteUser}
            />

            {/* Children and their Tutors */}
            <section className="children-details">
                <h2>Enfant(s) :</h2>
                {familyDetails.childrenDetails && familyDetails.childrenDetails.length > 0 ?
                    (familyDetails.childrenDetails.map(child => (
                        <AdminChildDetailsComponent
                            key={child.id}
                            child={child}
                            formData={{
                                    child: formData.children[child.id],
                                    tutors: formData.tutors
                                }} // Correctly pass child-specific formData
                            isEditing={{
                                    child: isEditing.children[child.id],
                                    tutors: isEditing.tutors
                                }} // Pass the isEditing status for child and tutors
                            handleInputChange={handleInputChange}
                            handleSaveChild={handleSaveChild}
                            handleSaveTutor={handleSaveTutor}
                            handleCancel={handleCancel}
                            handleEditToggle={handleEditToggle}
                            handleDeleteChild={handleDeleteChild}
                            handleDeleteTutor={handleDeleteTutor}
                        />
                ))) : (
                    <p className="no-child-text">Aucun enfant enregistré pour cette famille.</p>
                )}
            </section>
        </section>
    );
}
