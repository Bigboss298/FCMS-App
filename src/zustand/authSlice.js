import { authInstance as axios } from '../utils/axios';
import { getSession, setSession } from '../utils/jwt';

const authSlice = (set, get) => ({
    auth: {
        token: getSession(),
        isInitialized: false,
        isAuthenticated: !!getSession(),
        loading: false,
        user: null,
        error: null,
        message: null,
        setIsInitialized: () => set((state) => ({ ...state, auth: { ...state.auth, isInitialized: true } })),
        setLoading: (value) => set((state) => ({ ...state, auth: { ...state.auth, loading: value } })),
        clearError: () => set((state) => ({ ...state, auth: { ...state.auth, error: null } })),
        clearMessage: () => set((state) => ({ ...state, auth: { ...state.auth, message: null } })),
    },
    forgot: {
        loading: false,
        success: false,
        error: null,
        setLoading: (value) => set((state) => ({ ...state, forgot: { ...state.forgot, loading: value } })),
        clearError: () => set((state) => ({ ...state, forgot: { ...state.forgot, error: null } })),
    },
    login: async (data) => {
        get().auth.setLoading(true);

        try {
          //   const payload = { ...data, domain: 'taJneed' };
            const payload = { ...data};

            const res = await axios.post(`/api/User/SignIn`, payload);

            // set token to localStorage
            setSession(res.data.token);

            set((state) => ({
                ...state,
                auth: {
                    ...state.auth,
                    token: res.data.token,
                    isAuthenticated: true,
                    user: res.data.user,
                    loading: false,
                },
            }));
        } catch (error) {
            setSession();
            set((state) => ({
                ...state,
                auth: {
                    ...state.auth,
                    error: handleError(error),
                    token: null,
                    isAuthenticated: false,
                    loading: false,
                },
            }));
        }
    },
    getCurrentUser: async () => {
        get().auth.setLoading(true);

        try {
            // add token to axiosInstance (instance used to make request to MAAL service)
            // headers immediately because the token exists
            const res = await axios.get('/api/v1/users/current');

            set((state) => ({
                ...state,
                auth: {
                    ...state.auth,
                    user: res.data,
                    loading: false,
                },
            }));
        } catch (error) {
            setSession();
            set((state) => ({
                ...state,
                auth: {
                    ...state.auth,
                    user: null,
                    token: null,
                    isAuthenticated: false,
                    error: handleError(error),
                    loading: false,
                },
            }));
        }
    },
    logout: () => {
        setSession();
        set((state) => ({
            ...state,
            auth: {
                ...state.auth,
                token: null,
                user: null,
                isAuthenticated: false,
            },
        }));
    },
    forgotPassword: async (id) => {
        get().forgot.setLoading(true);
        try {
            await axios.post('/api/self-services/forgot-password', null, {
                params: {
                    'membership-id': id,
                },
            });

            set((state) => ({
                ...state,
                forgot: {
                    ...state.forgot,
                    success: true,
                    loading: false,
                },
            }));
        } catch (error) {
            set((state) => ({
                ...state,
                forgot: {
                    ...state.forgot,
                    error: error?.data?.message || 'Unexpected error, Please try again',
                    success: false,
                    loading: false,
                },
            }));
        }
    },
});

const handleError = (error) => {
    const message = error?.data?.message;

    switch (true) {
        case message?.includes('invalid authentication details supplied'):
            return 'Incorrect MKAN ID / Password';
        case message:
            return message;
        default:
            return 'Internal server error';
    }
};

export default authSlice;
