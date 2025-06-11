import { Icon } from '@iconify/react';
import { Box, FormControl, MenuItem, Select, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React, { useMemo, useTransition } from 'react';

import themePalette from 'themes/palette';
import { PresetColors } from 'themes/types';

// ==============================|| PRESET COLOR SELECT ||============================== //

const PresetColorSelect = ({ value, onChange }) => {
  const theme = useTheme();
  const [isPending, startTransition] = useTransition();

  // With React 19, we can simplify this as the compiler will automatically memoize
  const getPresetColor = (preset) => {
    const colors = themePalette(theme.palette.mode, preset);
    return colors.primary.main;
  };

  // Pre-compute color options for better performance
  const colorOptions = useMemo(
    () =>
      Object.values(PresetColors).map((presetValue) => ({
        value: presetValue,
        color: getPresetColor(presetValue),
        label: presetValue.charAt(0).toUpperCase() + presetValue.slice(1).toLowerCase()
      })),
    [theme.palette.mode]
  );

  const handleChange = (event) => {
    // Use transition for smoother UI updates
    startTransition(() => {
      onChange(event);
    });
  };

  return (
    <FormControl fullWidth onClick={(e) => e.stopPropagation()}>
      <Select
        value={value || 'default'}
        onChange={handleChange}
        MenuProps={{
          disablePortal: true,
          disableAutoFocusItem: false,
          autoFocus: true,
          disableScrollLock: true,
          PaperProps: {
            sx: {
              maxHeight: 200
            }
          }
        }}
        sx={{
          opacity: isPending ? 0.7 : 1,
          transition: 'opacity 0.2s'
        }}
        aria-label="Select preset color"
      >
        {colorOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: 0.5,
                  bgcolor: option.color,
                  border: `1px solid ${theme.palette.divider}`
                }}
              />
              <span>{option.label}</span>
            </Stack>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

PresetColorSelect.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

PresetColorSelect.defaultProps = {
  value: 'default'
};

export default React.memo(PresetColorSelect);
