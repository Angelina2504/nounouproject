 import { useState, useEffect } from 'react';
 import axiosInstance from '../../services/httpClient';

 export default function Download() {

    const [files, setFiles] = useState([]);

    // Récupérer la liste des fichiers au chargement
    useEffect(() => {
      const fetchFiles = async () => {
        try {
          const response = await axiosInstance.get('/uploads/list');
          setFiles(response.data);
        } catch (error) {
          console.error('Erreur lors de la récupération des fichiers :', error);
        }
      };
  
      fetchFiles();
    }, []);
  
    return (
      <div>
      {files.map((file, index) => (
        <img key={index} src={file} alt={`Uploaded ${index}`} style={{ width: '200px', margin: '10px' }} />
      ))}
    </div>
    );
  }
  
  