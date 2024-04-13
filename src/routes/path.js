function path(root, sublink) {
    return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
    root: ROOTS_AUTH,
    login: path(ROOTS_AUTH, '/login'),
    resetPassword: path(ROOTS_AUTH, '/reset-password'),
    forgotPassword: path(ROOTS_AUTH, '/forgot-password'),
};

export const PATHS = {
    root: ROOTS_DASHBOARD,
};
