import { yupResolver } from '@hookform/resolvers/yup';
import { Icon } from '@iconify/react';
import {
  alpha,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Paper,
  Stack,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useState } from 'react';
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
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [rememberMe, setRememberMe] = useLocalStorage('rememberMe', false);
  const [rememberedUsername, setRememberedUsername] = useLocalStorage('rememberedUsername', '');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
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
          confirmButtonColor: theme.palette.secondary.dark
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
        confirmButtonColor: theme.palette.secondary.dark
      });
      setError('submit', {
        type: 'manual',
        message: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        p: { xs: 2, sm: 2.5, md: 1.5 }
      }}
    >
      <motion.div initial="hidden" animate="visible" variants={containerVariants} style={{ width: '100%' }}>
        <motion.div variants={itemVariants}>
          <Box sx={{ mb: 3, textAlign: 'center' }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 400,
                color: isDark ? '#FFFFFF' : theme.palette.primary.main,
                letterSpacing: '-0.5px',
                mb: 1
              }}
            >
              Welcome to GIB Capital
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: isDark ? theme.palette.grey[400] : theme.palette.text.secondary,
                fontSize: '0.9rem'
              }}
            >
              Enter your credentials to access your account
            </Typography>
          </Box>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Box sx={{ mb: 3 }}>
            <Paper
              elevation={0}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                py: 1.5,
                px: 2.5,
                bgcolor: isDark
                  ? alpha(theme.palette.secondary.darker, 0.15)
                  : alpha(theme.palette.secondary.lighter, 0.4),
                borderRadius: 2,
                backdropFilter: 'blur(8px)',
                border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Icon
                  icon="solar:shield-keyhole-minimalistic-bold"
                  width={20}
                  height={20}
                  color={theme.palette.secondary.main}
                  style={{ marginRight: '10px' }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    color: isDark ? theme.palette.secondary.light : theme.palette.primary.main,
                    fontWeight: 500,
                    fontSize: '0.8rem'
                  }}
                >
                  Secure banking-grade authentication
                </Typography>
              </Box>
              <Icon icon="solar:verified-check-bold" width={18} height={18} color={theme.palette.secondary.main} />
            </Paper>
          </Box>
        </motion.div>

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2.5}>
            <Grid item xs={12}>
              <motion.div variants={itemVariants}>
                <OutlinedInput
                  id="username-login"
                  type="text"
                  {...register('username')}
                  placeholder="Username or Email"
                  fullWidth
                  error={Boolean(errors.username)}
                  startAdornment={
                    <InputAdornment position="start" sx={{ ml: 0.5 }}>
                      <Icon
                        icon="solar:user-bold"
                        width={18}
                        height={18}
                        color={isDark ? theme.palette.tertiary.main : theme.palette.tertiary.darker}
                      />
                    </InputAdornment>
                  }
                />
                {errors.username && (
                  <FormHelperText error sx={{ ml: 1, mt: 0.5 }}>
                    {errors.username.message}
                  </FormHelperText>
                )}
              </motion.div>
            </Grid>

            <Grid item xs={12}>
              <motion.div variants={itemVariants}>
                <OutlinedInput
                  fullWidth
                  error={Boolean(errors.password)}
                  id="password-login"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  placeholder="Password"
                  startAdornment={
                    <InputAdornment position="start" sx={{ ml: 0.5 }}>
                      <Icon
                        icon="solar:lock-bold"
                        width={18}
                        height={18}
                        color={isDark ? theme.palette.tertiary.main : theme.palette.tertiary.darker}
                      />
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        color="secondary"
                        sx={{ color: theme.palette.tertiary.main }}
                      >
                        <Icon icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} width={18} height={18} />
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {errors.password && (
                  <FormHelperText error sx={{ ml: 1, mt: 0.5 }}>
                    {errors.password.message}
                  </FormHelperText>
                )}
              </motion.div>
            </Grid>

            <Grid item xs={12}>
              <motion.div variants={itemVariants}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        name="rememberMe"
                        size="small"
                      />
                    }
                    label={
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: '0.8rem',
                          color: isDark ? theme.palette.grey[400] : theme.palette.text.secondary
                        }}
                      >
                        Remember me
                      </Typography>
                    }
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '0.8rem',
                      color: theme.palette.secondary.main,
                      cursor: 'pointer',
                      fontWeight: 500,
                      '&:hover': { textDecoration: 'underline' }
                    }}
                  >
                    Forgot password?
                  </Typography>
                </Stack>
              </motion.div>
            </Grid>

            {errors.submit && (
              <Grid item xs={12}>
                <FormHelperText
                  error
                  sx={{
                    textAlign: 'center',
                    fontSize: '0.875rem',
                    mt: -0.5,
                    mb: -1
                  }}
                >
                  {errors.submit.message || 'Invalid credentials'}
                </FormHelperText>
              </Grid>
            )}

            <Grid item xs={12}>
              <motion.div variants={itemVariants}>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={isSubmitting || isLoading}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="secondary"
                    sx={{
                      height: 48,
                      borderRadius: 2,
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      letterSpacing: 0.5,
                      bgcolor: theme.palette.secondary.main,
                      color: theme.palette.primary.main,
                      boxShadow: `0 5px 12px ${alpha(theme.palette.secondary.main, 0.3)}`,
                      '&:hover': {
                        bgcolor: theme.palette.secondary.dark,
                        boxShadow: `0 8px 16px ${alpha(theme.palette.secondary.main, 0.4)}`
                      }
                    }}
                    startIcon={
                      isLoading ? (
                        <Icon icon="svg-spinners:180-ring" width={20} height={20} />
                      ) : (
                        <Icon
                          icon="solar:login-bold"
                          width={18}
                          height={18}
                          color={theme.palette.primary.main}
                          style={{ marginRight: '8px' }}
                        />
                      )
                    }
                  >
                    {isLoading ? 'Signing in...' : 'Sign in to your account'}
                  </Button>
                </AnimateButton>
              </motion.div>
            </Grid>
          </Grid>
        </form>

        <motion.div variants={itemVariants}>
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Stack spacing={1} direction="row" justifyContent="center" sx={{ mb: 1 }}>
              <Icon
                icon="solar:shield-keyhole-minimalistic-line-duotone"
                width={14}
                height={14}
                color={isDark ? theme.palette.grey[500] : theme.palette.text.secondary}
              />
              <Typography
                variant="caption"
                sx={{
                  color: isDark ? theme.palette.grey[500] : theme.palette.text.secondary,
                  fontSize: '0.7rem'
                }}
              >
                Protected by industry-standard security protocols
              </Typography>
            </Stack>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.75, flexWrap: 'wrap' }}>
              <Typography
                variant="caption"
                component="span"
                sx={{
                  color: theme.palette.secondary.main,
                  cursor: 'pointer',
                  fontWeight: 500,
                  fontSize: '0.7rem',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                Terms of Service
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: isDark ? theme.palette.grey[500] : theme.palette.text.secondary,
                  fontSize: '0.7rem'
                }}
              >
                •
              </Typography>
              <Typography
                variant="caption"
                component="span"
                sx={{
                  color: theme.palette.secondary.main,
                  cursor: 'pointer',
                  fontWeight: 500,
                  fontSize: '0.7rem',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                Privacy Policy
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: isDark ? theme.palette.grey[500] : theme.palette.text.secondary,
                  fontSize: '0.7rem'
                }}
              >
                •
              </Typography>
              <Typography
                variant="caption"
                component="span"
                sx={{
                  color: theme.palette.secondary.main,
                  cursor: 'pointer',
                  fontWeight: 500,
                  fontSize: '0.7rem',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                Help
              </Typography>
            </Box>
          </Box>
        </motion.div>
      </motion.div>
    </Box>
  );
}
