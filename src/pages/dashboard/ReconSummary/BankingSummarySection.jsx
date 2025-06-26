import { Icon } from '@iconify/react';
import { alpha, Avatar, Box, Card, Chip, IconButton, Stack, Tooltip, Typography, useTheme } from '@mui/material';

const BankingSummarySection = () => {
  const theme = useTheme();

  return (
    <Card sx={{ p: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
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
              bgcolor: theme.palette.primary.lighter,
              color: theme.palette.primary.main
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
              bgcolor: theme.palette.primary.lighter,
              color: theme.palette.primary.main
            }}
          >
            <Icon icon="solar:refresh-bold" width={16} />
          </IconButton>
        </Tooltip>
      </Stack>

      <Box
        sx={{
          p: 1
        }}
      >
        <Stack spacing={1}>
          <Typography variant="body2" color="textSecondary" fontWeight={500}>
            Total Cash at Bank
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
              $9.38M
            </Typography>
            <Chip
              size="small"
              label="+3.6% this week"
              icon={<Icon icon="solar:arrow-up-bold" width={14} />}
              sx={{
                bgcolor: theme.palette.primary.lighter,
                color: theme.palette.primary.main,
                fontWeight: 600,
                height: 24
              }}
            />
          </Box>
          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
            {['SABB', 'NCB', 'Alinma'].map((bank, i) => (
              <Chip
                key={i}
                label={bank}
                size="small"
                sx={{
                  bgcolor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  height: 24,
                  fontWeight: 500
                }}
              />
            ))}
          </Stack>
        </Stack>
      </Box>

      <Stack spacing={2}>
        {[
          {
            name: 'Available Funds',
            value: '$3.85M',
            icon: 'solar:wallet-money-bold-duotone',
            color: theme.palette.primary.main
          },
          {
            name: 'Reserved Amounts',
            value: '$5.53M',
            icon: 'solar:lock-bold-duotone',
            color: theme.palette.secondary.main
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
              bgcolor:
                theme.palette.mode === 'dark' ? alpha(theme.palette.background.paper, 0.2) : theme.palette.grey[100],
              border: `1px solid ${theme.palette.divider}`
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  mr: 1.5,
                  bgcolor: alpha(item.color, 0.1),
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: item.color
                }}
              >
                <Icon icon={item.icon} width={20} />
              </Box>
              <Typography variant="body2" color="textSecondary" fontWeight={500}>
                {item.name}
              </Typography>
            </Box>
            <Typography variant="body1" fontWeight={700}>
              {item.value}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Card>
  );
};

export default BankingSummarySection;
