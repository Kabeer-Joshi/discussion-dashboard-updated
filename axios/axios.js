import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: 'https://discussionapi.goreeva.com/api',
});

let isRefreshing = false;
let refreshQueue = [];

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('access_token');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      error.response.statusText === 'Unauthorized' &&
      !originalRequest._retry
    ) {
      if (!isRefreshing) {
        isRefreshing = true;
        originalRequest._retry = true;

        try {
          const refreshToken = Cookies.get('refresh_token');
          const response = await axiosInstance.post('/token/refresh/', {
            refresh: refreshToken,
          });

          // Update cookies with new tokens
          Cookies.set('access_token', response.data.access, {
            sameSite: 'lax',
            expires: 7
          });

          // Update Authorization header
          axiosInstance.defaults.headers['Authorization'] =
            'Bearer ' + response.data.access

          // Process refresh queue
          refreshQueue.forEach(({ resolve, request }) => {
            request.headers['Authorization'] = 'Bearer ' + response.data.access
            resolve(axiosInstance(request))
          })
          refreshQueue = []

          // Retry original request
          originalRequest.headers['Authorization'] =
            'Bearer ' + response.data.access
          return axiosInstance(originalRequest)

        } catch (refreshError) {
          // Clear cookies and redirect to login
          Cookies.remove('access_token')
          Cookies.remove('refresh_token')
          window.location.href = '/auth/login'
          return Promise.reject(refreshError)
        } finally {
          isRefreshing = false
        }
      } else {
        // Queue the request if refresh is in progress
        return new Promise((resolve) => {
          refreshQueue.push({ resolve, request: originalRequest })
        })
      }
    }
    return Promise.reject(error)
  }
);

export default axiosInstance;
