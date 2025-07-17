import { Icon } from '@iconify/react';

// icons
const icons = {
  DashboardOutlined: () => <Icon icon="solar:home-2-bold-duotone" width="19" height="19" />,
  UserManagementOutlined: () => <Icon icon="solar:user-bold-duotone" width="19" height="19" />,
  ProfileOutlined: () => <Icon icon="solar:user-id-bold-duotone" width="19" height="19" />,
  FileUploadOutlined: () => <Icon icon="solar:upload-bold-duotone" width="19" height="19" />,
  TableChartOutlined: () => <Icon icon="solar:table-2-bold-duotone" width="19" height="19" />,
  AssessmentOutlined: () => <Icon icon="solar:chart-bold-duotone" width="19" height="19" />,
  EditOutlined: () => <Icon icon="solar:pen-bold-duotone" width="19" height="19" />,
  HistoryOutlined: () => <Icon icon="solar:history-bold-duotone" width="19" height="19" />
};

// ==============================|| MENU ITEMS - PAGES ||============================== //

const pages = {
  id: 'management',
  title: 'Management',
  type: 'group',
  children: [
    {
      id: 'user-management',
      title: 'User Management',
      type: 'item',
      url: '/user-management',
      icon: icons.UserManagementOutlined,
      roles: ['admin', 'user'] // Only admin can access
    }

    // {
    //   id: 'profile',
    //   title: 'Profile',
    //   type: 'item',
    //   url: '/profile',
    //   icon: icons.ProfileOutlined,
    //   roles: ['admin', 'user'] // Both admin and user can access
    // }
  ]
};

export default pages;
