import { useState, useEffect } from 'react';

// material-ui
import { Avatar, Box, Card, CardContent, Divider, Grid, Typography, Stack, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Icon } from '@iconify/react';

// project imports
import MainCard from 'components/MainCard';
import useAuth from 'hooks/useAuth';

// ==============================|| USER PROFILE PAGE ||============================== //

const Profile = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const isDark = theme.palette.mode === 'dark';

  // Get display name based on available user info
  const getDisplayName = () => {
    if (user?.first_name || user?.last_name) {
      return `${user.first_name || ''} ${user.last_name || ''}`.trim();
    }
    return user?.username || 'Guest User';
  };

  // Get user role
  const getUserRole = () => {
    return user?.isAdmin === 1 ? 'Administrator' : 'User';
  };

  // Get user initials for avatar fallback
  const getInitials = () => {
    if (user?.first_name && user?.last_name) {
      return `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();
    }
    return user?.username?.[0]?.toUpperCase() || 'U';
  };

  return (
    <MainCard title="User Profile">
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ textAlign: 'center' }}>
                {user?.image ? (
                  <Avatar
                    src={user.image}
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
                <Typography variant="h4" gutterBottom>
                  {getDisplayName()}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {getUserRole()}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                User Information
              </Typography>
              <Divider sx={{ my: 2 }} />

              <Stack spacing={3}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="subtitle1">Username</Typography>
                  <Typography variant="body1">{user?.username || 'N/A'}</Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="subtitle1">Email</Typography>
                  <Typography variant="body1">{user?.email || 'N/A'}</Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="subtitle1">First Name</Typography>
                  <Typography variant="body1">{user?.first_name || 'N/A'}</Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="subtitle1">Last Name</Typography>
                  <Typography variant="body1">{user?.last_name || 'N/A'}</Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="subtitle1">Role</Typography>
                  <Typography variant="body1">{getUserRole()}</Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default Profile;
