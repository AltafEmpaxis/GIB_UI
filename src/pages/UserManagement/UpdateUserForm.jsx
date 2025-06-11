import { useCallback } from 'react';
import PropTypes from 'prop-types';

import { yupResolver } from '@hookform/resolvers/yup';
import { Icon } from '@iconify/react';
import {
  Button,
  DialogTitle,
  DialogContent,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Grid,
  useTheme,
  TextField,
  Box,
  DialogActions,
  Dialog,
  InputAdornment
} from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

import AvatarDropzone from 'components/FilesDropzone/AvatarDropzone';
import axios from 'utils/axios';
import Crypto from 'utils/Crypto';
import useAuth from 'hooks/useAuth';

// API endpoints
const API_ENDPOINTS = {
  updateUser: '/api/User/update',
  updateImage: '/api/User/updateImage'
};

// Utility functions
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

// Form validation schema
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required').trim().max(50, 'First name cannot exceed 50 characters'),
  middleName: Yup.string().trim().max(50, 'Middle name cannot exceed 50 characters').nullable(),
  lastName: Yup.string().required('Last name is required').trim().max(50, 'Last name cannot exceed 50 characters'),
  mobile: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9+\-\s()]+$/, 'Phone number may only contain digits and basic symbols (+, -, space, parentheses)')
    .min(6, 'Phone number is too short')
    .max(20, 'Phone number is too long'),
  email: Yup.string()
    .required('Email is required')
    .email('Must be a valid email address')
    .max(100, 'Email cannot exceed 100 characters')
    .lowercase()
});

