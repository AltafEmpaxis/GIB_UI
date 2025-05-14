import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Icon } from '@iconify/react';
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import * as yup from 'yup';

// project imports
import AnimateButton from 'components/@extended/AnimateButton';
import useAuth from 'hooks/useAuth';
import useLocalStorage from 'hooks/useLocalStorage';
// assets
import Crypto from 'utils/Crypto';

const validationSchema = yup.object().shape({
  username: yup.string().max(255).required('Username is required'),
  password: yup.string().max(255).required('Password is required')
});

export default function AuthLogin() {
  const [rememberMe, setRememberMe] = useLocalStorage('rememberMe', false);
  const [rememberedUsername, setRememberedUsername] = useLocalStorage('rememberedUsername', '');
  const [showPassword, setShowPassword] = React.useState(false);
  const { login } = useAuth();

  const defaultValues = {
    username: rememberMe ? rememberedUsername : '',
    password: ''
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = async (values) => {
    try {
      const encryptedUsername = Crypto.EncryptText(values.username);
      const encryptedPassword = Crypto.EncryptPassword(values.password);
      const response = await login(encryptedUsername, encryptedPassword);

      if (response.success) {
        if (rememberMe) {
          setRememberedUsername(values.username);
        } else {
          setRememberedUsername('');
        }

        Swal.fire({
          icon: 'success',
          title: 'Welcome!',
          text: 'Login successful',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: response.message || 'Invalid credentials',
          confirmButtonColor: '#3085d6'
        });
        setError('submit', {
          type: 'manual',
          message: response.message
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message || 'Something went wrong!',
        confirmButtonColor: '#3085d6'
      });
      setError('submit', {
        type: 'manual',
        message: error.message
      });
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        {/* Username Field */}
        <Grid item xs={12}>
          <Stack spacing={1}>
            <InputLabel htmlFor="username-login">Username</InputLabel>
            <OutlinedInput
              id="username-login"
              type="text"
              {...register('username')}
              placeholder="Enter username"
              fullWidth
              error={Boolean(errors.username)}
              startAdornment={
                <InputAdornment position="start">
                  <Icon icon="solar:user-bold-duotone" width="20" height="20" />
                </InputAdornment>
              }
            />
            {errors.username && <FormHelperText error>{errors.username.message}</FormHelperText>}
          </Stack>
        </Grid>

        {/* Password Field */}
        <Grid item xs={12}>
          <Stack spacing={1}>
            <InputLabel htmlFor="password-login">Password</InputLabel>
            <OutlinedInput
              fullWidth
              error={Boolean(errors.password)}
              id="password-login"
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              startAdornment={
                <InputAdornment position="start">
                  <Icon icon="solar:lock-password-bold-duotone" width="20" height="20" />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    color="secondary"
                    aria-label="toggle password visibility"
                  >
                    {showPassword ? (
                      <Icon icon="solar:eye-bold-duotone" width="20" height="20" />
                    ) : (
                      <Icon icon="solar:eye-closed-bold-duotone" width="20" height="20" />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              placeholder="Enter password"
            />
            {errors.password && <FormHelperText error>{errors.password.message}</FormHelperText>}
          </Stack>
        </Grid>

        {/* Remember Me & Forgot Password */}
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  name="rememberMe"
                  color="primary"
                  size="small"
                />
              }
              label={<Typography variant="body2">Keep me signed in</Typography>}
            />
          </Stack>
        </Grid>

        {/* Error Message */}
        {errors.submit && (
          <Grid item xs={12}>
            <FormHelperText error>{errors.submit.message || 'Invalid credentials'}</FormHelperText>
          </Grid>
        )}

        {/* Submit Button */}
        <Grid item xs={12}>
          <AnimateButton>
            <Button
              disableElevation
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="primary"
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
          </AnimateButton>
        </Grid>
      </Grid>
    </form>
  );
}
