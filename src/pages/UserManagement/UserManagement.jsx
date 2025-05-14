import { useState, useCallback } from 'react';

import { Icon } from '@iconify/react';
import { Box, IconButton, Tooltip, Card, Typography, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';

import ExportData from 'components/Export/ExportData';
import ReusableTable from 'components/Table/ReusableTable';
import axios, { endpoints } from 'utils/axios';
import Crypto from 'utils/Crypto';

import CreateUserForm from './CreateUserForm';
import UpdateUserForm from './UpdateUserForm';
import DeleteUserDialog from './DeleteUserDialog';
import { UserManagementColumns } from 'components/Table/Columns/Columns';
import useAuth from 'hooks/useAuth';
import MainCard from 'components/MainCard';

const UserManagement = () => {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const [editUser, setEditUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);
  const { user } = useAuth();

  // Memoized query function for fetching users
  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get(endpoints.getUser);
      if (!response.data) {
        throw new Error('No data received from server');
      }
      // Decrypt and parse the response data
      const decryptedResponse = Crypto.DecryptText(response.data);
      const parsedData = JSON.parse(decryptedResponse);

      // Ensure we return an array
      return Array.isArray(parsedData) ? parsedData : Object.values(parsedData);
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }, []);

  // Query for fetching users with better error handling and retry logic
  const {
    data: users = [],
    isLoading,
    error,
    isError,
    isPending
  } = useQuery({
    queryKey: ['Page', 'UserManagement', 'apiEnd', 'get-users'],
    queryFn: fetchUsers,
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error?.message || error || 'Failed to fetch users',
        confirmButtonColor: theme.palette.primary.main
      });
    },
    staleTime: 30000,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
    retry: 2
  });

  // Ensure users is always an array
  const usersArray = Array.isArray(users) ? users : Object.values(users || {});

  // Mutation for updating user status with optimistic updates
  const updateStatusMutation = useMutation({
    mutationFn: async ({ userId, newStatus }) => {
      // console.log('userId', userId);
      // console.log('newStatus', newStatus);
      const response = await axios.put(endpoints.updateUserStatus, {
        user_id: userId,
        status_id: newStatus
      });
      return response.data;
    },
    onMutate: async ({ userId, newStatus }) => {
      await queryClient.cancelQueries(['Page', 'UserManagement', 'apiEnd', 'get-users']);
      const previousUsers = queryClient.getQueryData(['Page', 'UserManagement', 'apiEnd', 'get-users']);
      queryClient.setQueryData(['Page', 'UserManagement', 'apiEnd', 'get-users'], (oldUsers) =>
        oldUsers.map((user) => (user.user_id === userId ? { ...user, entity_status: newStatus } : user))
      );
      return { previousUsers };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(['Page', 'UserManagement', 'apiEnd', 'get-users'], context.previousUsers);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error?.response?.data?.message || error?.message || error || 'Failed to update user status',
        confirmButtonColor: theme.palette.primary.main
      });
    },
    onSuccess: () => {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'User status updated successfully',
        timer: 1500,
        showConfirmButton: false
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries(['Page', 'UserManagement', 'apiEnd', 'get-users']);
    }
  });

  const handleStatusChange = useCallback(
    (userId, newStatus) => {
      updateStatusMutation.mutate({ userId, newStatus });
    },
    [updateStatusMutation]
  );

  const handleCloseUpdateDialog = useCallback(() => {
    setEditUser(null);
  }, []);

  const handleEditClick = useCallback((user) => {
    setEditUser(user);
  }, []);

  const handleDeleteClick = useCallback((user) => {
    setDeleteUser(user);
  }, []);

  const handleCloseDeleteDialog = useCallback(() => {
    setDeleteUser(null);
  }, []);

  const columns = UserManagementColumns({
    handleStatusChange,
    updateStatusMutation
  });

  const UserManagementRenderRowActions = ({ row }) => {
    return (
      <Stack direction="row" spacing={1}>
        <Tooltip title="Edit User" arrow>
          <IconButton
            color="primary"
            variant="contained"
            onClick={() => handleEditClick(row.original)}
            size="small"
            disabled={!user?.isAdmin || updateStatusMutation.isLoading}
          >
            <Icon icon="solar:pen-bold" style={{ color: theme.palette.primary.main }} />
          </IconButton>
        </Tooltip>
        <Tooltip
          title={
            !user?.isAdmin || user?.user_id === row.original.user_id
              ? `Hi ${user?.username || 'user'}, You don't have permission to delete your own account`
              : `Delete User ${row.original.username}`
          }
          arrow
        >
          <span>
            <IconButton
              color={user?.user_id === row.original.user_id ? 'primary' : 'error'}
              variant={user?.user_id === row.original.user_id ? 'contained' : 'outlined'}
              onClick={() => handleDeleteClick(row.original)}
              size="small"
              disabled={!user?.isAdmin || updateStatusMutation.isLoading || user?.user_id === row.original.user_id}
            >
              <Icon
                icon={
                  user?.user_id === row.original.user_id ? 'fluent:delete-off-20-filled' : 'solar:trash-bin-trash-bold'
                }
                style={{
                  color: user?.user_id === row.original.user_id ? theme.palette.grey[500] : theme.palette.error.main
                }}
              />
            </IconButton>
          </span>
        </Tooltip>
      </Stack>
    );
  };

  const tableProps = {
    columns,
    data: usersArray,
    enableRowActions: true,
    positionActionsColumn: 'last',

    renderRowActions: UserManagementRenderRowActions,
    state: {
      isLoading: isLoading || isPending,
      showProgressBars: isLoading || isPending,
      showSkeletons: isLoading || isPending
    },
    muiToolbarAlertBannerProps: isError
      ? {
          color: 'error',
          children: error?.message || error || 'Error loading users data'
        }
      : undefined,
    renderTopToolbarCustomActions: () => (
      <Stack direction="row" spacing={2} alignItems="center">
        <ExportData
          data={usersArray}
          columns={columns.filter((col) => !['actions', 'mrt-row-actions'].includes(col.id))}
          exportTypes={['csv', 'excel', 'pdf', 'txt', 'xml', 'json']}
          ExportFileName="Users_Export"
          isLoading={isLoading || isPending}
          variant="contained"
          color="primary"
          size="small"
          componentVariant="Menu"
          disabled={isLoading || isPending || isError}
        />
        <CreateUserForm disabled={isLoading || isPending || isError} />
      </Stack>
    ),
    renderBottomToolbarCustomActions: () => {
      if (isLoading || isPending || isError) return null;
      return usersArray.length > 0 ? (
        <Box px={2}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500 }}>
            Total Users: {usersArray.length}
          </Typography>
        </Box>
      ) : null;
    }
  };

  return (
    <>
      <title>User Management - Manage your users</title>
      <meta name="description" content="User Management - Manage your users" />
      <meta property="og:title" content="User Management - Manage your users" />
      <meta property="og:description" content="User Management - Manage your users" />
      <MainCard title="User Management" elevation={0} sx={{ p: '0 !important' }} contentSX={{ p: '0 !important' }}>
        <ReusableTable tableProps={tableProps} />
      </MainCard>

      {/* Update User Form */}
      <UpdateUserForm user={editUser} onClose={handleCloseUpdateDialog} key={editUser?.user_id} />

      {/* Delete User Dialog */}
      <DeleteUserDialog selectedUser={deleteUser} onClose={handleCloseDeleteDialog} />
    </>
  );
};

export default UserManagement;
