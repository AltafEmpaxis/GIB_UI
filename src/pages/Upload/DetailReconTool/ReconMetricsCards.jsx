import { Icon } from '@iconify/react';
import { alpha, Box, Card, CardContent, Divider, Grid, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

// Custom card component with animation
const MetricCard = ({ title, value, subtitle, icon, color, iconBg }) => {
  const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        y: -5,
        boxShadow: theme.shadows[10],
        transition: { duration: 0.2 }
      }}
    >
      <Card
        elevation={2}
        sx={{
          height: '100%',
          borderRadius: 2,
          position: 'relative',
          overflow: 'hidden',
          bgcolor: alpha(color.lighter, 0.9),
          border: `1px solid ${alpha(color.main, 0.1)}`
        }}
      >
        {/* Decorative background elements */}
        <Box
          sx={{
            position: 'absolute',
            top: -10,
            right: -10,
            width: 100,
            height: 100,
            borderRadius: '50%',
            bgcolor: alpha(color.main, 0.07),
            zIndex: 0
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -30,
            left: -20,
            width: 120,
            height: 120,
            borderRadius: '50%',
            bgcolor: alpha(color.main, 0.05),
            zIndex: 0
          }}
        />

        <CardContent sx={{ position: 'relative', zIndex: 1 }}>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start">
            <Box>
              <Typography variant="subtitle1" color={color.dark} fontWeight={600} gutterBottom>
                {title}
              </Typography>
              <Typography variant="h3" color={color.dark} sx={{ fontWeight: 700 }}>
                {value}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 1.5,
                borderRadius: 2,
                bgcolor: iconBg || alpha(color.main, 0.15),
                color: color.dark,
                boxShadow: theme.customShadows ? theme.customShadows.z1 : '0 2px 4px 0 rgba(0,0,0,0.1)'
              }}
            >
              <Icon icon={icon} width={28} height={28} />
            </Box>
          </Box>

          <Divider sx={{ my: 2, opacity: 0.5 }} />

          <Typography variant="body2" color={color.dark} sx={{ opacity: 0.8 }}>
            {subtitle}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};

MetricCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  subtitle: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  color: PropTypes.object.isRequired,
  iconBg: PropTypes.string
};

// Main component that renders all metric cards
const ReconMetricsCards = ({ data }) => {
  const theme = useTheme();

  // Calculate the metrics
  const totalAccounts = data.length;
  const reconciledAccounts = data.filter((account) => account.status === 'reconciled').length;
  const unreconciledAccounts = data.filter((account) => account.status === 'unreconciled').length;
  const totalAmount = data.reduce((sum, account) => sum + account.amount, 0);

  // Define color schemes
  const colorSchemes = {
    total: {
      main: theme.palette.primary.main,
      dark: theme.palette.primary.dark,
      lighter: theme.palette.primary.lighter,
      light: theme.palette.primary.light
    },
    reconciled: {
      main: theme.palette.success.main,
      dark: theme.palette.success.dark,
      lighter: theme.palette.success.lighter,
      light: theme.palette.success.light
    },
    unreconciled: {
      main: theme.palette.error.main,
      dark: theme.palette.error.dark,
      lighter: theme.palette.error.lighter,
      light: theme.palette.error.light
    },
    amount: {
      main: theme.palette.info.main,
      dark: theme.palette.info.dark,
      lighter: theme.palette.info.lighter,
      light: theme.palette.info.light
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <MetricCard
          title="Total Accounts"
          value={totalAccounts}
          subtitle="All accounts in system"
          icon="solar:files-bold-duotone"
          color={colorSchemes.total}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <MetricCard
          title="Reconciled"
          value={reconciledAccounts}
          subtitle="+8% from previous"
          icon="solar:check-circle-bold-duotone"
          color={colorSchemes.reconciled}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <MetricCard
          title="Unreconciled"
          value={unreconciledAccounts}
          subtitle="-3.2% from yesterday"
          icon="solar:close-circle-bold-duotone"
          color={colorSchemes.unreconciled}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <MetricCard
          title="Total Amount"
          value={new Intl.NumberFormat('en-SA', { style: 'currency', currency: 'SAR' }).format(totalAmount)}
          subtitle="Total reconciliation value"
          icon="solar:dollar-minimalistic-bold-duotone"
          color={colorSchemes.amount}
        />
      </Grid>
    </Grid>
  );
};

ReconMetricsCards.propTypes = {
  data: PropTypes.array.isRequired
};

export default ReconMetricsCards;
