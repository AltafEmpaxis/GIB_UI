import { Icon } from '@iconify/react';
import { alpha, Avatar, AvatarGroup, Box, Button, Card, Chip, Stack, Typography, useTheme } from '@mui/material';

const CorporateActionsSection = () => {
  const theme = useTheme();

  return (
    <Card sx={{ p: 2 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
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
            <Icon icon="solar:calendar-bold-duotone" width={16} />
          </Avatar>
          Corporate Action for Today
        </Typography>
        <Chip
          label="This Month"
          size="small"
          sx={{
            bgcolor: theme.palette.primary.lighter,
            color: theme.palette.primary.main,
            fontWeight: 500
          }}
        />
      </Stack>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <AvatarGroup
          max={5}
          sx={{
            '& .MuiAvatar-root': {
              width: 36,
              height: 36,
              fontSize: '1rem',
              fontWeight: 600,
              border: `2px solid ${theme.palette.background.paper}`
            }
          }}
        >
          <Avatar sx={{ bgcolor: theme.palette.primary.main }}>JD</Avatar>
          <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>JS</Avatar>
          <Avatar sx={{ bgcolor: theme.palette.primary.main }}>RJ</Avatar>
          <Avatar sx={{ bgcolor: theme.palette.primary.dark }}>AM</Avatar>
          <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>KS</Avatar>
          <Avatar sx={{ bgcolor: theme.palette.primary.main }}>FN</Avatar>
        </AvatarGroup>
        <Box
          sx={{
            ml: 'auto',
            p: 1,
            px: 1.5,
            borderRadius: 1,
            bgcolor: theme.palette.primary.lighter,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Icon
            icon="solar:clock-circle-bold-duotone"
            color={theme.palette.primary.main}
            width={18}
            style={{ marginRight: '6px' }}
          />
          <Typography variant="body2" fontWeight={500} color={theme.palette.primary.main}>
            Today's Events
          </Typography>
        </Box>
      </Box>

      <Stack
        spacing={1}
        sx={{
          p: 2,
          borderRadius: 1,
          bgcolor: theme.palette.mode === 'dark' ? alpha(theme.palette.background.paper, 0.2) : theme.palette.grey[100],
          border: `1px solid ${theme.palette.divider}`
        }}
      >
        {[
          {
            name: 'Dividend Payments',
            value: '3',
            change: 'Due today',
            color: theme.palette.success.main
          },
          {
            name: 'Rights Issues',
            value: '1',
            change: 'Closing today',
            color: theme.palette.warning.main
          },
          {
            name: 'Stock Splits',
            value: '2',
            change: 'Pending',
            color: theme.palette.info.main
          }
        ].map((item, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              py: 0.75
            }}
          >
            <Typography variant="body2" color="textSecondary" fontWeight={500}>
              {item.name}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body2" fontWeight={700} color="textPrimary">
                {item.value}
              </Typography>
              <Chip
                size="small"
                label={item.change}
                sx={{
                  height: 20,
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  bgcolor: alpha(item.color, 0.1),
                  color: item.color
                }}
              />
            </Stack>
          </Box>
        ))}
      </Stack>

      <Button
        fullWidth
        variant="outlined"
        sx={{
          mt: 2,
          color: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
          borderRadius: 1,
          textTransform: 'none',
          fontWeight: 600
        }}
        endIcon={<Icon icon="solar:arrow-right-bold" />}
      >
        View All Corporate Actions
      </Button>
    </Card>
  );
};

export default CorporateActionsSection;
