import axios from 'axios';

const api = axios.create({
  baseURL: 'https://company-website-bceo.onrender.com/api',
  timeout: 10000,
});

export const unwrapApiData = (response, key) => {
  const payload = response?.data;

  if (Array.isArray(payload)) return payload;
  if (payload && Array.isArray(payload.data)) return payload.data;
  if (payload && payload.data && key && Array.isArray(payload.data[key])) return payload.data[key];
  if (payload && Array.isArray(payload[key])) return payload[key];
  if (payload && payload.data && typeof payload.data === 'object') return payload.data;
  if (payload && typeof payload === 'object') return payload;

  return [];
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log('API request sent', config.method?.toUpperCase(), config.url, config.headers?.Authorization ? 'with token' : 'without token');
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log('API response received', response.config.url, response.status, response.data);
    return response;
  },
  (error) => {
    console.error('API request failed:', error.response?.data || error.message || error);
    return Promise.reject(error);
  }
);

export default api;
