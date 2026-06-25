import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for automatic retries
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;

    // Reject if config does not exist
    if (!config) {
      return Promise.reject(error);
    }

    config.retryCount = config.retryCount || 0;
    const maxRetries = 2; // Try up to 2 more times

    // Only retry GET requests to avoid duplicating POST/PUT/DELETE
    if (config.method !== 'get') {
      return Promise.reject(error);
    }

    if (config.retryCount >= maxRetries) {
      return Promise.reject(error);
    }

    config.retryCount += 1;
    
    // Wait for 3 seconds before retrying
    await new Promise((resolve) => setTimeout(resolve, 3000));
    
    return api(config);
  }
);

export default api;
