import { Icon } from '@iconify/react';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import ThemeDialogSetting from 'components/settings/ThemeDialogSetting';
import useConfig from 'hooks/useConfig';

const SettingTab = () => {
  const theme = useTheme();
  const { onChangeMode } = useConfig();
  const isDark = theme.palette.mode === 'dark';

  return (
    <List
      component="nav"
      sx={{
        p: 0
      }}
      role="menu"
      aria-label="Settings menu"
    >
      <ThemeDialogSetting
        inSettingsTab
        renderButton={({ onClick }) => (
          <ListItemButton
            onClick={onClick}
            role="menuitem"
            tabIndex={0}
            aria-label="Theme Settings"
            disableRipple={false}
            sx={{
              '&:focus-visible': {
                outline: `2px solid ${theme.palette.primary.main}`,
                outlineOffset: -2
              }
            }}
          >
            <ListItemIcon>
              <Icon
                icon="solar:settings-bold-duotone"
                width={20}
                height={20}
                color={isDark ? theme.palette.primary.main : undefined}
                aria-hidden="true"
              />
            </ListItemIcon>
            <ListItemText primary="Theme Settings" />
            <Icon icon="solar:alt-arrow-right-bold-duotone" width={20} aria-hidden="true" />
          </ListItemButton>
        )}
      />
    </List>
  );
};

export default SettingTab;
