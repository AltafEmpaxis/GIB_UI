import { Box } from '@mui/material';

import SimpleBar from 'components/@extended/SimpleBar';
import { HEADER_HEIGHT } from 'config';

import Navigation from './Navigation';

const DrawerContent = () => {
  return (
    <Box sx={{ height: `calc(100vh - ${HEADER_HEIGHT}px)`, overflow: 'hidden' }}>
      <SimpleBar>
        <Navigation />
      </SimpleBar>
    </Box>
  );
};

export default DrawerContent;
