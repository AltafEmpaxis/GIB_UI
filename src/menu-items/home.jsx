import { Icon } from '@iconify/react';

// icons
const icons = {
  HomeOutlined: () => <Icon icon="solar:home-2-bold-duotone" width="19" height="19" />,
  MessageOutlined: () => <Icon icon="solar:chat-round-bold-duotone" width="19" height="19" />,
  VisionOutlined: () => <Icon icon="solar:eye-bold-duotone" width="19" height="19" />,
  MarketOutlined: () => <Icon icon="solar:chart-bold-duotone" width="19" height="19" />,
  WeatherOutlined: () => <Icon icon="solar:cloud-bold-duotone" width="19" height="19" />
};

// ==============================|| MENU ITEMS - HOME ||============================== //

const home = {
  id: 'group-home',
  title: 'Home',
  type: 'group',
  children: [
    {
      id: 'home',
      title: 'Home',
      type: 'item',
      url: '/home',
      icon: icons.HomeOutlined
    }
  ]
};

export default home;
