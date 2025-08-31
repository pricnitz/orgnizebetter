import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  return response.data;
};

export const register = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/register`, { email, password });
  return response.data;
};

export const getUser = async () => {
  const response = await axios.get(`${API_URL}/user`);
  return response.data;
};

export const logout = async () => {
  // In a real application, you would make a request to the backend to invalidate the token.
  // For this example, we'll just remove the token from local storage.
  // You might need to install a library for local storage, e.g. @react-native-async-storage/async-storage
  // await AsyncStorage.removeItem('token');
  return Promise.resolve();
};