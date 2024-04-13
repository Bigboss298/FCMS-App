import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import ForgotPasswordForm from './ForgotPasswordForm';
import NextLink from 'next/link';
import { PATH_AUTH } from '../../../routes/path';
import ForgotPasswordMessage from './ForgotPasswordMessage';

const ForgotPasswordFormContainer = () => {
    const [sent, setSent] = useState(false);
    const sendRequest = () => setSent(true);

    return (
        <Box sx={{ maxWidth: 480, mx: 'auto' }}>
            {!sent ? (
                <>
                    <Typography variant='h3' paragraph>
                        Forgot your password?
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                        Please enter your Jama'at membership ID or MKAN ID and We will email you a link to reset your
                        password.
                    </Typography>

                    <ForgotPasswordForm onSent={sendRequest} />

                    <NextLink href={PATH_AUTH.login} passHref>
                        <Button fullWidth size='large' sx={{ mt: 1 }}>
                            Back
                        </Button>
                    </NextLink>
                </>
            ) : (
                <ForgotPasswordMessage />
            )}
        </Box>
    );
};

export default ForgotPasswordFormContainer;
