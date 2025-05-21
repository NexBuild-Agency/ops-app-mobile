import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || 'https://api.example.com',
  headers: {
    'Content-Type': 'application/json',
  },
  // Increase timeout to 15 seconds
  timeout: 15000,
  // Add retry configuration
  validateStatus: (status) => status >= 200 && status < 500,
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor with retry logic
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { config, response } = error;
    
    // Only retry on network errors or 5xx errors
    if (!response || (response && response.status >= 500)) {
      // Check if we already tried retrying
      if (!config._retry) {
        config._retry = true;
        
        try {
          // Wait 1 second before retrying
          await new Promise(resolve => setTimeout(resolve, 1000));
          return await api(config);
        } catch (retryError) {
          return Promise.reject(retryError);
        }
      }
    }

    // Log error details
    if (response) {
      console.error('API Error:', response.data);
      console.error('Status:', response.status);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    
    return Promise.reject(error);
  }
);