const UpdateUserForm = ({ user, onClose }) => {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();

  // Using a fresh form instance each time the user changes by using user_id as key
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstName: user?.first_name || '',
      middleName: user?.middle_name || '',
      lastName: user?.last_name || '',
      email: user?.email || '',
      mobile: user?.mobile || '',
      image: user?.image || ''
    }
  });

  const { handleSubmit, formState, setValue } = methods;
  const { isSubmitting, dirtyFields } = formState;

  // Direct navigation function
  const navigateToAccountSettings = useCallback(() => {
    // Create query parameters first
    const searchParams = new URLSearchParams();
    searchParams.set('tab', 'security');

    if (user?.user_id) {
      searchParams.set('userId', user.user_id);
    }

    if (user?.email) {
      searchParams.set('email', user.email);
    }

    if (user?.username) {
      searchParams.set('username', user.username);
    }

    // Close modal first to avoid UI flash
    onClose();

    // Use React Router's navigate with a short delay to ensure modal is fully closed
    setTimeout(() => {
      navigate({
        pathname: '/account-settings',
        search: searchParams.toString(),
        state: { userData: user }
      });
    }, 50);
  }, [user, onClose, navigate]);

  // Reset password mutation - REMOVED

  // Update user mutation
  const updateUserMutation = useMutation({
    mutationFn: async (formData) => {
      const encryptedUpdatedData = {
        user_id: Crypto.EncryptText(user.user_id.toString()),
        first_name: Crypto.EncryptText(formData.firstName || ''),
        middle_name: Crypto.EncryptText(formData.middleName || ''),
        last_name: Crypto.EncryptText(formData.lastName || ''),
        email: Crypto.EncryptText(formData.email || ''),
        mobile: Crypto.EncryptText(formData.mobile || ''),
        updatedBy_id: Crypto.EncryptText(currentUser.user_id.toString())
      };

      const response = await axios.put(API_ENDPOINTS.updateUser, encryptedUpdatedData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['Page', 'UserManagement', 'apiEnd', 'get-users']);
      onClose();
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: `User ${user.username} updated successfully`,
        showConfirmButton: false,
        timer: 1500
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error?.response?.data?.message || error?.message || 'Failed to update user',
        confirmButtonColor: theme.palette.primary.main
      });
    }
  });

  // Update image mutation
  const updateImageMutation = useMutation({
    mutationFn: async ({ userId, base64Image }) => {
      const response = await axios.put(API_ENDPOINTS.updateImage, {
        user_id: Crypto.EncryptText(userId.toString()),
        updated_by: Crypto.EncryptText(currentUser.user_id.toString()),
        base64Image: Crypto.EncryptText(base64Image)
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['Page', 'UserManagement', 'apiEnd', 'get-users']);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Image updated successfully',
        showConfirmButton: false,
        timer: 1500
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error?.response?.data?.message || error?.message || 'Failed to update image',
        confirmButtonColor: theme.palette.primary.main
      });
    }
  });

  // Event handlers
  const handleResetPassword = useCallback(() => {
    console.log('Reset password clicked for user:', user?.email);

    // Navigate directly to account settings security tab
    navigateToAccountSettings();
  }, [user?.email, navigateToAccountSettings]);

  const handleUpdateUser = useCallback(
    (formData) => {
      updateUserMutation.mutate(formData);
    },
    [updateUserMutation]
  );

  const handleDrop = useCallback(
    async (file, previewUrl) => {
      if (file && user?.user_id) {
        try {
          if (file.size > 5 * 1024 * 1024) {
            throw new Error('File size should not exceed 5MB');
          }

          const base64Image = await convertToBase64(file);
          setValue('image', { preview: previewUrl });

          updateImageMutation.mutate({
            userId: user.user_id,
            base64Image
          });
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error?.message || 'Failed to update image',
            confirmButtonColor: theme.palette.primary.main
          });
        }
      }
    },
    [user?.user_id, setValue, updateImageMutation, theme]
  );

  const isLoading = updateUserMutation.isLoading || updateImageMutation.isLoading;

  if (!user) return null;

  return (
    <Dialog
      open={Boolean(user)}
      onClose={() => !isLoading && onClose()}
      maxWidth="sm"
      fullWidth
      scroll="paper"
      aria-labelledby="edit-user-dialog-title"
      aria-modal={true}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleUpdateUser)} noValidate>
          <DialogTitle id="edit-user-dialog-title">Edit User: {user?.username}</DialogTitle>
          <DialogContent dividers>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} role="form" aria-label="Edit user form">
              {/* User Info Section */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 3,
                  p: 2,
                  mb: 1,
                  backgroundColor: theme.palette.background.neutral,
                  borderRadius: 1
                }}
              >
                <AvatarDropzone
                  currentImage={user.image}
                  onImageUpload={handleDrop}
                  username={user.username}
                  size={96}
                  disabled={isLoading}
                />
                <Box>
                  <Typography variant="h5" sx={{ mb: 0.5 }}>
                    {user.username}
                  </Typography>
                  <Typography
                    variant="body2"
                    color={user.entity_status === 1 ? 'success.main' : 'error.main'}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      fontWeight: 500
                    }}
                  >
                    <Icon
                      icon={user.entity_status === 1 ? 'solar:check-circle-bold' : 'solar:close-circle-bold'}
                      width={16}
                      height={16}
                    />
                    {user.entity_status === 1 ? 'Active' : 'Inactive'}
                  </Typography>
                </Box>
              </Box>

              {/* Form Fields */}
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="username"
                    name="username"
                    label="Username"
                    defaultValue={user?.username}
                    disabled
                    fullWidth
                    inputProps={{
                      'aria-label': 'Username',
                      'aria-readonly': true
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon icon="solar:user-bold-duotone" width="20" height="20" />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...methods.register('firstName')}
                    id="firstName"
                    label="First Name"
                    fullWidth
                    error={!!methods.formState.errors.firstName}
                    helperText={methods.formState.errors.firstName?.message}
                    inputProps={{
                      'aria-label': 'First Name'
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon icon="solar:user-id-bold-duotone" width="20" height="20" />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...methods.register('lastName')}
                    id="lastName"
                    label="Last Name"
                    fullWidth
                    error={!!methods.formState.errors.lastName}
                    helperText={methods.formState.errors.lastName?.message}
                    inputProps={{
                      'aria-label': 'Last Name'
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon icon="solar:user-id-bold-duotone" width="20" height="20" />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...methods.register('email')}
                    id="email"
                    label="Email"
                    fullWidth
                    error={!!methods.formState.errors.email}
                    helperText={methods.formState.errors.email?.message}
                    inputProps={{
                      'aria-label': 'Email'
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon icon="solar:letter-bold-duotone" width="20" height="20" />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...methods.register('mobile')}
                    id="mobile"
                    label="Phone"
                    fullWidth
                    error={!!methods.formState.errors.mobile}
                    helperText={methods.formState.errors.mobile?.message}
                    inputProps={{
                      'aria-label': 'Phone'
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon icon="solar:phone-bold-duotone" width="20" height="20" />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
              </Grid>

              {/* Role Selection */}
              <FormControl disabled>
                <FormLabel id="role-group-label">Role</FormLabel>
                <RadioGroup
                  row
                  value={user?.isAdmin === 1 ? 'admin' : 'user'}
                  aria-labelledby="role-group-label"
                  name="role"
                >
                  <FormControlLabel value="user" control={<Radio />} label="User" />
                  <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                </RadioGroup>
              </FormControl>
            </Box>
          </DialogContent>

          {/* Actions */}
          <DialogActions sx={{ p: 2, gap: 1 }}>
            <Button
              onClick={handleResetPassword}
              color="warning"
              variant="outlined"
              startIcon={<Icon icon="mdi:key-alert" />}
              aria-label="Reset Password"
              type="button"
              disabled={isLoading}
            >
              {updateUserMutation.isLoading ? 'Saving...' : 'Reset Password'}
            </Button>
            <Button
              onClick={onClose}
              startIcon={<Icon icon="mdi:close" />}
              aria-label="Cancel"
              type="button"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              startIcon={<Icon icon="mdi:content-save" />}
              disabled={!Object.keys(dirtyFields).length || isSubmitting || isLoading}
              aria-label="Save Changes"
            >
              {updateUserMutation.isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogActions>
        </form>
      </FormProvider>
    </Dialog>
  );
};

UpdateUserForm.propTypes = {
  onClose: PropTypes.func
};

export default UpdateUserForm;
