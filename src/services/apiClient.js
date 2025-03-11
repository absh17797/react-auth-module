import axios from 'axios';
import { store } from '../app/store';

// src/services/apiClient.js
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const apiClient = axios.create({
  baseURL: 'https://users-auth-mern.onrender.com/api/',
  timeout: 5000,
});

apiClient.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



const customBaseQuery = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({ 
    baseUrl: apiClient.defaults.baseURL,
    prepareHeaders: (headers) => {
        const token = store.getState().auth.token; // Get token from Redux store
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
      },
 });
  
  // Call the base query
  const result = await baseQuery(args, api, extraOptions);

  // Handle the response
  if (result.error) {
    // Handle error response
    console.error('API call error:', result.error);
    return {
      error: {
        message: result?.error?.data?.message || 'An error occurred',
        status: result?.error?.status,
      },
    };
  }

  // Assuming the response is in the format you provided
  const { success, message, data, errors } = result.data;

  // Return the formatted response
  return {
    data: {
      success,
      message,
      data,
      errors,
    },
  };
};

export default customBaseQuery;