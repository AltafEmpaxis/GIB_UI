import { Icon } from '@iconify/react';
import { Box, Fab, Zoom } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// ==============================|| SCROLL TO TOP ||============================== //

const ScrollTop = ({ children }) => {
  const theme = useTheme();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button when page is scrolled more than 200px
      const scrolled = document.documentElement.scrollTop;
      setShow(scrolled > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {children}
      <Zoom in={show}>
        <Box
          onClick={handleClick}
          role="presentation"
          sx={{
            position: 'fixed',
            right: theme.spacing(4),
            bottom: theme.spacing(4),
            zIndex: theme.zIndex.drawer + 2
          }}
        >
          <Fab
            color="primary"
            size="small"
            aria-label="scroll back to top"
            sx={{
              boxShadow: theme.shadows[2],
              border: `1px solid ${alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.2 : 0.1)}`,
              bgcolor: alpha(
                theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
                theme.palette.mode === 'dark' ? 0.9 : 0.8
              ),
              color: theme.palette.primary.main,
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main
              },
              '&:active': {
                boxShadow: theme.shadows[4]
              }
            }}
          >
            <Icon
              icon="solar:alt-arrow-up-bold-duotone"
              width={30}
              style={{
                filter: `drop-shadow(0 0 8px ${alpha(theme.palette.primary.main, 0.4)})`
              }}
            />
          </Fab>
        </Box>
      </Zoom>
    </>
  );
};

ScrollTop.propTypes = {
  children: PropTypes.node
};

export default ScrollTop;
