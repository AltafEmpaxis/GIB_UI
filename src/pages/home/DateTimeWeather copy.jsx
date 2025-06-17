import { useState, useEffect } from 'react';
import {
  alpha,
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  useTheme,
  CircularProgress,
  TextField,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import MainCard from 'components/MainCard';

// Weather icons mapping
const weatherIcons = {
  Clear: 'solar:sun-bold-duotone',
  Clouds: 'solar:cloud-bold-duotone',
  Rain: 'solar:cloud-rain-bold-duotone',
  Drizzle: 'solar:cloud-rain-bold-duotone',
  Thunderstorm: 'solar:cloud-lightning-bold-duotone',
  Snow: 'solar:cloud-snow-bold-duotone',
  Mist: 'solar:fog-bold-duotone',
  Smoke: 'solar:fog-bold-duotone',
  Haze: 'solar:fog-bold-duotone',
  Dust: 'solar:fog-bold-duotone',
  Fog: 'solar:fog-bold-duotone',
  Sand: 'solar:fog-bold-duotone',
  Ash: 'solar:fog-bold-duotone',
  Squall: 'solar:wind-bold-duotone',
  Tornado: 'solar:wind-bold-duotone',
  default: 'solar:sun-fog-bold-duotone'
};

const DateTimeWeather = () => {
  const theme = useTheme();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('Riyadh'); // Default city
  const [searchInput, setSearchInput] = useState('');

  // Handle city search
  const handleCitySearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setCity(searchInput);
      setSearchInput('');
    }
  };

  // Update date and time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Fetch weather data
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Using a working demo API key (replace with your own for production)
        const API_KEY = '1635890035cbba097fd5c26c8ea672a1';
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
          throw new Error('Weather data not available');
        }

        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        console.error('Error fetching weather data:', err);
        setError('Unable to fetch weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();

    // Refresh weather data every 30 minutes
    const weatherRefreshTimer = setInterval(fetchWeatherData, 1800000);

    return () => clearInterval(weatherRefreshTimer);
  }, [city]);

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  // Get weather icon based on weather condition
  const getWeatherIcon = (weatherCondition) => {
    if (!weatherCondition) return weatherIcons.default;
    return weatherIcons[weatherCondition] || weatherIcons.default;
  };

  return (
    <MainCard
      sx={{
        height: '100%',
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: theme.palette.mode === 'dark' ? '0 3px 14px rgba(0,0,0,0.3)' : '0 3px 14px rgba(58,53,65,0.1)'
      }}
      title={
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Avatar
            sx={{
              width: 34,
              height: 34,
              bgcolor: alpha(theme.palette.primary.main, 0.2),
              color: theme.palette.primary.main
            }}
          >
            <Icon icon="solar:calendar-bold-duotone" width={22} height={22} />
          </Avatar>
          <Typography variant="h5">Date, Time & Weather</Typography>
        </Stack>
      }
      secondary={
        <form onSubmit={handleCitySearch}>
          <TextField
            size="small"
            placeholder="Search city..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: alpha(theme.palette.background.paper, 0.7),
                '&:hover': {
                  borderColor: theme.palette.primary.main
                }
              },
              width: { xs: '100%', sm: 200 }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit" edge="end" size="small">
                    <Icon icon="solar:magnifer-bold-duotone" width={18} />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </form>
      }
    >
      <Grid container spacing={2}>
        {/* Date Card */}
        <Grid item xs={12} sm={6}>
          <Card
            component={motion.div}
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            sx={{
              boxShadow: 'none',
              borderRadius: 2,
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
              overflow: 'hidden'
            }}
          >
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  component={motion.div}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 1 }}
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: alpha(theme.palette.primary.main, 0.2)
                  }}
                >
                  <Icon
                    icon="solar:calendar-bold-duotone"
                    width={26}
                    height={26}
                    style={{ color: theme.palette.primary.main }}
                  />
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    Date
                  </Typography>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {formatDate(currentDateTime)}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Time Card */}
        <Grid item xs={12} sm={6}>
          <Card
            component={motion.div}
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            sx={{
              boxShadow: 'none',
              borderRadius: 2,
              bgcolor: alpha(theme.palette.secondary.main, 0.1),
              border: `1px solid ${alpha(theme.palette.secondary.main, 0.12)}`,
              overflow: 'hidden'
            }}
          >
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  component={motion.div}
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 60, ease: 'linear' }}
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: alpha(theme.palette.secondary.main, 0.2)
                  }}
                >
                  <Icon
                    icon="solar:clock-circle-bold-duotone"
                    width={26}
                    height={26}
                    style={{ color: theme.palette.secondary.main }}
                  />
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    Time
                  </Typography>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {formatTime(currentDateTime)}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Weather Card */}
        <Grid item xs={12}>
          <Card
            component={motion.div}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            sx={{
              boxShadow: 'none',
              borderRadius: 2,
              bgcolor: alpha(theme.palette.warning.main, 0.1),
              border: `1px solid ${alpha(theme.palette.warning.main, 0.12)}`,
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Decorative background elements */}
            <Box
              sx={{
                position: 'absolute',
                top: -15,
                right: -15,
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${alpha(theme.palette.warning.light, 0.3)} 0%, rgba(255,255,255,0) 70%)`,
                zIndex: 0
              }}
            />

            <CardContent sx={{ position: 'relative', zIndex: 1 }}>
              {loading ? (
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" sx={{ py: 2 }}>
                  <CircularProgress size={30} color="warning" />
                  <Typography>Loading weather data...</Typography>
                </Stack>
              ) : error ? (
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: alpha(theme.palette.error.main, 0.2)
                    }}
                  >
                    <Icon
                      icon="solar:danger-triangle-bold-duotone"
                      width={26}
                      height={26}
                      style={{ color: theme.palette.error.main }}
                    />
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="error">
                      {error}
                    </Typography>
                    <Typography variant="body2">Please check your API key or try again later</Typography>
                  </Box>
                </Stack>
              ) : (
                weatherData && (
                  <Grid container alignItems="center" spacing={2}>
                    {/* Weather Icon and Temp */}
                    <Grid item xs={12} sm={6}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Box
                          component={motion.div}
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          transition={{
                            repeat: Infinity,
                            repeatType: 'reverse',
                            duration: 3
                          }}
                          sx={{
                            width: 60,
                            height: 60,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: alpha(theme.palette.warning.main, 0.2),
                            boxShadow: `0 0 20px ${alpha(theme.palette.warning.main, 0.4)}`
                          }}
                        >
                          <Icon
                            icon={getWeatherIcon(weatherData.weather[0].main)}
                            width={36}
                            height={36}
                            style={{ color: theme.palette.warning.main }}
                          />
                        </Box>
                        <Box>
                          <Typography variant="h4" fontWeight={600}>
                            {Math.round(weatherData.main.temp)}°C
                          </Typography>
                          <Typography variant="subtitle2">
                            {weatherData.weather[0].description.charAt(0).toUpperCase() +
                              weatherData.weather[0].description.slice(1)}
                          </Typography>
                        </Box>
                      </Stack>
                    </Grid>

                    {/* City and Details */}
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <Typography variant="h6" sx={{ fontWeight: 500 }}>
                          <Icon
                            icon="solar:map-point-bold-duotone"
                            style={{ verticalAlign: 'middle', marginRight: '8px', color: theme.palette.warning.main }}
                          />
                          {weatherData.name}, {weatherData.sys.country}
                        </Typography>

                        <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                            <Icon
                              icon="solar:humidity-bold-duotone"
                              style={{ marginRight: '4px', color: theme.palette.info.main }}
                            />
                            Humidity: {weatherData.main.humidity}%
                          </Typography>

                          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                            <Icon
                              icon="solar:wind-bold-duotone"
                              style={{ marginRight: '4px', color: theme.palette.info.main }}
                            />
                            Wind: {Math.round(weatherData.wind.speed * 3.6)} km/h
                          </Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>
                )
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default DateTimeWeather;
