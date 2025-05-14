import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  InputAdornment,
  IconButton
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import axios from 'utils/axios';
import Crypto from 'utils/Crypto';
import useAuth from 'hooks/useAuth';
import { Icon } from '@iconify/react';

// API endpoints
const API_ENDPOINTS = {
  resetUserPassword: '/api/User/resetPassword'
};

const SecurityTab = ({ formData, handleInputChange, userId }) => {
  const theme = useTheme();
  const { user: currentUser } = useAuth();

  // Password visibility states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Create password reset mutation
  const resetPasswordMutation = useMutation({
    mutationFn: async (passwordData) => {
      console.log('Resetting password with data:', passwordData);
      // Different handling depending on if it's an admin resetting another user's password
      // or a user changing their own password
      if (userId) {
        // Admin resetting another user's password
        const payload = {
          user_id: Crypto.EncryptText(userId.toString()),
          new_password: Crypto.EncryptText(passwordData.newPassword),
          updated_by: Crypto.EncryptText(currentUser.user_id.toString())
        };
        const response = await axios.put(API_ENDPOINTS.resetUserPassword, payload);
        return response.data;
      } else {
        // User changing their own password
        const payload = {
          user_id: Crypto.EncryptText(currentUser.user_id.toString()),
          new_password: Crypto.EncryptText(passwordData.newPassword),
          updated_by: Crypto.EncryptText(currentUser.user_id.toString())
        };
        const response = await axios.put(API_ENDPOINTS.resetUserPassword, payload);
        return response.data;
      }
    },
    onSuccess: () => {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: userId
          ? `Password for ${formData.username} has been reset`
          : 'Your password has been updated successfully',
        timer: 2000,
        showConfirmButton: false
      });

      // Clear password fields
      handleInputChange({
        target: {
          name: 'currentPassword',
          type: 'text',
          value: ''
        }
      });
      handleInputChange({
        target: {
          name: 'newPassword',
          type: 'text',
          value: ''
        }
      });
      handleInputChange({
        target: {
          name: 'confirmPassword',
          type: 'text',
          value: ''
        }
      });
    },
    onError: (error) => {
      console.error('Password reset error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error?.response?.data?.message || error?.message || 'Failed to update password',
        confirmButtonColor: theme.palette.primary.main
      });
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate passwords
    if (formData.newPassword !== formData.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Password Mismatch',
        text: 'New password and confirmation do not match',
        confirmButtonColor: theme.palette.primary.main
      });
      return;
    }

    if (!userId && !formData.currentPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Current Password Required',
        text: 'Please enter your current password',
        confirmButtonColor: theme.palette.primary.main
      });
      return;
    }

    if (!formData.newPassword) {
      Swal.fire({
        icon: 'error',
        title: 'New Password Required',
        text: 'Please enter a new password',
        confirmButtonColor: theme.palette.primary.main
      });
      return;
    }

    // Call the reset password mutation
    resetPasswordMutation.mutate(formData);
  };

  return (
    <>
      {resetPasswordMutation.isLoading && (
        <Alert severity="info" sx={{ mb: 3 }}>
          Processing your password reset request...
        </Alert>
      )}

      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {userId ? `Reset Password for ${formData.username}` : 'Change Password'}
          </Typography>
          <Divider sx={{ my: 2 }} />

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              {!userId && (
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="currentPassword"
                    label="Current Password"
                    type={showCurrentPassword ? 'text' : 'password'}
                    id="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    error={formData.currentPassword === ''}
                    helperText={formData.currentPassword === '' ? 'Current password is required' : ''}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            edge="end"
                            aria-label="toggle password visibility"
                          >
                            <Icon
                              icon={showCurrentPassword ? 'solar:eye-bold-duotone' : 'solar:eye-closed-bold-duotone'}
                            />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
              )}

              {userId && (
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    disabled
                    fullWidth
                    name="email"
                    label="User Email"
                    id="email"
                    value={formData.email}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon icon="solar:user-bold-duotone" width="20" height="20" />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
              )}

              <Grid item xs={12} md={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="newPassword"
                  label="New Password"
                  type={showNewPassword ? 'text' : 'password'}
                  id="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  error={formData.newPassword === ''}
                  helperText={formData.newPassword === '' ? 'New password is required' : ''}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            edge="end"
                            aria-label="toggle password visibility"
                          >
                            <Icon icon={showNewPassword ? 'solar:eye-bold-duotone' : 'solar:eye-closed-bold-duotone'} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm New Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  error={formData.confirmPassword === '' || formData.confirmPassword !== formData.newPassword}
                  helperText={
                    formData.confirmPassword === ''
                      ? 'Please confirm your password'
                      : formData.confirmPassword !== formData.newPassword
                        ? 'Passwords do not match'
                        : ''
                  }
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            edge="end"
                            aria-label="toggle password visibility"
                          >
                            <Icon
                              icon={showConfirmPassword ? 'solar:eye-bold-duotone' : 'solar:eye-closed-bold-duotone'}
                            />
                          </IconButton>
                        </InputAdornment>
                      )
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={resetPasswordMutation.isLoading}
                >
                  {resetPasswordMutation.isLoading ? <CircularProgress size={24} sx={{ mr: 1 }} /> : null}
                  {userId ? 'Reset User Password' : 'Update Password'}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default SecurityTab;
