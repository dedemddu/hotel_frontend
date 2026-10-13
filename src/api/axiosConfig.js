import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://192.168.1.41:4000/api',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 5000
});

export default api;