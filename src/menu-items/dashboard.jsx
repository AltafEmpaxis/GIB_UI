import { Icon } from '@iconify/react';

// icons
const icons = {
  DashboardOutlined: () => <Icon icon="solar:widget-2-bold-duotone" width="19" height="19" />
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
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
