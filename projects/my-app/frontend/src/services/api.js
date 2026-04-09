import axios from 'axios';

// When live on internet, it uses your VITE_API_URL environment variable.
// When testing locally, this falls back to '/api' so your Vite proxy catches it!
const backendUrl = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
    baseURL: backendUrl,
    withCredentials: true // Crucial for Passport Session authentication!
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // Get token from storage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Add to header
    }
    return config;
});

export default api;
