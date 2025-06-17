import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// material-ui
import { Grid, Box, useMediaQuery } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

// project imports
import MainCard from 'components/MainCard';
import { GRID_SPACING } from 'config';
import WelcomeCard from './WelcomeCard';
import RecentReconActivity from './RecentReconActivity';
import PortfolioSecuritiesActivity from './PortfolioSecuritiesActivity';
import CorporateActionActivity from './CorporateActionActivity';
import TradesActivity from './TradesActivity';

const Dashboard = () => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const itemVariant = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <Box
      component={motion.div}
      variants={containerVariant}
      initial="hidden"
      animate="visible"
      sx={{
        background: alpha(theme.palette.primary.light, 0.05),
        minHeight: '100vh',
        p: { xs: 1.5, md: 2.5 },
        borderRadius: 2
      }}
    >
      <Grid container spacing={GRID_SPACING}>
        {/* Welcome Card */}
        <Grid item xs={12} component={motion.div} variants={itemVariant}>
          <WelcomeCard isLoading={isLoading} />
        </Grid>

        {/* Recent Activity - First Row */}
        <Grid item xs={12} md={matchDownMD ? 12 : 6} component={motion.div} variants={itemVariant}>
          <RecentReconActivity isLoading={isLoading} />
        </Grid>
        <Grid item xs={12} md={matchDownMD ? 12 : 6} component={motion.div} variants={itemVariant}>
          <PortfolioSecuritiesActivity isLoading={isLoading} />
        </Grid>

        {/* Recent Activity - Second Row */}
        <Grid item xs={12} md={matchDownMD ? 12 : 6} component={motion.div} variants={itemVariant}>
          <CorporateActionActivity isLoading={isLoading} />
        </Grid>
        <Grid item xs={12} md={matchDownMD ? 12 : 6} component={motion.div} variants={itemVariant}>
          <TradesActivity isLoading={isLoading} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
