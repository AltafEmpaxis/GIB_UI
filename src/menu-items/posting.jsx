import { Icon } from '@iconify/react';

// icons
const icons = {
  PostingOutlined: () => <Icon icon="solar:document-add-bold-duotone" width="19" height="19" />
};

// ==============================|| MENU ITEMS - POSTING ||============================== //

const posting = {
  id: 'group-posting',
  title: 'Posting',
  type: 'group',
  children: [
    {
      id: 'posting',
      title: 'Posting',
      type: 'item',
      url: '/posting',
      icon: icons.PostingOutlined
    }
  ]
};

export default posting;
