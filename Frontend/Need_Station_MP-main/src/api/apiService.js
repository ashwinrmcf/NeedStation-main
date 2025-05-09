import axios from 'axios';

// Create a base API instance with common configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const apiService = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication if needed
apiService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for common error handling
apiService.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors here
    if (error.response) {
      // Server responded with a status code outside of 2xx range
      if (error.response.status === 401) {
        // Handle unauthorized access
        localStorage.removeItem('authToken');
        // Redirect to login if needed
      }
      
      // Log errors in development
      if (process.env.NODE_ENV === 'development') {
        console.error('API Error:', error.response.data);
      }
    }
    return Promise.reject(error);
  }
);

// OTP related API endpoints
export const otpService = {
  sendOtp: (data) => {
    return apiService.post('/otp/send', data);
  },
  
  verifyOtp: (otpId) => {
    return apiService.get(`/otp/verify/${otpId}`);
  },
};

// User registration API endpoints
export const userService = {
  registerWorker: (formData) => {
    return apiService.post('/workers/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  updateWorkerProfile: (id, formData) => {
    return apiService.put(`/workers/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default apiService;