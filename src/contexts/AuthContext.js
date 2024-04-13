import { createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
// utils
import { getSession, isValidToken, setSession } from '../utils/jwt';
import { useAuthStore } from '../zustand/store';
import useError from '../hooks/useError';
import { useRouter } from 'next/router';
import { PATH_AUTH } from '../routes/path';

// ----------------------------------------------------------------------
const AuthContext = createContext(null);

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
    children: PropTypes.node,
};

function AuthProvider({ children }) {
    const router = useRouter();
    const store = useAuthStore();

    const { auth, getCurrentUser } = store;

    const { error, clearError, setIsInitialized, token, loading, isInitialized } = auth;

    useEffect(() => {
        const initialize = async () => {
            // initialize application
            setIsInitialized();

            const accessToken = getSession();

            if (accessToken && isValidToken(accessToken)) {
                setSession(accessToken);

                getCurrentUser();
            }
        };

        initialize();

        // eslint-disable-next-line
    }, []);

    useError(error, clearError);

    useEffect(() => {
        // added router.pathname check because of reset-password page
        if (isInitialized && !loading && !token && !router.pathname.includes('auth')) {
            router.push(PATH_AUTH.login);
        }

        // eslint-disable-next-line
    }, [token, isInitialized, loading]);

    return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
