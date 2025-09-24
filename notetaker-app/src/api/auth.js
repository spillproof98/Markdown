import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL_AUTH || 'http://localhost:5000/api/auth';


console.log("API_URL:", API_URL);

const handleRequest = async (fn) => {
  try {
    const res = await fn();
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const register = ({ email, password, confirmPassword }) =>
  handleRequest(() =>
    axios.post(`${API_URL}/register`, { email, password, confirmPassword })
  );

export const login = ({ email, password }) =>
  handleRequest(() => {
    return axios.post(`${API_URL}/login`, { email, password });
  });
