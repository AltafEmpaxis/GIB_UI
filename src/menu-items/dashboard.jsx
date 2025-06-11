import { Icon } from '@iconify/react';

// icons
const icons = {
  DashboardOutlined: () => <Icon icon="solar:widget-2-bold-duotone" width="19" height="19" />,
  ReconToolOutlined: () => <Icon icon="solar:settings-bold-duotone" width="19" height="19" />,
  PortfolioOutlined: () => <Icon icon="solar:folder-bold-duotone" width="19" height="19" />,
  CorporateOutlined: () => <Icon icon="solar:building-bold-duotone" width="19" height="19" />,
  PostingOutlined: () => <Icon icon="solar:document-add-bold-duotone" width="19" height="19" />
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
      type: 'collapse',
      icon: icons.DashboardOutlined,
      children: [
        {
          id: 'recon-tool-activity',
          title: 'Overview, Recent Activity on Recon Tool',
          type: 'item',
          url: '/dashboard/recon-tool-activity',
          icon: icons.ReconToolOutlined
        },
        {
          id: 'portfolio-activity',
          title: 'Overview, Recent Activity on New Portfolio & Securities',
          type: 'item',
          url: '/dashboard/portfolio-activity',
          icon: icons.PortfolioOutlined
        },
        {
          id: 'corporate-activity',
          title: 'Overview, Recent Activity on corporate action',
          type: 'item',
          url: '/dashboard/corporate-activity',
          icon: icons.CorporateOutlined
        },
        {
          id: 'posting-activity',
          title: 'Overview, Recent Activity on posting of trades',
          type: 'item',
          url: '/dashboard/posting-activity',
          icon: icons.PostingOutlined
        }
      ]
    }
  ]
};

export default dashboard;
