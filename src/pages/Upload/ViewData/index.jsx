import { Icon } from '@iconify/react';
import { Avatar, Box, Card, CardContent, Grid, Typography, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useState } from 'react';

const ViewData = ({ isLoading }) => {
  const theme = useTheme();
  const [activeFilter, setActiveFilter] = useState(null);

  // Data categories
  const dataCategories = [
    {
      id: 'albilad',
      title: 'Albilad Data',
      records: '2,458',
      lastUpdated: '2025-05-29',
      icon: 'mdi:bank',
      color: theme.palette.primary.main
    },
    {
      id: 'riyadh',
      title: 'Riyadh Data',
      records: '1,872',
      lastUpdated: '2025-05-30',
      icon: 'mdi:city',
      color: theme.palette.secondary.main
    },
    {
      id: 'at',
      title: 'AT Data',
      records: '945',
      lastUpdated: '2025-05-28',
      icon: 'mdi:office-building',
      color: '#FF9800'
    },
    {
      id: 'statestreet',
      title: 'State Street Data',
      records: '1,563',
      lastUpdated: '2025-05-31',
      icon: 'mdi:bank-outline',
      color: '#673AB7'
    },
    {
      id: 'apx',
      title: 'APX Data',
      records: '1,234',
      lastUpdated: '2025-05-31',
      icon: 'mdi:chart-box',
      color: '#4CAF50'
    }
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        View Data
      </Typography>

      <Grid container spacing={2}>
        {dataCategories.map((category, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: alpha(category.color, 0.1),
                      color: category.color,
                      width: 48,
                      height: 48,
                      mr: 2
                    }}
                  >
                    <Icon icon={category.icon} width={24} />
                  </Avatar>
                  <Box>
                    <Typography variant="h6">{category.title}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Last updated: {category.lastUpdated}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Records:
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {category.records}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ViewData;
