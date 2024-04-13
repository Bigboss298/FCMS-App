import { capitalCase } from 'change-case';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Stack, Container, Typography, Tooltip } from '@mui/material';
import useResponsive from '../../hooks/useResponsive';
// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
import Image from '../../components/Image';

// sections
import GuestGuard from '../../guards/GuestGuard';
import { LoginForm } from '../../sections/auth/login';
import { project } from '../../constants';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
    width: '100%',
    maxWidth: 464,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
    const mdUp = useResponsive('up', 'md');

    return (
        <GuestGuard>
            <Page title='Login'>
                <RootStyle>
                    {mdUp && (
                        <SectionStyle>
                            <Image
                                visibleByDefault
                                disabledEffect
                                src='https://khuddam.ng/wp-content/uploads/2021/05/MKAN-logo1.png'
                                alt='login'
                            />
                        </SectionStyle>
                    )}

                    <Container maxWidth='sm'>
                        <ContentStyle>
                            <Stack direction='row' alignItems='center' sx={{ mb: 5 }}>
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant='h4' gutterBottom>
                                        Sign in to {project.name}
                                    </Typography>
                                    <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
                                </Box>

                                <Tooltip title={capitalCase('lop')} placement='right'>
                                    <>
                                        <Logo />
                                    </>
                                </Tooltip>
                            </Stack>

                            <LoginForm />
                        </ContentStyle>
                    </Container>
                </RootStyle>
            </Page>
        </GuestGuard>
    );
}
