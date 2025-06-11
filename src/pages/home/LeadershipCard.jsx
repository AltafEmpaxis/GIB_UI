import { useState } from 'react';

// material-ui
import { Icon } from '@iconify/react';
import { alpha, Avatar, Box, Card, CardContent, Chip, IconButton, Stack, Typography, useTheme } from '@mui/material';

// project imports
import MainCard from 'components/MainCard';

// ==============================|| LEADERSHIP CARD ||============================== //

const LeadershipCard = () => {
  const theme = useTheme();
  const [currentLeader, setCurrentLeader] = useState(0);

  // Sample leadership data - in a real app, this would come from an API or CMS
  const leaders = [
    {
      id: 1,
      name: 'Ahmed Al-Sayed',
      position: 'Chief Executive Officer',
      message:
        'Our commitment to excellence and innovation drives everything we do at GIB. Together, we are building a stronger future for our clients and partners.',
      image: 'https://i.pravatar.cc/150?img=33'
    },
    {
      id: 2,
      name: 'Sarah Al-Mahmoud',
      position: 'Chief Financial Officer',
      message:
        'Financial integrity and transparency are the foundations of our business. We strive to create sustainable value for all our stakeholders.',
      image: 'https://i.pravatar.cc/150?img=32'
    },
    {
      id: 3,
      name: 'Mohammed Al-Harbi',
      position: 'Chief Technology Officer',
      message:
        'Technology is transforming the investment landscape. Our innovative solutions help clients navigate complexity and achieve their goals.',
      image: 'https://i.pravatar.cc/150?img=65'
    }
  ];

  const handleNext = () => {
    setCurrentLeader((prev) => (prev + 1) % leaders.length);
  };

  const handlePrevious = () => {
    setCurrentLeader((prev) => (prev - 1 + leaders.length) % leaders.length);
  };

  const leader = leaders[currentLeader];

  return (
    <MainCard
      title="Leadership Insights"
      secondary={
        <Avatar
          sx={{
            width: 34,
            height: 34,
            bgcolor: theme.palette.primary.light,
            color: theme.palette.primary.dark
          }}
        >
          <Icon icon="solar:users-group-rounded-bold-duotone" width={22} height={22} />
        </Avatar>
      }
      sx={{
        height: '100%',
        backgroundColor: theme.palette.mode === 'dark' ? 'background.default' : 'grey.50'
      }}
    >
      <Card
        elevation={0}
        sx={{
          bgcolor: alpha(theme.palette.primary.main, 0.05),
          p: 1,
          borderRadius: 2,
          position: 'relative',
          height: 'calc(100% - 16px)'
        }}
      >
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
            <Avatar
              src={leader.image}
              alt={leader.name}
              sx={{
                width: 80,
                height: 80,
                border: `2px solid ${theme.palette.primary.main}`,
                boxShadow: theme.shadows[2]
              }}
            />
            <Box>
              <Typography variant="h5" color="primary.main" sx={{ fontWeight: 600 }}>
                {leader.name}
              </Typography>
              <Chip
                label={leader.position}
                size="small"
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  mt: 0.5
                }}
              />
            </Box>
          </Stack>

          <Typography
            variant="body1"
            sx={{
              fontStyle: 'italic',
              mb: 2,
              color: theme.palette.text.secondary
            }}
          >
            "{leader.message}"
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            justifyContent="space-between"
            sx={{ mt: 2, pt: 2, borderTop: `1px solid ${alpha(theme.palette.divider, 0.3)}` }}
          >
            <IconButton
              onClick={handlePrevious}
              size="small"
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.2) }
              }}
            >
              <Icon icon="solar:arrow-left-bold-duotone" width={20} height={20} />
            </IconButton>
            <Typography variant="caption" color="text.secondary">
              {currentLeader + 1} of {leaders.length}
            </Typography>
            <IconButton
              onClick={handleNext}
              size="small"
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.2) }
              }}
            >
              <Icon icon="solar:arrow-right-bold-duotone" width={20} height={20} />
            </IconButton>
          </Stack>
        </CardContent>
      </Card>
    </MainCard>
  );
};

export default LeadershipCard;
