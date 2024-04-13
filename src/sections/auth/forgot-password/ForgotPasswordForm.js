import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import useIsMountedRef from '../../../hooks/useisMountedRef';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import useAuth from '../../../hooks/useAuth';
import useError from '../../../hooks/useError';
import { useEffect } from 'react';

ForgotPasswordForm.propTypes = {
    onSent: PropTypes.func,
};

export default function ForgotPasswordForm({ onSent }) {
    const isMountedRef = useIsMountedRef();

    const ForgotPasswordSchema = Yup.object().shape({
        id: Yup.string().required('Membership ID is required'),
    });

    const methods = useForm({
        resolver: yupResolver(ForgotPasswordSchema),
        defaultValues: { id: '' },
    });

    const { forgot, forgotPassword } = useAuth();

    const { error, loading, clearError, success } = forgot;

    const { handleSubmit } = methods;

    const onSubmit = async ({ id }) => {
        try {
            forgotPassword(id);
        } catch (error) {
            console.error(error);
        }
    };

    // show success page if forgot password goes through
    useEffect(() => {
        if (isMountedRef && success) {
            onSent();
        }

        // eslint-disable-next-line
    }, [success]);

    // hook to handle error from forgot password
    useError(error, clearError);

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                <RHFTextField name='id' label='Membership ID' />

                <LoadingButton fullWidth size='large' type='submit' variant='contained' loading={loading}>
                    Forgot Password
                </LoadingButton>
            </Stack>
        </FormProvider>
    );
}
