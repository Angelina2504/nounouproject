import { useEffect, useState } from 'react';
import axiosInstance from '../services/httpClient';
import CardTemplate from './CardTemplate';

export default function FamiliesCards() {
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
