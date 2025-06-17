import { Icon } from '@iconify/react';

// icons
const icons = {
  CorporateOutlined: () => <Icon icon="hugeicons:corporate" width="19" height="19" />
};

// ==============================|| MENU ITEMS - CORPORATE ACTION ||============================== //

const corporate = {
  id: 'group-corporate',
  title: 'Corporate Action',
  type: 'group',
  children: [
    {
      id: 'corporate',
      title: 'Corporate Action',
      type: 'item',
      url: '/corporate',
      icon: icons.CorporateOutlined
    }
  ]
};

export default corporate;
