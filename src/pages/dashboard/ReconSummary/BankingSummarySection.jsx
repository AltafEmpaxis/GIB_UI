import { Icon } from '@iconify/react';
import {
  alpha,
  Avatar,
  Box,
  Card,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';

const BankingSummarySection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Common styles
  const sectionStyles = {
    iconBox: {
      width: 36,
      height: 36,
      borderRadius: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      mr: 1.5
    },
    bankChip: {
      bgcolor: theme.palette.background.paper,
      border: `1px solid ${theme.palette.divider}`,
      height: 24,
      fontWeight: 500
    }
  };

  return (
    <Card
      sx={{
        p: isMobile ? 1 : 1.5,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 1,
        boxShadow: theme.shadows[1]
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: theme.palette.text.primary,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Avatar
            variant="rounded"
            sx={{
              width: 24,
              height: 24,
              mr: 1,
              bgcolor: alpha(theme.palette.secondary.main, 0.2),
              color: theme.palette.secondary.main
            }}
          >
            <Icon icon="solar:user-check-bold-duotone" width={16} />
          </Avatar>
          Banking Summary
        </Typography>
        <Tooltip title="Refresh banking data">
          <IconButton
            size="small"
            sx={{
              bgcolor: alpha(theme.palette.secondary.main, 0.1),
              color: theme.palette.secondary.main,
              '&:hover': {
                bgcolor: alpha(theme.palette.secondary.main, 0.2)
              }
            }}
          >
            <Icon icon="solar:refresh-bold" width={16} />
          </IconButton>
        </Tooltip>
      </Stack>

      <Box
        sx={{
          p: 1.5,
          mb: 1.5,
          borderRadius: 1,
          bgcolor: alpha(theme.palette.secondary.lighter, theme.palette.mode === 'dark' ? 0.1 : 0.3)
        }}
      >
        <Stack spacing={0.75}>
          <Typography variant="body2" color="textSecondary" fontWeight={500}>
            Total Cash at Bank
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography
              variant={isMobile ? 'h5' : 'h4'}
              sx={{
                fontWeight: 700,
                color: theme.palette.primary.main
              }}
            >
              $9.38M
            </Typography>
            <Chip
              size="small"
              label="+3.6% this week"
              icon={<Icon icon="solar:arrow-up-bold" width={14} />}
              sx={{
                bgcolor: alpha(theme.palette.secondary.main, 0.1),
                color: theme.palette.secondary.main,
                fontWeight: 600,
                height: 24
              }}
            />
          </Box>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              mt: 0.75,
              flexWrap: 'wrap',
              '& .MuiChip-root': {
                mb: 0.5
              }
            }}
          >
            {['SABB', 'NCB', 'Alinma'].map((bank, i) => (
              <Chip key={i} label={bank} size="small" sx={sectionStyles.bankChip} />
            ))}
          </Stack>
        </Stack>
      </Box>

      <Stack spacing={1.5} sx={{ flexGrow: 1 }}>
        {[
          {
            name: 'Available Funds',
            value: '$3.85M',
            icon: 'solar:wallet-money-bold-duotone',
            color: theme.palette.secondary.main
          },
          {
            name: 'Reserved Amounts',
            value: '$5.53M',
            icon: 'solar:lock-bold-duotone',
            color: theme.palette.primary.main
          }
        ].map((item, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 1.5,
              borderRadius: 1,
              bgcolor: alpha(theme.palette.background.default, 0.6),
              border: `1px solid ${theme.palette.divider}`,
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: alpha(theme.palette.background.default, 0.9),
                boxShadow: theme.shadows[1]
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  ...sectionStyles.iconBox,
                  bgcolor: alpha(item.color, 0.1),
                  color: item.color
                }}
              >
                <Icon icon={item.icon} width={20} />
              </Box>
              <Typography variant="body2" color="textSecondary" fontWeight={500}>
                {item.name}
              </Typography>
            </Box>
            <Typography variant="body1" fontWeight={700} color={item.color}>
              {item.value}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Card>
  );
};

export default BankingSummarySection;
