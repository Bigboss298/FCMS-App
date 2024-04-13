import axios from 'axios';
import { PATH_AUTH } from '../routes/path';
import { setSession } from './jwt';

export const handleUnauthorizedRequest = (error) => {
    if (error && (error.status === 401 || error.statusCode === 401)) {
        setSession();
        // push to log in immediately when not auth path, token is not valid
        if (!window.location.pathname.includes('auth')) {
            window.location.replace(PATH_AUTH.login);
        }
    }
};

// This instance handles call to TALEEM service
const axiosInstance = axios.create({
    baseURL: process.env.API_BASE_URL,
    timeout: 10000,
});

// This instance handles call to TAJNEED for auth token
const authInstance = axios.create({
    baseURL: "http://farmercustomer-001-site1.jtempurl.com",
    timeout: 20000,
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        handleUnauthorizedRequest(error.response || error);
        return Promise.reject(error.response);
    },
);

authInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        handleUnauthorizedRequest(error.response || error);
        return Promise.reject(error.response);
    },
);

export { axiosInstance, authInstance };
