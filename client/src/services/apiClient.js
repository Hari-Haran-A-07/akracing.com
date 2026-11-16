// Centralized API configuration for AKR platform

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const defaultHeaders = {
  'Content-Type': 'application/json',
};

const getAuthHeaders = () => {
  const token = localStorage.getItem('akr_token');
  return token ? { ...defaultHeaders, Authorization: 'Bearer ' + token } : defaultHeaders;
};

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }
  return data;
};

export const apiClient = {
  get: async (endpoint) => {
    const response = await fetch(API_BASE_URL + endpoint, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  post: async (endpoint, body) => {
    const response = await fetch(API_BASE_URL + endpoint, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(body),
    });
    return handleResponse(response);
  },

  put: async (endpoint, body) => {
    const response = await fetch(API_BASE_URL + endpoint, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(body),
    });
    return handleResponse(response);
  },

  delete: async (endpoint) => {
    const response = await fetch(API_BASE_URL + endpoint, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};

export default apiClient;
