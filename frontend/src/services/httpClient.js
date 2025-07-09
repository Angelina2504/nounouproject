import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}` || '/api', // URL de l'API du back end
    withCredentials: false // permet de passer les cookies
});

export default axiosInstance;
