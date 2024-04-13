import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
import Layout from '../../layouts';
import Page from '../../components/Page';
import ForgotPasswordFormContainer from '../../sections/auth/forgot-password/ForgotPasswordFormContainer';

const RootStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    minHeight: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(12, 0),
}));

ForgotPassword.getLayout = function getLayout(page) {
    return <Layout variant='logoOnly'>{page}</Layout>;
};

export default function ForgotPassword() {
    return (
        <Page title='Forgot Password' sx={{ height: 1 }}>
            <RootStyle>
                <Container>
                    <ForgotPasswordFormContainer />
                </Container>
            </RootStyle>
        </Page>
    );
}
