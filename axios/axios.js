import axios from 'axios';

const baseURL = 'https://discussionapi.goreeva.com/api/';

let isRefreshing = false;
let refreshQueue = [];

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 20000,
  skipIntercept: false,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use(async (request) => {
  if (typeof window !== 'undefined') {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      request.headers['Authorization'] = `Bearer ${accessToken}`;
    } else {
      window.location.href = '/auth/login/';
    }
  }

  return request;
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data.status && response.data.status !== 200) {
      throw new Error(response?.data?.message || 'Oops something went wrong! ');
    }
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (typeof error.response === 'undefined') {
      console.log(
        'A server/network error occurred. Looks like CORS might be the problem. Sorry about this - we will get it fixed shortly.',
      );
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      error.response.statusText === 'Unauthorized' &&
      originalRequest.url === '/token/refresh/'
    ) {
      // Handle the case where the /token/refresh/ endpoint returns 401 (Unauthorized)
      console.log('Refresh token expired or invalid');
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.href = '/auth/login/';
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      error.response.statusText === 'Unauthorized' &&
      !axiosInstance.defaults.skipIntercept
    ) {
      let refreshToken = localStorage.getItem('refresh_token');

      if (refreshToken) {
        if (!isRefreshing) {
          isRefreshing = true;

          try {
            const response = await axiosInstance.post('/token/refresh/', {
              refresh: refreshToken,
            });
            console.log('Refresh response: ', response);

            localStorage.setItem('access_token', response.data.access);
            axiosInstance.defaults.headers['Authorization'] =
              'Bearer ' + response.data.access;

            // Replay the queued requests
            refreshQueue.forEach(({ resolve, reject, request }) => {
              request.headers['Authorization'] =
                'Bearer ' + response.data.access;
              axiosInstance(request).then(resolve).catch(reject);
            });

            refreshQueue = [];

            isRefreshing = false;
            return axiosInstance(originalRequest);
          } catch (refreshError) {
            console.log('Refresh err: ', refreshError);
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = '/auth/login/';
            return Promise.reject(error);
          }
        } else {
          // Queue the request if refresh is already in progress
          return new Promise((resolve, reject) => {
            refreshQueue.push({ resolve, reject, request: originalRequest });
          });
        }
      } else {
        console.log('Refresh token not available.');
        window.location.href = '/auth/login/';
      }
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  },
);

export default axiosInstance;
