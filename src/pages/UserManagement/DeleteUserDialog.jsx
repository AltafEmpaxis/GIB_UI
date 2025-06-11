import PropTypes from 'prop-types';

import { Icon } from '@iconify/react';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';

import useAuth from 'hooks/useAuth';
import axios from 'utils/axios';

const DeleteUserDialog = ({ selectedUser, onClose }) => {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const handleClose = () => {
    if (onClose) onClose();
  };

  const deleteUserMutation = useMutation({
    mutationFn: async (userId) => {
      try {
        // Check if user is admin
        if (!user?.isAdmin) {
          throw new Error('You do not have permission to delete users');
        }

        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('Authorization token not found');
        }

        const response = await axios.delete(`/api/User/delete`, {
          params: { user_id: userId },
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.data && !response.status === 200) {
          throw new Error('Failed to delete user');
        }

        return response.data;
      } catch (error) {
        console.error('Delete User Error:', error);
        throw new Error(
          error.response?.data?.message ||
            error.response?.data ||
            error.message ||
            error ||
            'Failed to delete user. Please try again.'
        );
      }
    },
    onMutate: async (userId) => {
      // Check if trying to delete own account
      if (user?.user_id === userId) {
        throw new Error('You cannot delete your own account');
      }

      // Check if user is admin before proceeding
      if (!user?.isAdmin) {
        throw new Error('You do not have permission to delete users');
      }

      await queryClient.cancelQueries(['Page', 'UserManagement', 'apiEnd', 'get-users']);
      const previousUsers = queryClient.getQueryData(['Page', 'UserManagement', 'apiEnd', 'get-users']);
      queryClient.setQueryData(['Page', 'UserManagement', 'apiEnd', 'get-users'], (oldUsers) =>
        oldUsers.filter((user) => user.user_id !== userId)
      );
      return { previousUsers };
    },
    onError: (error, userId, context) => {
      console.error('Error deleting user:', error);
      queryClient.setQueryData(['Page', 'UserManagement', 'apiEnd', 'get-users'], context.previousUsers);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error?.response?.data?.message || 'Failed to delete user',
        confirmButtonColor: theme.palette.primary.main
      });
    },
    onSuccess: () => {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'User has been deleted successfully',
        timer: 1500,
        showConfirmButton: false
      });
      handleClose();
    },
    onSettled: () => {
      queryClient.invalidateQueries(['Page', 'UserManagement', 'apiEnd', 'get-users']);
    }
  });

  const handleDelete = () => {
    if (!selectedUser) return;
    deleteUserMutation.mutate(selectedUser.user_id);
  };

  return (
    <Dialog
      open={Boolean(selectedUser)}
      onClose={() => !deleteUserMutation.isLoading && handleClose()}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
      aria-modal={true}
      PaperProps={{
        sx: {
          borderRadius: 2,
          minWidth: { xs: '90%', sm: 400 }
        }
      }}
    >
      <DialogTitle
        id="delete-dialog-title"
        color={deleteUserMutation.isError ? 'error' : 'inherit'}
        sx={{
          pb: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      >
        {deleteUserMutation.isError ? (
          <>
            <Icon icon="solar:danger-triangle-bold" width={24} style={{ color: theme.palette.error.main }} />
            Error
          </>
        ) : (
          <>
            <Icon icon="solar:trash-bin-trash-bold" width={24} style={{ color: theme.palette.error.main }} />
            Confirm Delete
          </>
        )}
      </DialogTitle>
      <DialogContent
        id="delete-dialog-description"
        sx={{
          '&.MuiDialogContent-root': {
            border: 'none'
          },
          mt: 2,
          minHeight: 100,
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        {deleteUserMutation.isLoading ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <CircularProgress size={20} />
            <Typography>Deleting user...</Typography>
          </Box>
        ) : deleteUserMutation.isError ? (
          <Typography color="error" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Icon icon="solar:danger-triangle-bold" />
            {deleteUserMutation.error?.message || 'Failed to delete user'}
          </Typography>
        ) : (
          <>
            <Typography variant="body1" sx={{ mb: 1 }}>
              You are about to delete the following user:
            </Typography>
            <Box
              sx={{
                p: 2,
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              <Typography variant="subtitle2" color="primary">
                Role: {selectedUser?.isAdmin === 1 ? 'Admin' : 'User'}
              </Typography>
              <Typography variant="subtitle2" color="primary">
                Username: {selectedUser?.username}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Email: {selectedUser?.email}
              </Typography>
            </Box>
            <Typography color="error" variant="body2">
              This action cannot be undone. Are you sure you want to proceed?
            </Typography>
          </>
        )}
      </DialogContent>
      <DialogActions sx={{ borderTop: `1px solid ${theme.palette.divider}`, px: 3, py: 2 }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          disabled={deleteUserMutation.isLoading}
          startIcon={<Icon icon="solar:close-circle-bold" />}
        >
          {deleteUserMutation.isError ? 'Close' : 'Cancel'}
        </Button>
        {!deleteUserMutation.isError && (
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            disabled={deleteUserMutation.isLoading}
            startIcon={<Icon icon="solar:trash-bin-trash-bold" />}
          >
            {deleteUserMutation.isLoading ? 'Deleting...' : 'Delete'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

DeleteUserDialog.propTypes = {
  selectedUser: PropTypes.object,
  onClose: PropTypes.func
};

export default DeleteUserDialog;
