import { alpha, styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

// Custom styled SimpleBar
const SimpleBarStyle = styled(SimpleBar)(({ theme }) => ({
  maxHeight: '100%',
  '& .simplebar-scrollbar': {
    '&:before': {
      backgroundColor: alpha(theme.palette.grey[500], 0.48),
      borderRadius: 6,
      width: '100%',
      left: 0
    },
    '&.simplebar-visible:before': {
      opacity: 1
    },
    '&:hover:before': {
      backgroundColor:
        theme.palette.mode === 'dark' ? alpha(theme.palette.grey[400], 0.8) : alpha(theme.palette.grey[600], 0.8)
    }
  },
  '& .simplebar-track.simplebar-vertical': {
    width: 7,
    margin: '4px 0',
    borderRadius: 8,
    cursor: 'pointer',
    right: 0,
    '&:hover': {
      backgroundColor:
        theme.palette.mode === 'dark' ? alpha(theme.palette.grey[500], 0.48) : alpha(theme.palette.grey[200], 0.48),
      width: 15,
      transition: 'all 0.2s ease-in-out'
    }
  },
  '& .simplebar-track.simplebar-horizontal': {
    height: 14,
    margin: '0 4px',
    borderRadius: 8,
    bottom: 0,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor:
        theme.palette.mode === 'dark' ? alpha(theme.palette.grey[700], 0.48) : alpha(theme.palette.grey[300], 0.48),
      height: 16,
      transition: 'all 0.2s ease-in-out'
    }
  },
  '& .simplebar-mask': {
    height: 'auto !important',
    width: 'auto !important',
    overflow: 'hidden'
  },
  '& .simplebar-content-wrapper': {
    height: '100%'
  }
}));
// ==============================|| SIMPLE BAR - SCROLLBAR ||============================== //

export default function SimpleBarScroll({ children, sx, ...other }) {
  return (
    <SimpleBarStyle
      sx={{ height: '100%', ...sx }}
      {...other}
      options={{
        autoHide: false,
        clickOnTrack: true,
        scrollbarMinSize: 40,
        scrollbarMaxSize: 100,
        timeout: 500
      }}
    >
      {children}
    </SimpleBarStyle>
  );
}

SimpleBarScroll.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object
};
