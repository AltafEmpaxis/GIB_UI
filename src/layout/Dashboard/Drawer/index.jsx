import { Box, Drawer } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';

import { DRAWER_WIDTH } from 'config';

import DrawerContent from './DrawerContent';
import DrawerFooter from './DrawerFooter';
import DrawerHeader from './DrawerHeader';

const MainDrawer = ({ open }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box component="nav">
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? DRAWER_WIDTH : 0,
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.standard
          }),
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            borderRight: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
            background: isDark
              ? `linear-gradient(${alpha(theme.palette.background.paper, 0.96)}, ${alpha(theme.palette.background.paper, 0.98)})`
              : `linear-gradient(${alpha(theme.palette.background.paper, 0.98)}, ${alpha(theme.palette.background.paper, 1)})`,
            backdropFilter: 'blur(8px)',
            overflowX: 'hidden',
            transform: open ? 'none' : 'translateX(-100%)',
            visibility: open ? 'visible' : 'hidden',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            top: 0,
            boxShadow: open ? (isDark ? '4px 0 10px rgba(0,0,0,0.15)' : '2px 0 8px rgba(0,0,0,0.05)') : 'none',
            transition: theme.transitions.create(['transform', 'visibility', 'box-shadow'], {
              easing: theme.transitions.easing.easeInOut,
              duration: theme.transitions.duration.standard
            }),
            '&:before': {
              content: '""',
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
              zIndex: -1,
              opacity: 0.05,
              backgroundImage: isDark
                ? 'radial-gradient(circle at 100% 150%, rgba(120, 120, 165, 0.1) 5%, rgba(120, 120, 165, 0.05) 15%, transparent 60%), radial-gradient(circle at 0% 50%, rgba(120, 120, 165, 0.15) 0%, transparent 40%)'
                : 'radial-gradient(circle at 100% 150%, rgba(234, 228, 252, 0.5) 5%, rgba(234, 228, 252, 0.2) 15%, transparent 60%), radial-gradient(circle at 0% 50%, rgba(234, 228, 252, 0.4) 0%, transparent 40%)'
            }
          }
        }}
      >
        <DrawerHeader open={open} />
        <DrawerContent />
        <DrawerFooter open={open} />
      </Drawer>
    </Box>
  );
};

MainDrawer.propTypes = {
  open: PropTypes.bool,
  handleDrawerToggle: PropTypes.func
};

export default MainDrawer;
