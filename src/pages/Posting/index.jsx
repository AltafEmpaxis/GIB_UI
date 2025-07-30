import React from 'react';
import MainCard from 'components/MainCard';
import { Box, Typography } from '@mui/material';

export default function Index() {
  return (
    <MainCard
      title={
        <Box>
          <Typography variant="h5">Posting</Typography>
        </Box>
      }
    >
      <h1>Posting Page</h1>
      <p>This page is under construction.</p>
      <p>Please check back later for updates.</p>
      <p>For any urgent inquiries, please contact support.</p>
      <p>Thank you for your patience!</p>
    </MainCard>
  );
}
