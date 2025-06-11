import { useState } from 'react';
import { Box, Button, Card, CardContent, Divider, Grid, TextField, Typography, Avatar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Icon } from '@iconify/react';
import Swal from 'sweetalert2';

const ProfileTab = ({ formData, handleInputChange, currentUser, targetUser }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  // Get user initials for avatar fallback
  const getInitials = () => {
    // Use target user if available
    if (targetUser?.first_name && targetUser?.last_name) {
      return `${targetUser.first_name[0]}${targetUser.last_name[0]}`.toUpperCase();
    }

    // Fall back to form data
    if (formData.firstName && formData.lastName) {
      return `${formData.firstName[0]}${formData.lastName[0]}`.toUpperCase();
    }

    // Last fallback - use username
    return formData.username?.[0]?.toUpperCase() || 'U';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile update form submitted:', formData);
    Swal.fire({
      icon: 'info',
      title: 'Not Implemented',
      text: 'Profile update functionality is not yet implemented',
      confirmButtonColor: theme.palette.primary.main
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Box sx={{ textAlign: 'center' }}>
              {targetUser?.image || currentUser?.image ? (
                <Avatar
                  src={targetUser?.image || currentUser?.image}
                  sx={{
                    width: 120,
                    height: 120,
                    margin: '0 auto 16px',
                    border: `4px solid ${theme.palette.primary.main}`
                  }}
                />
              ) : (
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    margin: '0 auto 16px',
                    border: `4px solid ${theme.palette.primary.main}`,
                    bgcolor: isDark ? 'dark.800' : 'primary.light',
                    color: isDark ? 'primary.main' : 'primary.dark',
                    fontSize: '3rem'
                  }}
                >
                  {getInitials()}
                </Avatar>
              )}
              <Button variant="outlined" startIcon={<Icon icon="mdi:upload" />} sx={{ mt: 2 }}>
                Upload Photo
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Personal Information
            </Typography>
            <Divider sx={{ my: 2 }} />

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
                    Save Changes
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProfileTab;
