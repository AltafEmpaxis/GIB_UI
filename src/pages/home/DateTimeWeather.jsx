import { Icon } from '@iconify/react';
import {
  alpha,
  Avatar,
  Box,
  Card,
  CircularProgress,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  Switch,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import MainCard from 'components/MainCard';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

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

// Days of week
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const DateTimeWeather = () => {
  const theme = useTheme();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('Riyadh'); // Default city
  const [searchInput, setSearchInput] = useState('');
  const [activeTab, setActiveTab] = useState('temperature');
  const [tempUnit, setTempUnit] = useState('C');
  const [locationLoading, setLocationLoading] = useState(false);

  // Base chart options for ApexCharts
  const getBaseChartOptions = () => {
    const isDark = theme.palette.mode === 'dark';

    return {
      chart: {
        height: 200,
        type: 'area',
        toolbar: {
          show: false
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800
        },
        background: 'transparent',
        fontFamily: theme.typography.fontFamily
      },
      grid: {
        show: true,
        borderColor: isDark ? theme.palette.divider : theme.palette.grey[200],
        strokeDashArray: 3,
        xaxis: {
          lines: {
            show: false
          }
        }
      },
      stroke: {
        curve: 'smooth',
        width: 3
      },
      xaxis: {
        labels: {
          style: {
            colors: isDark ? theme.palette.text.secondary : theme.palette.text.secondary
          }
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        labels: {
          show: false
        }
      },
      tooltip: {
        theme: isDark ? 'dark' : 'light'
      }
    };
  };

  // Temperature chart options for ApexCharts
  const getChartOptions = (hourlyData) => {
    if (!hourlyData || !Array.isArray(hourlyData) || hourlyData.length === 0) {
      return {};
    }

    const times = hourlyData.map((item) => formatHour(item.hour));
    const temps = hourlyData.map((item) => convertTemp(item.temp));

    const isDark = theme.palette.mode === 'dark';
    const baseOptions = getBaseChartOptions();

    let chartColor, fillGradient;

    switch (activeTab) {
      case 'precipitation':
        chartColor = theme.palette.info.main;
        fillGradient = {
          shadeIntensity: 1,
          opacityFrom: 0.4,
          opacityTo: 0.05,
          stops: [0, 90, 100]
        };
        break;
      case 'wind':
        chartColor = isDark ? theme.palette.grey[400] : theme.palette.grey[600];
        fillGradient = {
          shadeIntensity: 1,
          opacityFrom: 0.2,
          opacityTo: 0.02,
          stops: [0, 90, 100]
        };
        break;
      default: // temperature
        chartColor = theme.palette.warning.main;
        fillGradient = {
          shadeIntensity: 1,
          opacityFrom: 0.35,
          opacityTo: 0.05,
          stops: [0, 95, 100]
        };
    }

    return {
      ...baseOptions,
      colors: [chartColor],
      fill: {
        type: 'gradient',
        gradient: fillGradient
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return activeTab === 'temperature' ? val + '°' : activeTab === 'precipitation' ? val + '%' : val + ' km/h';
        },
        style: {
          fontWeight: 600,
          colors: [isDark ? theme.palette.grey[100] : theme.palette.grey[900]]
        },
        background: {
          enabled: true,
          foreColor: isDark ? theme.palette.grey[100] : theme.palette.grey[900],
          borderRadius: 4,
          padding: 4,
          opacity: 0.6,
          borderWidth: 0
        }
      },
      markers: {
        size: 4,
        colors: [chartColor],
        strokeColors: isDark ? theme.palette.grey[100] : '#fff',
        strokeWidth: 2,
        hover: {
          size: 6
        }
      },
      xaxis: {
        ...baseOptions.xaxis,
        categories: times
      },
      tooltip: {
        ...baseOptions.tooltip,
        x: {
          show: false
        },
        y: {
          formatter: function (val) {
            return activeTab === 'temperature'
              ? val + '°' + tempUnit
              : activeTab === 'precipitation'
                ? val + '%'
                : val + ' km/h';
          }
        }
      }
    };
  };

  // Handle city search
  const handleCitySearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setCity(searchInput);
      setSearchInput('');
    }
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Handle temperature unit change
  const handleTempUnitChange = (event) => {
    setTempUnit(event.target.checked ? 'F' : 'C');
  };

  // Update date and time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Convert temperature based on selected unit
  const convertTemp = (celsius) => {
    if (!celsius && celsius !== 0) return '--';

    if (tempUnit === 'F') {
      return Math.round((celsius * 9) / 5 + 32);
    }
    return Math.round(celsius);
  };

  // Format date
  const formatDate = (date) => {
    if (!date) return '';
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Format time
  const formatTime = (date) => {
    if (!date) return '';
    const options = { hour: 'numeric', minute: '2-digit', hour12: true };
    return date.toLocaleTimeString('en-US', options);
  };

  // Get day of week
  const getDayOfWeek = (dateString) => {
    try {
      const date = new Date(dateString);
      return daysOfWeek[date.getDay()];
    } catch (err) {
      console.error('Error getting day of week:', err);
      return '';
    }
  };

  // Format hour (12 or 24 hour format)
  const formatHour = (hour) => {
    if (hour === undefined || hour === null) return '';

    if (hour === 0) return '12am';
    if (hour === 12) return '12pm';
    return hour < 12 ? `${hour}am` : `${hour - 12}pm`;
  };

  // Get current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setLocationLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
          setError('Unable to get your location. Please try searching for a city instead.');
          setLocationLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
    }
  };

  // Process forecast data to get daily forecasts and hourly temps
  const processForecastData = (forecastList) => {
    if (!forecastList || !Array.isArray(forecastList) || forecastList.length === 0) {
      throw new Error('Invalid forecast list');
    }

    try {
      // Get hourly temps for the temperature graph (next 24 hours)
      const hourlyTemps = forecastList.slice(0, 8).map((item) => {
        const dtSeconds = item.dt;
        const date = new Date(dtSeconds * 1000);
        return {
          time: `${date.getHours()}:00`,
          temp: Math.round(item.main.temp),
          hour: date.getHours()
        };
      });

      // Process precipitation data from API
      const hourlyPrecip = forecastList.slice(0, 8).map((item) => {
        const dtSeconds = item.dt;
        const date = new Date(dtSeconds * 1000);
        // Check for rain data in the API response
        const precipValue =
          item.rain && item.rain['3h']
            ? Math.round(item.rain['3h'])
            : item.pop
              ? Math.round(item.pop * 100) // Probability of precipitation is between 0-1
              : 0;

        return {
          time: `${date.getHours()}:00`,
          value: precipValue,
          hour: date.getHours()
        };
      });

      // Simulated wind data (for demo)
      const hourlyWind = forecastList.slice(0, 8).map((item) => {
        const dtSeconds = item.dt;
        const date = new Date(dtSeconds * 1000);
        return {
          time: `${date.getHours()}:00`,
          value: Math.round((item.wind?.speed || 0) * 3.6), // Convert to km/h
          hour: date.getHours()
        };
      });

      // Group forecast by day for daily forecast
      const dailyForecasts = {};
      forecastList.forEach((item) => {
        if (!item || !item.dt) return;

        const date = new Date(item.dt * 1000);
        const dateString = date.toISOString().split('T')[0];

        if (!dailyForecasts[dateString]) {
          dailyForecasts[dateString] = {
            date: dateString,
            day: getDayOfWeek(date),
            temps: [],
            icons: []
          };
        }

        if (item.main && typeof item.main.temp === 'number') {
          dailyForecasts[dateString].temps.push(item.main.temp);
        }

        if (item.weather && item.weather[0] && item.weather[0].main) {
          dailyForecasts[dateString].icons.push(item.weather[0].main);
        }
      });

      // Calculate min/max temp and most common weather icon for each day
      const dailyData = Object.values(dailyForecasts).map((day) => {
        // Safely handle empty arrays
        if (!day.temps.length) {
          return { ...day, minTemp: null, maxTemp: null, icon: null };
        }

        // Get min & max temperature
        const minTemp = Math.round(Math.min(...day.temps));
        const maxTemp = Math.round(Math.max(...day.temps));

        // Get most common weather condition
        const iconCounts = {};
        day.icons.forEach((icon) => {
          iconCounts[icon] = (iconCounts[icon] || 0) + 1;
        });

        let mostCommonIcon = 'default';
        if (Object.keys(iconCounts).length > 0) {
          mostCommonIcon = Object.keys(iconCounts).reduce((a, b) => (iconCounts[a] > iconCounts[b] ? a : b), 'default');
        }

        return {
          date: day.date,
          day: day.day,
          minTemp,
          maxTemp,
          icon: mostCommonIcon
        };
      });

      return {
        hourlyTemps,
        hourlyPrecip,
        hourlyWind,
        dailyData: dailyData.slice(0, 7) // Get 7 days forecast
      };
    } catch (err) {
      console.error('Error processing forecast data:', err);
      // Return fallback data structure
      return {
        hourlyTemps: [],
        hourlyPrecip: [],
        hourlyWind: [],
        dailyData: []
      };
    }
  };

  // Fetch weather by coordinates
  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      setLoading(true);
      setError(null);

      // Using a working demo API key (replace with your own for production)
      const API_KEY = '1635890035cbba097fd5c26c8ea672a1';

      // Current weather
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );

      if (!weatherResponse.ok) {
        throw new Error(`Weather data not available. Status: ${weatherResponse.status}`);
      }

      const weatherResult = await weatherResponse.json();
      setWeatherData(weatherResult);
      setCity(weatherResult.name); // Update city name based on coordinates

      // 5-day forecast
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );

      if (!forecastResponse.ok) {
        throw new Error(`Forecast data not available. Status: ${forecastResponse.status}`);
      }

      const forecastResult = await forecastResponse.json();

      if (!forecastResult || !forecastResult.list || !Array.isArray(forecastResult.list)) {
        throw new Error('Invalid forecast data structure');
      }

      // Process forecast data
      const processedForecast = processForecastData(forecastResult.list);
      setForecastData(processedForecast);
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError(`Unable to fetch weather data: ${err.message}`);
      setForecastData(null);
      setWeatherData(null);
    } finally {
      setLoading(false);
      setLocationLoading(false);
    }
  };

  // Fetch weather data
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Using a working demo API key (replace with your own for production)
        const API_KEY = '1635890035cbba097fd5c26c8ea672a1';

        // Current weather
        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!weatherResponse.ok) {
          throw new Error(`Weather data not available. Status: ${weatherResponse.status}`);
        }

        const weatherResult = await weatherResponse.json();
        setWeatherData(weatherResult);

        // 5-day forecast
        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!forecastResponse.ok) {
          throw new Error(`Forecast data not available. Status: ${forecastResponse.status}`);
        }

        const forecastResult = await forecastResponse.json();

        if (!forecastResult || !forecastResult.list || !Array.isArray(forecastResult.list)) {
          throw new Error('Invalid forecast data structure');
        }

        // Process forecast data
        const processedForecast = processForecastData(forecastResult.list);
        setForecastData(processedForecast);
      } catch (err) {
        console.error('Error fetching weather data:', err);
        setError(`Unable to fetch weather data: ${err.message}`);
        setForecastData(null);
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();

    // Refresh weather data every 30 minutes
    const weatherRefreshTimer = setInterval(fetchWeatherData, 1800000);

    return () => clearInterval(weatherRefreshTimer);
  }, [city]);

  // Get weather icon based on weather condition
  const getWeatherIcon = (weatherCondition) => {
    if (!weatherCondition) return weatherIcons.default;
    return weatherIcons[weatherCondition] || weatherIcons.default;
  };

  return (
    <MainCard
      contentSX={{ p: '0 !important' }}
      sx={{
        width: '100%',
        height: '100%',
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: theme.palette.mode === 'dark' ? '0 3px 14px rgba(0,0,0,0.3)' : '0 3px 14px rgba(58,53,65,0.1)',
        background:
          theme.palette.mode === 'dark' ? alpha(theme.palette.background.paper, 0.8) : theme.palette.background.paper
      }}
      title={
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Typography variant="h5">Weather</Typography>
        </Stack>
      }
      secondary={
        <Stack direction="row" spacing={1}>
          <Tooltip title="Get current location">
            <IconButton
              onClick={getCurrentLocation}
              disabled={locationLoading}
              color="primary"
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.2)
                }
              }}
            >
              {locationLoading ? (
                <CircularProgress size={18} color="inherit" />
              ) : (
                <Icon icon="solar:map-arrow-square-bold-duotone" width={18} />
              )}
            </IconButton>
          </Tooltip>
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
        </Stack>
      }
    >
      {loading ? (
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" sx={{ py: 6 }}>
          <CircularProgress size={30} color="warning" />
          <Typography>Loading weather data...</Typography>
        </Stack>
      ) : error ? (
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" sx={{ py: 6 }}>
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
            <Typography variant="body2">Please check API key or try another city</Typography>
          </Box>
        </Stack>
      ) : weatherData && forecastData ? (
        <Box>
          {/* Current Weather Section */}
          <Box
            sx={{
              p: { xs: 1.5, sm: 2 },
              borderRadius: 0,
              position: 'relative',
              overflow: 'hidden',
              borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`
            }}
          >
            <Grid container spacing={2}>
              {/* Left - Weather icon and city */}
              <Grid item xs={6}>
                <Stack spacing={0.5}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      component={motion.div}
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ repeat: Infinity, repeatType: 'reverse', duration: 3 }}
                      sx={{
                        width: 60,
                        height: 60,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mr: 1
                      }}
                    >
                      <Icon
                        icon={getWeatherIcon(weatherData.weather?.[0]?.main || 'default')}
                        width={60}
                        height={60}
                        color={theme.palette.mode === 'dark' ? '#FDB813' : '#FF8E00'}
                      />
                    </Box>

                    <Box>
                      <Typography
                        variant="h2"
                        component="div"
                        sx={{
                          fontSize: '3.2rem',
                          lineHeight: 1,
                          fontWeight: 600
                        }}
                      >
                        {convertTemp(weatherData.main?.temp)}
                        <Typography
                          component="span"
                          variant="h4"
                          sx={{
                            verticalAlign: 'top',
                            fontWeight: 400,
                            fontSize: '1.5rem',
                            ml: 0.5
                          }}
                        >
                          °{tempUnit}
                        </Typography>
                      </Typography>

                      <FormControlLabel
                        control={
                          <Switch
                            size="small"
                            checked={tempUnit === 'F'}
                            onChange={handleTempUnitChange}
                            sx={{
                              mr: 0.5,
                              '& .MuiSwitch-switchBase.Mui-checked': {
                                color: theme.palette.warning.main
                              },
                              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                backgroundColor: alpha(theme.palette.warning.main, 0.5)
                              }
                            }}
                          />
                        }
                        label={
                          <Typography variant="caption" sx={{ fontWeight: 500 }}>
                            °C / °F
                          </Typography>
                        }
                        sx={{ ml: -0.5 }}
                      />
                    </Box>
                  </Box>

                  <Typography
                    variant="subtitle1"
                    sx={{
                      textTransform: 'capitalize',
                      fontWeight: 500,
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: '1.1rem'
                    }}
                  >
                    {weatherData.weather?.[0]?.description || 'Unknown'}
                  </Typography>
                </Stack>
              </Grid>

              {/* Right - Details and datetime */}
              <Grid item xs={6}>
                <Stack spacing={0.5} alignItems="flex-end">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Icon
                      icon="solar:map-point-bold-duotone"
                      style={{
                        marginRight: '6px',
                        fontSize: '18px',
                        color: theme.palette.primary.main
                      }}
                    />
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mr: 0.5,
                        fontSize: '1.2rem'
                      }}
                    >
                      {weatherData.name}, {weatherData.sys?.country || ''}
                    </Typography>
                    <Typography
                      variant="caption"
                      component="span"
                      sx={{
                        color: theme.palette.primary.main,
                        cursor: 'pointer',
                        '&:hover': {
                          textDecoration: 'underline'
                        }
                      }}
                      onClick={() => setSearchInput(weatherData.name)}
                    >
                      · Choose area
                    </Typography>
                  </Box>

                  <Stack spacing={1} sx={{ mt: 0.5 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '0.95rem',
                        justifyContent: 'flex-end'
                      }}
                    >
                      <Icon icon="solar:calendar-bold-duotone" style={{ marginRight: '6px', fontSize: '16px' }} />
                      {formatDate(currentDateTime)}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '0.95rem',
                        justifyContent: 'flex-end'
                      }}
                    >
                      <Icon icon="solar:clock-circle-bold-duotone" style={{ marginRight: '6px', fontSize: '16px' }} />
                      {formatTime(currentDateTime)}
                    </Typography>
                  </Stack>

                  <Grid container spacing={1} sx={{ mt: 1, justifyContent: 'flex-end' }}>
                    <Grid item xs={12}>
                      <Typography
                        variant="body2"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          color: theme.palette.text.secondary,
                          fontSize: '0.95rem',
                          justifyContent: 'flex-end'
                        }}
                      >
                        <Icon icon="solar:water-drop-bold-duotone" style={{ marginRight: '8px', fontSize: '16px' }} />
                        Precipitation: {weatherData.rain ? Math.round(weatherData.rain['1h'] || 0) : '0'}%
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        variant="body2"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          color: theme.palette.text.secondary,
                          fontSize: '0.95rem',
                          justifyContent: 'flex-end'
                        }}
                      >
                        <Icon icon="solar:humidity-bold-duotone" style={{ marginRight: '8px', fontSize: '16px' }} />
                        Humidity: {weatherData.main?.humidity || '--'}%
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        variant="body2"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          color: theme.palette.text.secondary,
                          fontSize: '0.95rem',
                          justifyContent: 'flex-end'
                        }}
                      >
                        <Icon icon="solar:wind-bold-duotone" style={{ marginRight: '8px', fontSize: '16px' }} />
                        Wind: {weatherData.wind ? Math.round((weatherData.wind.speed || 0) * 3.6) : '--'} km/h
                      </Typography>
                    </Grid>
                  </Grid>
                </Stack>
              </Grid>
            </Grid>
          </Box>

          {/* Tab Bar */}
          <Box sx={{ borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              sx={{
                '& .MuiTabs-indicator': {
                  backgroundColor:
                    activeTab === 'temperature'
                      ? theme.palette.warning.main
                      : activeTab === 'precipitation'
                        ? theme.palette.info.main
                        : theme.palette.grey[500],
                  height: 3
                },
                '& .MuiTab-root': {
                  textTransform: 'capitalize',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  minWidth: 0,
                  p: 1.5,
                  mr: 3,
                  color: theme.palette.text.secondary,
                  '&.Mui-selected': {
                    color:
                      activeTab === 'temperature'
                        ? theme.palette.warning.main
                        : activeTab === 'precipitation'
                          ? theme.palette.info.main
                          : theme.palette.grey[600],
                    fontWeight: 600
                  }
                }
              }}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab
                icon={<Icon icon="solar:temperature-bold-duotone" width={18} />}
                iconPosition="start"
                label="Temperature"
                value="temperature"
              />
              <Tab
                icon={<Icon icon="solar:water-drop-bold-duotone" width={18} />}
                iconPosition="start"
                label="Precipitation"
                value="precipitation"
              />
              <Tab
                icon={<Icon icon="solar:wind-bold-duotone" width={18} />}
                iconPosition="start"
                label="Wind"
                value="wind"
              />
            </Tabs>
          </Box>

          {/* Chart */}
          <Box sx={{ p: 1.5 }}>
            {activeTab === 'temperature' && forecastData.hourlyTemps && forecastData.hourlyTemps.length > 0 ? (
              <ReactApexChart
                options={getChartOptions(forecastData.hourlyTemps)}
                series={[
                  {
                    name: 'Temperature',
                    data: forecastData.hourlyTemps.map((item) => convertTemp(item.temp))
                  }
                ]}
                type="area"
                height={180}
              />
            ) : activeTab === 'precipitation' && forecastData.hourlyPrecip ? (
              <ReactApexChart
                options={getChartOptions(forecastData.hourlyPrecip)}
                series={[
                  {
                    name: 'Precipitation',
                    data: forecastData.hourlyPrecip.map((item) => item.value)
                  }
                ]}
                type="area"
                height={180}
              />
            ) : activeTab === 'wind' && forecastData.hourlyWind ? (
              <ReactApexChart
                options={getChartOptions(forecastData.hourlyWind)}
                series={[
                  {
                    name: 'Wind Speed',
                    data: forecastData.hourlyWind.map((item) => item.value)
                  }
                ]}
                type="area"
                height={180}
              />
            ) : (
              <Box sx={{ height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="body2" color="textSecondary">
                  {activeTab === 'temperature'
                    ? 'No temperature data available'
                    : activeTab === 'precipitation'
                      ? 'No precipitation data available'
                      : 'No wind data available'}
                </Typography>
              </Box>
            )}
          </Box>

          {/* Weekly Forecast */}
          {forecastData.dailyData && forecastData.dailyData.length > 0 ? (
            <Box
              sx={{
                p: 1.5,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(70px, 1fr))',
                gap: 0.75,
                borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`
              }}
            >
              {forecastData.dailyData.map((day, index) => (
                <Card
                  key={index}
                  component={motion.div}
                  whileHover={{ y: -3 }}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 1,
                    borderRadius: 1.5,
                    bgcolor:
                      index === 0
                        ? alpha(theme.palette.warning.main, theme.palette.mode === 'dark' ? 0.15 : 0.08)
                        : alpha(theme.palette.background.paper, 0.6),
                    border: `1px solid ${
                      index === 0 ? alpha(theme.palette.warning.main, 0.2) : alpha(theme.palette.divider, 0.1)
                    }`,
                    boxShadow: index === 0 ? `0 3px 6px ${alpha(theme.palette.warning.main, 0.15)}` : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 600,
                      color: index === 0 ? theme.palette.warning.main : theme.palette.text.primary,
                      fontSize: '0.85rem'
                    }}
                  >
                    {index === 0 ? 'Today' : day.day}
                  </Typography>

                  <Box
                    component={motion.div}
                    whileHover={{ rotate: 10 }}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      my: 0.5
                    }}
                  >
                    <Icon
                      icon={getWeatherIcon(day.icon)}
                      width={32}
                      height={32}
                      style={{
                        color:
                          index === 0
                            ? theme.palette.warning.main
                            : theme.palette.mode === 'dark'
                              ? '#FDB813'
                              : '#FF8E00'
                      }}
                    />
                  </Box>

                  <Stack alignItems="center" spacing={0}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 600,
                        fontSize: '1rem',
                        color: index === 0 ? theme.palette.warning.dark : theme.palette.text.primary
                      }}
                    >
                      {convertTemp(day.maxTemp)}°
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        fontSize: '0.85rem'
                      }}
                    >
                      {convertTemp(day.minTemp)}°
                    </Typography>
                  </Stack>
                </Card>
              ))}
            </Box>
          ) : (
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="body2" color="textSecondary">
                No forecast data available
              </Typography>
            </Box>
          )}

          {/* Weather Alerts Section */}
          {weatherData && weatherData.main && weatherData.main.temp > 40 && (
            <Box
              sx={{
                p: 1.5,
                borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                background: alpha(theme.palette.error.light, 0.1),
                borderRadius: '0 0 8px 8px'
              }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    bgcolor: alpha(theme.palette.error.main, 0.2),
                    color: theme.palette.error.main
                  }}
                >
                  <Icon icon="solar:danger-triangle-bold-duotone" width={18} />
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" color="error.main" sx={{ fontWeight: 600 }}>
                    Excessive Heat
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    {weatherData.name}, {weatherData.sys?.country || ''}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          )}
        </Box>
      ) : (
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" sx={{ py: 6 }}>
          <Typography variant="body1" color="textSecondary">
            No weather data available
          </Typography>
        </Stack>
      )}
    </MainCard>
  );
};

export default DateTimeWeather;
