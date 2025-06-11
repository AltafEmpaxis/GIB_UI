import { Icon } from '@iconify/react';

// icons
const icons = {
  ReconToolOutlined: () => <Icon icon="solar:settings-bold-duotone" width="19" height="19" />
};

// ==============================|| MENU ITEMS - RECON TOOL ||============================== //

const reconTool = {
  id: 'group-recon-tool',
  title: 'Recon Tool',
  type: 'group',
  children: [
    {
      id: 'recon-tool',
      title: 'Recon Tool',
      type: 'item',
      url: '/recon-tool',
      icon: icons.ReconToolOutlined
    }
  ]
};

export default reconTool;
