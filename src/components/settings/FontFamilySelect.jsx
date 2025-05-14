import { Box, FormControl, MenuItem, Select, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React, { useMemo, useTransition } from 'react';

import { FontFamily } from 'themes/types';

// ==============================|| FONT FAMILY SELECT ||============================== //

// Pure function for formatting font names
const formatFontName = (key) => {
  return key
    .split('_')
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(' ');
};

const FontFamilySelect = ({ value, onChange }) => {
  const theme = useTheme();
  const [isPending, startTransition] = useTransition();

  // Pre-compute font options for better performance
  const fontOptions = useMemo(
    () =>
      Object.entries(FontFamily).map(([key, fontValue]) => ({
        key,
        value: fontValue,
        formattedName: formatFontName(key)
      })),
    []
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
        value={value}
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
        aria-label="Select font family"
      >
        {fontOptions.map((option) => (
          <MenuItem key={option.key} value={option.value}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ width: '100%' }}>
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 0.5,
                  bgcolor: theme.palette.background.paper
                }}
              >
                <Typography variant="body2" sx={{ fontFamily: option.value }}>
                  Aa
                </Typography>
              </Box>
              <Typography sx={{ fontFamily: option.value, flexGrow: 1 }}>{option.formattedName}</Typography>
            </Stack>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

FontFamilySelect.propTypes = {
  value: PropTypes.oneOf(Object.values(FontFamily)).isRequired,
  onChange: PropTypes.func.isRequired
};

export default React.memo(FontFamilySelect);
