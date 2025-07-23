import { Icon } from '@iconify/react';

// icons
const icons = {
  DashboardOutlined: () => <Icon icon="solar:widget-2-bold-duotone" width="19" height="19" />,
  HomeOutlined: () => <Icon icon="solar:home-2-bold-duotone" width="19" height="19" />
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

// Dashboard Group
const dashboard = {
  id: 'group-dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'home',
      title: 'Home',
      type: 'item',
      url: '/home',
      icon: icons.HomeOutlined
    },
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: icons.DashboardOutlined
    }
  ]
};

export default dashboard;
