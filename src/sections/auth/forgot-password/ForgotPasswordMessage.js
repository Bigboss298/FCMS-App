import React from 'react';
import { SentIcon } from '../../../assets';
import { Box, Button, Typography } from '@mui/material';
import NextLink from 'next/link';
import { PATH_AUTH } from '../../../routes/path';

const ForgotPasswordMessage = () => (
    <Box sx={{ textAlign: 'center' }}>
        <SentIcon sx={{ mb: 5, mx: 'auto', height: 160 }} />

        <Typography variant='h3' gutterBottom>
            Request sent successfully
        </Typography>
        <Typography>
            We have sent a confirmation email to your email.
            <br />
            Please check your email.
        </Typography>

        <NextLink href={PATH_AUTH.login} passHref>
            <Button size='large' variant='contained' sx={{ mt: 5 }}>
                Back
            </Button>
        </NextLink>
    </Box>
);

export default ForgotPasswordMessage;
