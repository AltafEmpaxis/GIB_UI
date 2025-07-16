// material-ui
import { Box } from '@mui/material';
import AuthFooter from 'pages/authentication/AuthFooter';
import AuthLogin from './auth-forms/AuthLogin';
import AuthWrapper from './AuthWrapper';

// ================================|| LOGIN ||================================ //

export default function Login() {
  return (
    <>
      <title>Login - GIB Capital</title>
      <meta name="description" content="Access GIB Capital's secure investment management platform" />
      <meta property="og:title" content="Login - GIB Capital" />
      <meta property="og:description" content="Access GIB Capital's secure investment management platform" />

      <Box sx={{ 
        position: 'relative', 
        minHeight: '100vh', 
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Box sx={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column'
        }}>
          <AuthWrapper>
            <AuthLogin />
          </AuthWrapper>
        </Box>
        <AuthFooter />
      </Box>
    </>
  );
}
