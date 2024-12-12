import { useState } from 'react';
import axiosInstance from '../../services/httpClient';

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Stocke le fichier sélectionné
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage('Veuillez sélectionner un fichier.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axiosInstance.post('/uploads', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Une erreur est survenue.');
    }
  };

  return (
    <div>
      <h2>Upload de fichier</h2>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} accept=".jpeg,.png,.pdf" />
        <button type="submit">Envoyer</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

