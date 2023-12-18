import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL, 
  headers: {
    'Content-Type': 'application/json', 
  },
});

axiosInstance.interceptors.response.use(
    (response:any) => {
      return response;
    },
    (error:any) => {
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
      return Promise.reject(error);
    }
);

export default axiosInstance;