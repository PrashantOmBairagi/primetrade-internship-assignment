import axios from 'axios';

// Create a standard custom axios instance
const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// INTERCEPTOR PATTERN EXPLAINED:
// Instead of manually appending the JWT authorization header in every single Axios request in our app, 
// we set up a Request Interceptor. This intercepts outgoing requests, reads the token from 
// localStorage, and automatically adds 'Authorization: Bearer <token>' to the headers!
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
