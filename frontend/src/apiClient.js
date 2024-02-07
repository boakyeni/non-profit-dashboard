'use client'
import axios from 'axios';

const apiClient = axios.create({
    baseURL: '',
    withCredentials: true,

});
// CSRF Token handling for Django
// Assuming Django sets CSRF token in a cookie named 'csrftoken'
const getCsrfToken = () => {
    if (typeof window !== 'undefined') {
        return document.cookie.split('; ').find(row => row.startsWith('csrftoken='))
            ?.split('=')[1];
    }
    return null;
};

apiClient.defaults.headers.common['X-CSRFToken'] = getCsrfToken();



apiClient.interceptors.request.use(function (config) {
    // Try to get the auth token from localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;

    // If the token exists, add it to the request's Authorization header
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Gets new access token or redirects to login to get new redirect and access
apiClient.interceptors.response.use(async response => {
    // Simply return the response if it's successful
    return response;
}, async error => {
    const originalRequest = error.config;

    // Avoid retrying for the refresh token endpoint itself prevents infinite loop
    if (originalRequest.url.includes('/api/auth/jwt/refresh/')) {
        // If the refresh token request fails, redirect to login and don't retry
        if (typeof window !== 'undefined') {
            window.location.href = '/auth/login';
        }
        return Promise.reject(error);
    }

    // Check if the response is 401 and we haven't already retried the request
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;  // Mark that we're retrying the request

        try {
            // Attempt to refresh the token by calling your refresh token endpoint
            const response = await apiClient.get('http://localhost:8000/api/auth/jwt/refresh/');
            localStorage.setItem('access_token', response.data.access)
            // If the token was successfully refreshed, retry the original request
            return apiClient(originalRequest);
        } catch (refreshError) {
            // If the refresh attempt itself failed, redirect to login
            if (typeof window !== 'undefined') {
                window.location.href = '/auth/login';
            }
            console.log(refreshError.response.data)
            return Promise.reject(refreshError);
        }
    }

    // For all other errors, just forward them
    return Promise.reject(error);
});


export default apiClient;

