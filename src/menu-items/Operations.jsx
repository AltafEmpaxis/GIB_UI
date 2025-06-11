import { Icon } from '@iconify/react';

const icons = {
  ReportOutlined: () => <Icon icon="solar:document-text-bold-duotone" width="19" height="19" />,
  QuestionOutlined: () => <Icon icon="solar:question-circle-bold-duotone" width="19" height="19" />,
  CloudUploadOutlined: () => <Icon icon="solar:cloud-upload-bold-duotone" width="19" height="19" />,
  EyeOutlined: () => <Icon icon="solar:eye-bold-duotone" width="19" height="19" />,
  MapOutlined: () => <Icon icon="solar:map-bold-duotone" width="19" height="19" />
};

// ==============================|| MENU ITEMS - UPLOAD ||============================== //

const Operations = {
  id: 'operations',
  title: 'Operations',
  type: 'group',
  children: [
    {
      id: 'upload-file',
      title: 'Upload Files',
      type: 'item',
      url: '/upload-file',
      icon: icons.CloudUploadOutlined
    },
    {
      id: 'view-data',
      title: 'View Data',
      type: 'item',
      url: '/view-data',
      icon: icons.EyeOutlined
    },
    {
      id: 'generated-reports',
      title: 'Generated Reports',
      type: 'item',
      url: '/generated-reports',
      icon: icons.ReportOutlined
    },
    {
      id: 'mapping-data',
      title: 'Mapping Data',
      type: 'item',
      url: '/mapping-data',
      icon: icons.MapOutlined
    }
  ]
};

export default Operations;
