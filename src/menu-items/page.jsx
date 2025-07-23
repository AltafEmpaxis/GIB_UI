import { Icon } from '@iconify/react';

// icons
const icons = {
  UserManagementOutlined: () => <Icon icon="solar:user-bold-duotone" width="19" height="19" />,
  ProfileOutlined: () => <Icon icon="solar:user-id-bold-duotone" width="19" height="19" />,
  FileUploadOutlined: () => <Icon icon="solar:upload-bold-duotone" width="19" height="19" />,
  TableChartOutlined: () => <Icon icon="solar:table-2-bold-duotone" width="19" height="19" />,
  AssessmentOutlined: () => <Icon icon="solar:chart-bold-duotone" width="19" height="19" />,
  EditOutlined: () => <Icon icon="solar:pen-bold-duotone" width="19" height="19" />,
  HistoryOutlined: () => <Icon icon="solar:history-bold-duotone" width="19" height="19" />,
  SettingsOutlined: () => <Icon icon="solar:settings-bold-duotone" width="19" height="19" />,
  ReconToolOutlined: () => <Icon icon="solar:settings-bold-duotone" width="19" height="19" />,
  PortfolioOutlined: () => <Icon icon="solar:folder-bold-duotone" width="19" height="19" />,
  CorporateOutlined: () => <Icon icon="hugeicons:corporate" width="19" height="19" />,
  PostingOutlined: () => <Icon icon="solar:document-add-bold-duotone" width="19" height="19" />,
  CloudUploadOutlined: () => <Icon icon="solar:cloud-upload-bold-duotone" width="19" height="19" />,
  EyeOutlined: () => <Icon icon="solar:eye-bold-duotone" width="19" height="19" />,
  ReportOutlined: () => <Icon icon="solar:document-text-bold-duotone" width="19" height="19" />,
  MapOutlined: () => <Icon icon="solar:map-bold-duotone" width="19" height="19" />
};

// ==============================|| MENU ITEMS - PAGES ||============================== //

// Management Group
const managementGroup = {
  id: 'management',
  title: 'Management',
  type: 'group',
  children: [
    {
      id: 'settings',
      title: 'Settings',
      type: 'item',
      url: '/settings',
      icon: icons.SettingsOutlined
    },
    {
      id: 'user-management',
      title: 'User Management',
      type: 'item',
      url: '/user-management',
      icon: icons.UserManagementOutlined,
      roles: ['admin', 'user'] // Only admin can access
    }
  ]
};

// Recon Tool Group
const reconToolGroup = {
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

// Reports Group
const reportsGroup = {
  id: 'group-reports',
  title: 'Reports',
  type: 'group',
  children: [
    {
      id: 'investment-performance',
      title: 'Investment Performance',
      type: 'item',
      url: '/investment-performance',
      icon: icons.AssessmentOutlined
    },
    {
      id: 'quality-control',
      title: 'Quality Control',
      type: 'item',
      url: '/quality-control',
      icon: icons.ReportOutlined
    }
  ]
};

// Utility Action Group
const corporateGroup = {
  id: 'group-utility',
  title: 'Utility',
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

// Posting Group
const postingGroup = {
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

// Export all groups as items array
const pages = {
  items: [reconToolGroup, reportsGroup, corporateGroup, postingGroup, managementGroup]
};

export default pages;
