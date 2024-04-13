import jwtDecode from 'jwt-decode';
import { axiosInstance as axios, authInstance } from './axios';

// ----------------------------------------------------------------------

const isValidToken = (accessToken) => {
    if (!accessToken) {
        return false;
    }
    const decoded = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
};

const handleTokenExpired = (exp) => {
    let expiredTimer;

    window.clearTimeout(expiredTimer);
    const currentTime = Date.now();
    const timeLeft = exp * 1000 - currentTime;
    // console.log(timeLeft);
    expiredTimer = window.setTimeout(() => {
        // console.log('expired');
        // You can do what ever you want here, like show a notification
        // TODO: ADD a modal to show logout
    }, timeLeft);
};

const setSession = (accessToken) => {
    if (accessToken) {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem('accessToken', accessToken);
            // set token to axiosInstance
            axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
            // set token to authInstance
            authInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
            // This function below will handle when token is expired
            const { exp } = jwtDecode(accessToken);
            handleTokenExpired(exp);
        }
    } else {
        if (typeof window !== 'undefined') {
            window.localStorage.removeItem('accessToken');
        }
        // delete from the two instance
        delete axios.defaults.headers.common.Authorization;
        delete authInstance.defaults.headers.common.Authorization;
    }
};

const getSession = () => {
    if (typeof window !== 'undefined') {
        return window.localStorage.getItem('accessToken');
    }

    return null;
};

export { isValidToken, setSession, getSession };
