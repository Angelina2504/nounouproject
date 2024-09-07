import { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axiosInstance from '../services/httpClient';
import '../styles/familyDetails.css';

export default function FamilyDetails() {
    const { userId } = useParams(); // To get the userId from the route URL
    const [familyDetails, setFamilyDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFamilyDetails = async () => {
            try {
                const response = await axiosInstance.get(`/admin/families/${userId}`, { withCredentials: true });
                setFamilyDetails(response.data.familyDetails);
            } catch (error) {
                console.error(`Error while fetching family details for user ${userId}`, error);
            } finally {
                setLoading(false);
            }
        };

        fetchFamilyDetails();
    }, [userId]);

    if (loading) {
        return <p>Chargement des détails de la famille...</p>;
    }

    if (!familyDetails) {
        return <p>Aucune donnée disponible pour cette famille.</p>;
    }

    // Destructuring the familyDetails object to get userDetails and childrenDetails separately
    const { userDetails, childrenDetails } = familyDetails;

    return (
        <div className="family-details-container">
            <button onClick={() => navigate(-1)} className="back-button">← Retour</button>
            <h1>Détails de la Famille</h1>

            <section className="user-details">
                <h2>Compte utilisateur : {userDetails.firstname} {userDetails.lastname}</h2>
                <p><strong>Email :</strong> {userDetails.email}</p>
                <p><strong>Téléphone :</strong> {userDetails.phoneNumber}</p>
                <p><strong>Adresse :</strong> {userDetails.address}</p>
            </section>

            <section className="children-details">
                <h2>Enfant(s)</h2>
                {childrenDetails.map(child => (
                    <div key={child.id} className="child-card">
                        <h3>{child.firstname} {child.lastname}</h3>
                        <p><strong>Date de naissance :</strong> {new Date(child.birthdate).toLocaleDateString()}</p>
                        <p><strong>Genre :</strong> {child.gender}</p>
                        <p><strong>Allergies :</strong> {child.allergy || 'Aucune'}</p>

                        <section className="tutors-details">
                            <h4>Tuteur(s)</h4>
                            {child.tutors && child.tutors.length > 0 ? (
                                <div className="tutor-grid">
                                    {child.tutors.map(tutor => (
                                        <div key={tutor.id} className="tutor-card">
                                            <p><strong>{tutor.firstname} {tutor.lastname}</strong></p>
                                            <p><strong>Email :</strong> {tutor.email}</p>
                                            <p><strong>Téléphone :</strong> {tutor.phoneNumber}</p>
                                            <p><strong>Adresse :</strong> {tutor.address}</p>
                                            <p><strong>Genre :</strong> {tutor.gender}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>Aucun tuteur pour cet enfant.</p>
                            )}
                        </section>
                    </div>
                ))}
            </section>
        </div>
    );
}
