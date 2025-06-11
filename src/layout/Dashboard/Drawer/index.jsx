import { Box, Drawer } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';

import { DRAWER_WIDTH } from 'config';

import DrawerContent from './DrawerContent';
import DrawerFooter from './DrawerFooter';
import DrawerHeader from './DrawerHeader';

const MainDrawer = ({ open }) => {
  const theme = useTheme();

  return (
    <Box component="nav">
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? DRAWER_WIDTH : 0,
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.shorter
          }),
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            borderRight: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.paper,
            overflowX: 'hidden',
            transform: open ? 'none' : 'translateX(-100%)',
            visibility: open ? 'visible' : 'hidden',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            top: 0,
            transition: theme.transitions.create(['transform', 'visibility'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.shorter
            })
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
