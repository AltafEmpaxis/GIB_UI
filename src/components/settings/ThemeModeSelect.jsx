import { Icon } from '@iconify/react';
import { FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useTransition } from 'react';

// ==============================|| THEME MODE SELECT ||============================== //

// Pre-defined menu items for better performance
const THEME_OPTIONS = [
  { value: 'light', icon: 'solar:sun-bold-duotone', label: 'Light' },
  { value: 'dark', icon: 'solar:moon-bold-duotone', label: 'Dark' }
];

const ThemeModeSelect = ({ value, onChange }) => {
  const [isPending, startTransition] = useTransition();

  const handleChange = (event) => {
    // Use transition for smoother UI updates
    startTransition(() => {
      onChange(event);
    });
  };

  return (
    <FormControl fullWidth>
      <Select
        value={value}
        onChange={handleChange}
        MenuProps={{
          disablePortal: true,
          disableAutoFocusItem: false,
          autoFocus: true,
          disableScrollLock: true
        }}
        sx={{
          opacity: isPending ? 0.7 : 1,
          transition: 'opacity 0.2s'
        }}
        aria-label="Select theme mode"
      >
        {THEME_OPTIONS.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Icon icon={option.icon} width={20} />
              <span>{option.label}</span>
            </Stack>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

ThemeModeSelect.propTypes = {
  value: PropTypes.oneOf(['light', 'dark']).isRequired,
  onChange: PropTypes.func.isRequired
};

export default React.memo(ThemeModeSelect);
