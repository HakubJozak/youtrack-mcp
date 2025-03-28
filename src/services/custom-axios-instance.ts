import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import type { YouTrackConfig } from './youtrack-service.js';

let axiosInstance = axios.create({});

/**
 * Configures the Axios instance with YouTrack API settings
 * @param config YouTrack API configuration
 * @returns Configured Axios instance
 */
export const configureAxiosInstance = (config: YouTrackConfig) => {
  axiosInstance = axios.create({
    baseURL: config.baseUrl,
    headers: {
      'Authorization': `Bearer ${config.token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  });

  // Add request interceptor for logging
  axiosInstance.interceptors.request.use(
    (config) => {
      // Avoid logging sensitive info in production
      console.debug(`Request: ${config.method?.toUpperCase()} ${config.url}`);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add response interceptor for error handling
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response) {
        // Format error message with details
        const errorMessage = 
          `YouTrack API error: ${error.response.status} ${error.response.statusText}\n` +
          `URL: ${error.config.url}\n` +
          `Method: ${error.config.method?.toUpperCase()}\n` +
          `Response: ${JSON.stringify(error.response.data, null, 2)}`;
        
        console.error(errorMessage);
        return Promise.reject(new Error(errorMessage));
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

/**
 * Creates custom Axios request with the configured instance
 * This function signature matches what Orval expects
 */
export const createCustomAxiosInstance = <T>(config: AxiosRequestConfig) => {
  return axiosInstance<T, T>(config);
};

// Default export for use with Orval
export default createCustomAxiosInstance;