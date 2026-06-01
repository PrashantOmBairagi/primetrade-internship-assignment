import api from './axios';

export const loginUser = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data; // Response contains: { token, email, role }
};

export const registerUser = async (email, password, role) => {
  const response = await api.post('/auth/register', { email, password, role });
  return response.data; // Response contains: { token, email, role }
};
