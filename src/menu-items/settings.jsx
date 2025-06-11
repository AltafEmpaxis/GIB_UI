import { Icon } from '@iconify/react';

// icons
const icons = {
  SettingsOutlined: () => <Icon icon="solar:settings-bold-duotone" width="19" height="19" />
};

// ==============================|| MENU ITEMS - SETTINGS ||============================== //

const settings = {
  id: 'group-settings',
  title: 'Settings',
  type: 'group',
  children: [
    {
      id: 'settings',
      title: 'Settings',
      type: 'item',
      url: '/settings',
      icon: icons.SettingsOutlined
    }
  ]
};

export default settings;
