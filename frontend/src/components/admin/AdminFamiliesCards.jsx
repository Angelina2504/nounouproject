import { useEffect, useState } from 'react';
import axiosInstance from '../../services/httpClient.js';
import CardTemplate from './CardTemplate.jsx';

export default function AdminFamiliesCards() {
    const [families, setFamilies] = useState([]);

    const fetchFamilies = async () => {
        try {
            const response = await axiosInstance.get('/admin/families');
            setFamilies(response.data.families);
        } catch (error) {
            console.error('Erreur lors du chargement des familles', error);
        }
    };

    useEffect(() => {
        fetchFamilies();
    }, []);

    return (
        <div className="family-cards">
            {families.map((family) => (
                <CardTemplate
                    key={family.user.id}
                    family={family}
                />
            ))}
        </div>
    );
}
