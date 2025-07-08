import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:9090/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Interceptor para agregar el token JWT si existe
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log(token);
    // Agrega el header Authorization solo si hay token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
