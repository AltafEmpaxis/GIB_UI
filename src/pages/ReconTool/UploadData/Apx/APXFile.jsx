import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import NotificationBar from 'components/Upload/NotificationBar';

export default function APXFile() {
  const theme = useTheme();
  const [notification, setNotification] = useState({
    message: '',
    type: '',
    progress: 0,
    show: false
  });

  // APX data load handler
  const handleLoadAPXData = () => {
    // Show an initial loading notification
    setNotification({
      message: 'Loading APX data...',
      type: 'info',
      progress: 0,
      show: true
    });

    // Simulate progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;

      setNotification({
        message: 'Loading APX data...',
        type: 'info',
        progress,
        show: true
      });

      if (progress >= 100) {
        clearInterval(interval);

        // Show success notification
        setNotification({
          message: 'APX data loaded successfully',
          type: 'success',
          progress: 100,
          show: true
        });

        // Auto clear after 5 seconds
        setTimeout(() => {
          handleCloseNotification();
        }, 5000);
      }
    }, 500);
  };

  // Close notification
  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, show: false }));
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Notification */}
      <NotificationBar notification={notification} onClose={handleCloseNotification} />

      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Card
            sx={{
              height: '100%',
              boxShadow: theme.shadows[2],
              borderRadius: 2,
              overflow: 'hidden'
            }}
          >
            <Box
              sx={{
                p: 3,
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`
              }}
            >
              <Typography variant="h5" sx={{ mb: 1 }}>
                APX Data Import
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Connect to APX system and import financial data for reconciliation
              </Typography>
            </Box>

            <CardContent>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
                    Available Data Sources
                  </Typography>
                  <Grid container spacing={1}>
                    {['Portfolio Data', 'Security Information', 'Transaction History', 'Pricing Data'].map((item) => (
                      <Grid item xs={6} key={item}>
                        <Box
                          sx={{
                            p: 1.5,
                            bgcolor: alpha(theme.palette.background.default, 0.6),
                            borderRadius: 1,
                            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <Icon
                            icon="mdi:check-circle"
                            color={theme.palette.success.main}
                            width={18}
                            style={{ marginRight: 8 }}
                          />
                          <Typography variant="body2">{item}</Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>

                <Box sx={{ mt: 4, mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Connection Status
                  </Typography>
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: alpha(theme.palette.success.light, 0.1),
                      borderRadius: 1,
                      border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        bgcolor: theme.palette.success.main,
                        mr: 1.5
                      }}
                    />
                    <Typography variant="body2">APX System available and ready for data import</Typography>
                  </Box>
                </Box>

                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  startIcon={<Icon icon="mdi:database-import" />}
                  onClick={handleLoadAPXData}
                  sx={{ mt: 3 }}
                >
                  Import APX Data
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={5}>
          <Card
            sx={{
              height: '100%',
              boxShadow: theme.shadows[2],
              borderRadius: 2
            }}
          >
            <Box
              sx={{
                p: 3,
                bgcolor: alpha(theme.palette.secondary.main, 0.05),
                borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`
              }}
            >
              <Typography variant="h5" sx={{ mb: 1 }}>
                Last Import
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Summary of the most recent data import
              </Typography>
            </Box>

            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Last Import Date:
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {new Date().toLocaleDateString()}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Records Imported:
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    1,250
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Status:
                  </Typography>
                  <Chip size="small" label="Complete" color="success" />
                </Box>

                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Import History
                  </Typography>
                  <List disablePadding dense>
                    {[
                      { date: '2023-10-15', records: '1,250', status: 'Complete' },
                      { date: '2023-10-01', records: '1,125', status: 'Complete' },
                      { date: '2023-09-15', records: '1,050', status: 'Complete' }
                    ].map((item, index) => (
                      <ListItem
                        key={index}
                        sx={{
                          px: 1,
                          py: 0.75,
                          borderBottom: index !== 2 ? `1px solid ${alpha(theme.palette.divider, 0.1)}` : 'none'
                        }}
                      >
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography variant="body2">{item.date}</Typography>
                              <Typography variant="body2">{item.records} records</Typography>
                            </Box>
                          }
                          disableTypography
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
