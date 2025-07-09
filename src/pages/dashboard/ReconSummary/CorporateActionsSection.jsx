import { Icon } from '@iconify/react';
import {
  alpha,
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  Chip,
  Stack,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';

const CorporateActionsSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Corporate actions data
  const corporateActions = [
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
  ];

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
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1.5 }}>
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
            <Icon icon="solar:calendar-bold-duotone" width={16} />
          </Avatar>
          Corporate Action for Today
        </Typography>
        <Chip
          label="This Month"
          size="small"
          sx={{
            bgcolor: alpha(theme.palette.secondary.main, 0.1),
            color: theme.palette.secondary.main,
            fontWeight: 500
          }}
        />
      </Stack>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
        <AvatarGroup
          max={5}
          sx={{
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              fontSize: '1rem',
              fontWeight: 600,
              border: `2px solid ${theme.palette.background.paper}`
            }
          }}
        >
          <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>JD</Avatar>
          <Avatar sx={{ bgcolor: theme.palette.primary.main }}>JS</Avatar>
          <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>RJ</Avatar>
          <Avatar sx={{ bgcolor: theme.palette.primary.main }}>AM</Avatar>
          <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>KS</Avatar>
          <Avatar sx={{ bgcolor: theme.palette.primary.main }}>FN</Avatar>
        </AvatarGroup>
        <Box
          sx={{
            ml: 'auto',
            p: 0.5,
            px: 1,
            borderRadius: 1,
            bgcolor: alpha(theme.palette.secondary.main, 0.1),
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Icon
            icon="solar:clock-circle-bold-duotone"
            color={theme.palette.secondary.main}
            width={18}
            style={{ marginRight: '6px' }}
          />
          <Typography variant="body2" fontWeight={500} color={theme.palette.secondary.main}>
            Today's Events
          </Typography>
        </Box>
      </Box>

      <Stack
        spacing={1.5}
        sx={{
          p: 1.5,
          borderRadius: 1,
          bgcolor: alpha(theme.palette.background.default, 0.6),
          border: `1px solid ${theme.palette.divider}`,
          flexGrow: 1,
          mb: 1.5
        }}
      >
        {corporateActions.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              py: 0.75,
              px: 0.75,
              borderRadius: 0.5,
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: alpha(theme.palette.background.paper, 0.5)
              }
            }}
          >
            <Typography variant="body2" color="textSecondary" fontWeight={500}>
              {item.name}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body2" fontWeight={700} color={item.color}>
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
          color: theme.palette.secondary.main,
          borderColor: theme.palette.secondary.main,
          borderRadius: 1,
          textTransform: 'none',
          fontWeight: 600,
          '&:hover': {
            borderColor: theme.palette.secondary.dark,
            bgcolor: alpha(theme.palette.secondary.main, 0.08)
          }
        }}
        endIcon={<Icon icon="solar:arrow-right-bold" />}
      >
        View All Corporate Actions
      </Button>
    </Card>
  );
};

export default CorporateActionsSection;
