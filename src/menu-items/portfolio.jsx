import { Icon } from '@iconify/react';

// icons
const icons = {
  PortfolioOutlined: () => <Icon icon="solar:folder-bold-duotone" width="19" height="19" />
};

// ==============================|| MENU ITEMS - PORTFOLIO/SECURITIES ||============================== //

const portfolio = {
  id: 'group-portfolio',
  title: 'Portfolio/Securities',
  type: 'group',
  children: [
    // {
    //   id: 'portfolio',
    //   title: 'Portfolio/Securities',
    //   type: 'item',
    //   url: '/portfolio',
    //   icon: icons.PortfolioOutlined
    // }
    {
      id: 'Investment Performance',
      title: 'Investment Performance',
      type: 'item',
      url: '/portfolio',
      icon: icons.PortfolioOutlined
    },
    {
      id: 'Reports',
      title: 'Reports',
      type: 'item',
      url: '/reports',
      icon: icons.PortfolioOutlined
    }
  ]
};

export default portfolio;
