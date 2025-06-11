import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Icon } from '@iconify/react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputAdornment,
  IconButton,
  TextField,
  FormHelperText,
  Box,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

import axios from 'utils/axios';
import Crypto from 'utils/Crypto';
import { strengthColor, strengthIndicator } from 'utils/password-strength';
import useAuth from 'hooks/useAuth';
// Validation schema
const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required')
    .min(5, 'Username must be at least 5 characters')
    .max(30, 'Username cannot exceed 30 characters')
    .matches(/^[a-zA-Z0-9._-]+$/, 'Username can only contain letters, numbers, dots, underscores and hyphens')
    .trim(),
  email: Yup.string()
    .email('Must be a valid email')
    .required('Email is required')
    .max(100, 'Email cannot exceed 100 characters')
    .lowercase()
    .trim(),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password cannot exceed 100 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  role: Yup.string().required('Role is required').oneOf(['user', 'admin'], 'Invalid role selected')
});

const defaultValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 'user'
};

const CreateUserForm = () => {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [dialogState, setDialogState] = useState({
    isOpen: false,
    showPassword: false,
    showTooltip: false
  });
  const [level, setLevel] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, dirtyFields },
    reset,
    watch,
    setValue
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
    mode: 'onChange'
  });

  const password = watch('password');
  const username = watch('username');
  const role = watch('role');
  const email = watch('email');

  const handleDialogClose = () => {
    setDialogState((prev) => ({ ...prev, isOpen: false }));
    reset(defaultValues);
    setValue('role', 'user');
  };

  // Create user mutation
  const createUserMutation = useMutation({
    mutationFn: async (data) => {
      const encryptedFormData = {
        username: Crypto.EncryptText(data.username),
        email: Crypto.EncryptText(data.email),
        password: Crypto.EncryptPassword(data.password),
        isAdmin: Crypto.EncryptText(data.role === 'admin' ? '1' : '0'),
        createdBy_id: Crypto.EncryptText(user.user_id.toString()),
        entityStatus: Crypto.EncryptText('1')
      };

      const token = localStorage.getItem('accessToken');
      const headers = { Authorization: `Bearer ${token}` };

      const response = await axios.post('/api/User/create', encryptedFormData, { headers });
      return response.data;
    },
    onMutate: async () => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries(['Page', 'UserManagement', 'apiEnd', 'get-users']);
    },
    onSuccess: () => {
      handleDialogClose();
      queryClient.invalidateQueries(['Page', 'UserManagement', 'apiEnd', 'get-users']);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'User created successfully',
        showConfirmButton: false,
        timer: 1500
      });
    },
    onError: (error) => {
      console.error('Error creating user:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error?.response?.data?.message || error?.message || 'Failed to create user',
        confirmButtonColor: theme.palette.primary.main
      });
    }
  });

  const handleClearUsername = () => {
    setValue('username', '');
  };

  const handleClearEmail = () => {
    setValue('email', '');
  };

  const togglePassword = () => {
    setDialogState((prev) => ({ ...prev, showPassword: !prev.showPassword }));
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  // Watch password changes
  useEffect(() => {
    changePassword(password);
  }, [password]);

  const onSubmit = (data) => {
    createUserMutation.mutate(data);
  };

  const isCreateUserDisabled =
    !Object.keys(dirtyFields).length ||
    isSubmitting ||
    !isValid ||
    !username ||
    !email ||
    !password ||
    !role ||
    createUserMutation.isLoading;

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={() => setDialogState((prev) => ({ ...prev, isOpen: true }))}
        startIcon={<Icon icon="solar:user-plus-bold-duotone" />}
      >
        Create User
      </Button>

      <Dialog
        open={dialogState.isOpen}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="xs"
        aria-labelledby="create-user-dialog-title"
        aria-describedby="create-user-dialog-description"
        aria-modal={true}
        disableEnforceFocus={false}
        disableAutoFocus={false}
        disablePortal={false}
        closeAfterTransition={false}
        slotProps={{
          backdrop: {
            'data-inert': true
          }
        }}
      >
        {/* Title */}
        <DialogTitle id="create-user-dialog-title">Create New User</DialogTitle>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <DialogContent dividers>
            {/* Username Field */}
            <TextField
              autoFocus
              fullWidth
              variant="outlined"
              placeholder="Enter Username"
              label="Username"
              error={!!errors.username}
              helperText={errors.username?.message}
              inputProps={{
                ...register('username')
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon icon="solar:user-bold-duotone" width="20" height="20" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={handleClearUsername} edge="end" disabled={!username}>
                      {username && <Icon icon="ic:round-close" width="20" height="20" />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            {/* Email Field */}
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              placeholder="Enter Email"
              type="email"
              error={!!errors.email}
              helperText={errors.email?.message}
              inputProps={{
                ...register('email')
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon icon="solar:letter-bold-duotone" width="20" height="20" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={handleClearEmail} edge="end" disabled={!email}>
                      {email && <Icon icon="ic:round-close" width="20" height="20" />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            {/* Password Field */}
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              placeholder="Enter Password"
              type={dialogState.showPassword ? 'text' : 'password'}
              error={!!errors.password}
              helperText={errors.password?.message}
              inputProps={{
                ...register('password')
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon icon="solar:lock-password-bold-duotone" width="20" height="20" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePassword} size="small" disabled={!password}>
                      <Icon
                        icon={dialogState.showPassword ? 'solar:eye-bold-duotone' : 'solar:eye-closed-bold-duotone'}
                        width="20"
                        height="20"
                      />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            {level && (
              <Box>
                <Typography variant="subtitle1" fontSize="0.75rem">
                  Password Strength: <span style={{ color: level?.color }}>{level?.label}</span>
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                  <Box
                    sx={{
                      width: '100%',
                      height: 6,
                      borderRadius: 1,
                      backgroundColor: level?.color || 'grey.300',
                      transition: 'all .3s ease'
                    }}
                  />
                </Box>
              </Box>
            )}

            {/* Confirm Password Field */}
            <TextField
              fullWidth
              margin="normal"
              label="Confirm Password"
              type={dialogState.showPassword ? 'text' : 'password'}
              error={!!errors.confirmPassword}
              placeholder="Enter Confirm Password"
              helperText={errors.confirmPassword?.message}
              inputProps={{
                ...register('confirmPassword')
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon icon="solar:lock-password-bold-duotone" width="20" height="20" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePassword} size="small" disabled={!password}>
                      <Icon
                        icon={dialogState.showPassword ? 'solar:eye-bold-duotone' : 'solar:eye-closed-bold-duotone'}
                        width="20"
                        height="20"
                      />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            {/* Role Selection */}
            <FormControl component="fieldset" sx={{ mt: 2 }} error={!!errors.role}>
              <FormLabel component="legend">Role</FormLabel>
              <RadioGroup
                row
                value={role || ''}
                onChange={(e) => setValue('role', e.target.value, { shouldValidate: true })}
              >
                <FormControlLabel value="user" control={<Radio />} label="User" />
                <FormControlLabel value="admin" control={<Radio />} label="Admin" />
              </RadioGroup>
              {errors.role && <FormHelperText error>{errors.role.message}</FormHelperText>}
            </FormControl>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleDialogClose} disabled={createUserMutation.isLoading}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" disabled={isCreateUserDisabled}>
              {createUserMutation.isLoading ? 'Creating...' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default CreateUserForm;
