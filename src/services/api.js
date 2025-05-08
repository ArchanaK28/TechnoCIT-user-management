import axios from 'axios';

// const API_BASE_URL = 'http://31.220.82.50:202/api';
const API_BASE_URL = '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      // config.headers['Authorization'] = "Bearer 1archana"
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response || error);
    return Promise.reject(error);
  }
);

export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post('/Auth/Register', userData);
    
    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    if (response.data && response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response;
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post('/Auth/Authentication', credentials);
    
    // Store token in localStorage
    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    if (response.data && response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error;
  }
};

// Sports API
export const getAllSports = () => {
  return apiClient.get('/Sport/GetAllSports');
};

// User APIs
export const getUsersList = () => {
  return apiClient.get('/User/GetUsersList');
};

export const getUserProfile = (userId) => {
  return apiClient.get(`/User/getuserprofile/${userId}`);
};

export default apiClient;