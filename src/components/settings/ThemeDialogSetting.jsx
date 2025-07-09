import { Icon } from '@iconify/react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState, useTransition } from 'react';

import useConfig from 'hooks/useConfig';
import { config } from 'themes/config';
import BorderRadiusSlider from './BorderRadiusSlider';
import FontFamilySelect from './FontFamilySelect';
import ThemeModeSelect from './ThemeModeSelect';

// ==============================|| THEME DIALOG SETTINGS ||============================== //

// Memoized render button component
const RenderButton = React.memo(({ onClick, renderButton }) => {
  const theme = useTheme();

  if (renderButton) {
    return renderButton({ onClick });
  }

  return (
    <Button
      variant="outlined"
      onClick={onClick}
      startIcon={<Icon icon="solar:settings-bold-duotone" width={24} />}
      sx={{
        borderColor: theme.palette.divider,
        '&:hover': {
          bgcolor: alpha(theme.palette.primary.main, 0.08)
        }
      }}
    >
      Theme Settings
    </Button>
  );
});

RenderButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  renderButton: PropTypes.func
};

function ThemeDialogSetting({ renderButton }) {
  const [open, setOpen] = useState(false);
  const {
    mode,
    fontFamily,
    borderRadius,
    onChangeMode,
    onChangeFontFamily,
    onChangeBorderRadius,
    themeSettings,
    setThemeSettings
  } = useConfig();

  // Create a temporary copy of the entire theme settings object
  const [tempSettings, setTempSettings] = useState({
    mode,
    fontFamily,
    borderRadius: borderRadius || config.borderRadius
  });

  // Store original values for cancel
  const [originalSettings, setOriginalSettings] = useState({
    mode,
    fontFamily,
    borderRadius: borderRadius || config.borderRadius
  });

  const [isPending, startTransition] = useTransition();

  // Update temporary settings when theme settings change while dialog is open
  useEffect(() => {
    if (open) {
      // If themeSettings is available, use it directly
      if (themeSettings) {
        setTempSettings({
          mode: themeSettings.mode,
          fontFamily: themeSettings.fontFamily,
          borderRadius: themeSettings.borderRadius || config.borderRadius
        });
      } else {
        // Fallback to individual properties
        setTempSettings({
          mode,
          fontFamily,
          borderRadius: borderRadius || config.borderRadius
        });
      }
    }
  }, [mode, fontFamily, borderRadius, themeSettings, open]);

  const handleModeChange = useCallback(
    (event) => {
      event.stopPropagation();
      setTempSettings((prev) => ({
        ...prev,
        mode: event.target.value
      }));
      startTransition(() => {
        onChangeMode(event.target.value);
      });
    },
    [onChangeMode]
  );

  const handleFontFamilyChange = useCallback(
    (event) => {
      event.stopPropagation();
      setTempSettings((prev) => ({
        ...prev,
        fontFamily: event.target.value
      }));
      startTransition(() => {
        onChangeFontFamily(event.target.value);
      });
    },
    [onChangeFontFamily]
  );

  const handleBorderRadiusChange = useCallback(
    (event, newValue) => {
      // Ensure we have a valid number
      if (typeof newValue !== 'number' || isNaN(newValue)) {
        console.warn('Invalid border radius value:', newValue);
        return;
      }

      // Update local state
      setTempSettings((prev) => ({
        ...prev,
        borderRadius: newValue
      }));

      // Update global state with transition
      if (onChangeBorderRadius) {
        startTransition(() => {
          onChangeBorderRadius(Number(newValue));
        });
      }
    },
    [onChangeBorderRadius, startTransition]
  );

  const handleClickOpen = useCallback(() => {
    // Create a copy of the current settings
    const currentSettings = {
      mode,
      fontFamily,
      borderRadius: borderRadius || config.borderRadius
    };

    // Store the original settings for potential cancel operation
    setOriginalSettings(currentSettings);

    // Set the temporary settings for the dialog
    setTempSettings(currentSettings);

    // Open the dialog
    setOpen(true);
  }, [mode, fontFamily, borderRadius]);

  const handleCancel = useCallback(() => {
    startTransition(() => {
      // Restore the original settings
      if (setThemeSettings) {
        // Update the global themeSettings object directly
        setThemeSettings(originalSettings);
      } else {
        // Fallback to individual updates if setThemeSettings is not available
        onChangeMode(originalSettings.mode);
        onChangeFontFamily(originalSettings.fontFamily);
        if (onChangeBorderRadius) {
          onChangeBorderRadius(Number(originalSettings.borderRadius));
        }
      }
    });
    setOpen(false);
  }, [originalSettings, onChangeMode, onChangeFontFamily, onChangeBorderRadius, setThemeSettings]);

  const handleApply = useCallback(() => {
    setOpen(false);
  }, []);

  const handleDefault = useCallback(() => {
    // Get default settings from config
    const defaultSettings = {
      mode: config.mode,
      fontFamily: config.fontFamily,
      borderRadius: config.borderRadius
    };

    startTransition(() => {
      // Update local state with default settings
      setTempSettings(defaultSettings);

      // Update the global themeSettings object directly
      if (setThemeSettings) {
        setThemeSettings(defaultSettings);
      } else {
        // Fallback to individual updates if setThemeSettings is not available
        onChangeMode(defaultSettings.mode);
        onChangeFontFamily(defaultSettings.fontFamily);
        if (onChangeBorderRadius) {
          onChangeBorderRadius(Number(defaultSettings.borderRadius));
        }
      }
    });
  }, [onChangeMode, onChangeFontFamily, onChangeBorderRadius, setThemeSettings]);

  // Memoize dialog content to prevent unnecessary re-renders
  const dialogContent = useMemo(
    () => (
      <DialogContent dividers>
        <Box component={Stack} spacing={2.5} sx={{ pt: 1 }}>
          <Box>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <Icon icon="solar:sun-2-bold-duotone" width={20} />
              <Typography variant="subtitle2" color="text.secondary">
                Theme Mode
              </Typography>
            </Stack>
            <ThemeModeSelect value={tempSettings.mode} onChange={handleModeChange} />
          </Box>

          <Box>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <Icon icon="solar:font-size-bold-duotone" width={20} />
              <Typography variant="subtitle2" color="text.secondary">
                Font Family
              </Typography>
            </Stack>
            <FontFamilySelect value={tempSettings.fontFamily} onChange={handleFontFamilyChange} />
          </Box>

          <Box>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <Icon icon="solar:square-top-round-bold-duotone" width={20} />
              <Typography variant="subtitle2" color="text.secondary">
                Border Radius
              </Typography>
            </Stack>
            <BorderRadiusSlider
              min={4}
              max={24}
              step={2}
              value={tempSettings.borderRadius}
              onChange={handleBorderRadiusChange}
              marks
              size="medium"
            />
          </Box>
        </Box>
      </DialogContent>
    ),
    [tempSettings, handleModeChange, handleFontFamilyChange, handleBorderRadiusChange]
  );

  return (
    <div>
      <RenderButton onClick={handleClickOpen} renderButton={renderButton} />
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Theme Customization</DialogTitle>
        {dialogContent}
        <DialogActions>
          <Button
            variant="outlined"
            color="error"
            onClick={handleDefault}
            disabled={isPending}
            startIcon={<Icon icon="solar:restart-bold-duotone" />}
          >
            Reset
          </Button>
          <Stack direction="row" spacing={1}>
            <Button variant="outlined" color="inherit" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleApply}>
              Apply
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </div>
  );
}

ThemeDialogSetting.propTypes = {
  renderButton: PropTypes.func
};

export default ThemeDialogSetting;
