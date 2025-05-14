// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project import
import AuthLogin from './auth-forms/AuthLogin';
import AuthWrapper from './AuthWrapper';

// ================================|| LOGIN ||================================ //

export default function Login() {
  return (
    <>
      <title>Login - GIB UI</title>
      <meta name="description" content="Login to access GIB UI - Investment Reconciliation System" />
      <meta property="og:title" content="Login - GIB UI" />
      <meta property="og:description" content="Login to access GIB UI - Investment Reconciliation System" />

      <AuthWrapper>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <Typography variant="h3">Login</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <AuthLogin />
          </Grid>
        </Grid>
      </AuthWrapper>
    </>
  );
}
