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
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
  Divider
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
import useConfig from 'hooks/useConfig';
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
  const { mode, onChangeMode } = useConfig();
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

  // Toggle theme
  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    onChangeMode(newMode);
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
        position: 'relative'
      }}
    >
      {/* Light/Dark Mode Toggle Icon */}
      <Box sx={{ position: 'absolute', top: 0, right: 8, zIndex: 10 }}>
        <Tooltip arrow placement="top" title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
          <IconButton 
            onClick={toggleTheme} 
            color="secondary"
            sx={{
              bgcolor: alpha(theme.palette.background.default, 0.1),
              backdropFilter: 'blur(8px)',
              '&:hover': {
                bgcolor: alpha(theme.palette.background.default, 0.2)
              }
            }}
          >
            {theme.palette.mode === 'dark' ? (
              <Icon icon="solar:sun-bold-duotone" width={22} height={22} />
            ) : (
              <Icon icon="solar:moon-bold-duotone" width={22} height={22} />
            )}
          </IconButton>
        </Tooltip>
      </Box>
      
      <motion.div initial="hidden" animate="visible" variants={containerVariants} style={{ width: '100%' }}>
        <motion.div variants={itemVariants}>
          <Box sx={{ mb: 3, textAlign: 'center' }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 600, // SemiBold from global-styles.css
                color: isDark ? theme.palette.common.white : theme.palette.primary.main,
                letterSpacing: '-0.5px',
                mb: 1,
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '40px',
                  height: '3px',
                  background: theme.palette.secondary.main,
                  borderRadius: '2px'
                }
              }}
            >
              Welcome to GIB Capital
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: isDark ? theme.palette.grey[400] : theme.palette.text.secondary,
                fontSize: '0.9rem',
                mt: 2
              }}
            >
              Enter your credentials to access your account
            </Typography>
          </Box>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Box sx={{ mb: 2 }}>
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
                borderRadius: theme.shape.borderRadius,
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
                <TextField
                  id="username-login"
                  label="Username or Email"
                  variant="outlined"
                  type="text"
                  placeholder="Enter your username or email"
                  fullWidth
                  error={Boolean(errors.username)}
                  {...register('username')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon
                          icon="solar:user-bold"
                          width={18}
                          height={18}
                          color={isDark ? theme.palette.tertiary.main : theme.palette.tertiary.darker}
                        />
                      </InputAdornment>
                    )
                  }}
                 
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
                <TextField
                  id="password-login"
                  label="Password"
                  variant="outlined"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  fullWidth
                  error={Boolean(errors.password)}
                  {...register('password')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon
                          icon="solar:lock-bold"
                          width={18}
                          height={18}
                          color={isDark ? theme.palette.tertiary.main : theme.palette.tertiary.darker}
                        />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          <Icon
                            icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                            width={18}
                            height={18}
                          />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                 
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
                        sx={{
                          color: theme.palette.secondary.main,
                          '&.Mui-checked': {
                            color: theme.palette.secondary.main
                          }
                        }}
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
                   
                    startIcon={
                      isLoading ? (
                        <Icon icon="svg-spinners:180-ring" width={20} height={20} />
                      ) : (
                        <Icon
                          icon="solar:login-bold"
                          width={18}
                          height={18}
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
          <Divider sx={{ 
            my: 3,
            opacity: 0.6,
            '&::before, &::after': {
              borderColor: alpha(theme.palette.divider, 0.2)
            }
          }}/>
          
          <Box sx={{ textAlign: 'center' }}>
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
