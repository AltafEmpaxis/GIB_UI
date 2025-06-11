import { Icon } from '@iconify/react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React, { useEffect, useState, useCallback, useTransition, useMemo } from 'react';

import BorderRadiusSlider from './BorderRadiusSlider';
import FontFamilySelect from './FontFamilySelect';
import PresetColorSelect from './PresetColorSelect';
import ThemeModeSelect from './ThemeModeSelect';
import useConfig from 'hooks/useConfig';
import { config } from 'themes/config';

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
  const theme = useTheme();
  const {
    mode,
    presetColor,
    fontFamily,
    borderRadius,
    onChangeMode,
    onChangePresetColor,
    onChangeFontFamily,
    onChangeBorderRadius,
    themeSettings,
    setThemeSettings
  } = useConfig();

  // Create a temporary copy of the entire theme settings object
  const [tempSettings, setTempSettings] = useState({
    mode,
    presetColor,
    fontFamily,
    borderRadius: borderRadius || config.borderRadius
  });

  // Store original values for cancel
  const [originalSettings, setOriginalSettings] = useState({
    mode,
    presetColor,
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
          presetColor: themeSettings.presetColor,
          fontFamily: themeSettings.fontFamily,
          borderRadius: themeSettings.borderRadius || config.borderRadius
        });
      } else {
        // Fallback to individual properties
        setTempSettings({
          mode,
          presetColor,
          fontFamily,
          borderRadius: borderRadius || config.borderRadius
        });
      }
    }
  }, [mode, presetColor, fontFamily, borderRadius, themeSettings, open]);

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

  const handlePresetColorChange = useCallback(
    (event) => {
      event.stopPropagation();
      setTempSettings((prev) => ({
        ...prev,
        presetColor: event.target.value
      }));
      startTransition(() => {
        onChangePresetColor(event.target.value);
      });
    },
    [onChangePresetColor]
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
      presetColor,
      fontFamily,
      borderRadius: borderRadius || config.borderRadius
    };

    // Store the original settings for potential cancel operation
    setOriginalSettings(currentSettings);

    // Set the temporary settings for the dialog
    setTempSettings(currentSettings);

    // Open the dialog
    setOpen(true);
  }, [mode, presetColor, fontFamily, borderRadius]);

  const handleCancel = useCallback(() => {
    startTransition(() => {
      // Restore the original settings
      if (setThemeSettings) {
        // Update the global themeSettings object directly
        setThemeSettings(originalSettings);
      } else {
        // Fallback to individual updates if setThemeSettings is not available
        onChangeMode(originalSettings.mode);
        onChangePresetColor(originalSettings.presetColor);
        onChangeFontFamily(originalSettings.fontFamily);
        if (onChangeBorderRadius) {
          onChangeBorderRadius(Number(originalSettings.borderRadius));
        }
      }
    });
    setOpen(false);
  }, [originalSettings, onChangeMode, onChangePresetColor, onChangeFontFamily, onChangeBorderRadius, setThemeSettings]);

  const handleApply = useCallback(() => {
    setOpen(false);
  }, []);

  const handleDefault = useCallback(() => {
    // Get default settings from config
    const defaultSettings = {
      mode: config.mode,
      presetColor: config.presetColor,
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
        onChangePresetColor(defaultSettings.presetColor);
        onChangeFontFamily(defaultSettings.fontFamily);
        if (onChangeBorderRadius) {
          onChangeBorderRadius(Number(defaultSettings.borderRadius));
        }
      }
    });
  }, [onChangeMode, onChangePresetColor, onChangeFontFamily, onChangeBorderRadius, setThemeSettings]);

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
              <Icon icon="solar:palette-bold-duotone" width={20} />
              <Typography variant="subtitle2" color="text.secondary">
                Preset Colors
              </Typography>
            </Stack>
            <PresetColorSelect value={tempSettings.presetColor} onChange={handlePresetColorChange} />
          </Box>

          <Box>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <Icon icon="solar:text-bold-duotone" width={20} />
              <Typography variant="subtitle2" color="text.secondary">
                Font Family
              </Typography>
            </Stack>
            <FontFamilySelect value={tempSettings.fontFamily} onChange={handleFontFamilyChange} />
          </Box>

          <BorderRadiusSlider value={tempSettings.borderRadius} onChange={handleBorderRadiusChange} />
        </Box>
      </DialogContent>
    ),
    [tempSettings, handleModeChange, handlePresetColorChange, handleFontFamilyChange, handleBorderRadiusChange]
  );

  return (
    <>
      <RenderButton onClick={handleClickOpen} renderButton={renderButton} />
      <Dialog
        disableEscapeKeyDown
        open={open}
        onClose={(_, reason) => {
          if (reason !== 'backdropClick') {
            handleCancel();
          }
        }}
        maxWidth="xs"
        fullWidth
        onClick={(e) => e.stopPropagation()}
        aria-modal="true"
        aria-labelledby="theme-settings-dialog-title"
        disableEnforceFocus={false}
        disableAutoFocus={false}
        TransitionProps={{
          onEntering: () => {
            // Pre-load any resources needed for the dialog
          }
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: theme.customShadows.z1,
            opacity: isPending ? 0.8 : 1,
            transition: 'opacity 0.2s'
          }
        }}
      >
        <DialogTitle id="theme-settings-dialog-title">
          <Stack direction="row" alignItems="center" spacing={1}>
            <Icon icon="solar:settings-minimalistic-bold-duotone" width={24} aria-hidden="true" />
            <Typography variant="h5">Theme Settings</Typography>
          </Stack>
        </DialogTitle>

        {dialogContent}

        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button
            variant="outlined"
            onClick={() => startTransition(handleDefault)}
            startIcon={<Icon icon="solar:restart-bold-duotone" />}
            disabled={isPending}
            sx={{
              borderColor: theme.palette.divider,
              opacity: isPending ? 0.7 : 1,
              transition: 'opacity 0.2s',
              '&:hover': {
                bgcolor: alpha(theme.palette.warning.main, 0.08)
              }
            }}
          >
            Default
          </Button>
          <Box sx={{ flex: 1 }} />
          <Button
            variant="outlined"
            onClick={() => startTransition(handleCancel)}
            startIcon={<Icon icon="solar:close-circle-bold-duotone" />}
            disabled={isPending}
            sx={{
              borderColor: theme.palette.divider,
              opacity: isPending ? 0.7 : 1,
              transition: 'opacity 0.2s',
              '&:hover': {
                bgcolor: alpha(theme.palette.error.main, 0.08)
              }
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => startTransition(handleApply)}
            startIcon={<Icon icon="solar:check-circle-bold-duotone" />}
            disabled={isPending}
            sx={{
              bgcolor: theme.palette.primary.main,
              opacity: isPending ? 0.7 : 1,
              transition: 'opacity 0.2s',
              '&:hover': {
                bgcolor: theme.palette.primary.dark
              }
            }}
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

ThemeDialogSetting.propTypes = {
  renderButton: PropTypes.func
};

export default React.memo(ThemeDialogSetting);
