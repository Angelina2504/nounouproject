 import { useState } from 'react';
 import axiosInstance from '../../services/httpClient';

 export default function Download() {
    const [file, setFile] = useState(null);
    const [uploadedFiles, setUploadedFiles] = useState([]);
  
    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
    };
  
    const handleUpload = async () => {
      const formData = new FormData();
      formData.append('file', file);
  
      try {
        const response = await axiosInstance.post('http://localhost:3000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        // Ajouter le fichier téléchargé à la liste
        setUploadedFiles((prev) => [...prev, response.data.file]);
        alert('Fichier téléchargé avec succès !');
      } catch (error) {
        console.error('Erreur lors du téléchargement :', error);
        alert('Une erreur est survenue.');
      }
    };
  
    return (
      <div>
   
        <h2>Fichiers téléchargés</h2>
        <ul>
          {uploadedFiles.map((file, index) => (
            <li key={index}>
              <a href={`http://localhost:3000${file.path}`} target="_blank" rel="noopener noreferrer">
                {file.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  