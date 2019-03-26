import axios from 'axios';

const api = axios.create({
  baseURL: 'https://hooks.zapier.com/hooks/catch',
});

export default api;
