import axios from 'axios';

const apiClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1`,
    withCredentials: true,
});

export default apiClient;