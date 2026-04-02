import axios from 'axios';

// When live on internet, it uses your VITE_API_URL environment variable.
// When testing locally, this falls back to '/api' so your Vite proxy catches it!
const backendUrl = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
    baseURL: backendUrl,
    withCredentials: true // Crucial for Passport Session authentication!
});

export default api;
