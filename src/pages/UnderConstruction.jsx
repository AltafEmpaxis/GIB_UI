import { Icon } from '@iconify/react';
import {
  Box,
  Button,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Switch,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

// Import the SVG image
import underConstructionSvg from '../assets/images/under-construction.svg';

const UnderConstruction = () => {
  // State for blueprint control panel
  const [zoomLevel, setZoomLevel] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [showGrid, setShowGrid] = useState(true);
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [activeLayer, setActiveLayer] = useState('overview');

  // Blueprint coordinates
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  // Calculate estimated completion date (15 days from today)
  const getEstimatedCompletionDate = () => {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + 15);

    // Format the date nicely
    return futureDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const estimatedCompletionDate = getEstimatedCompletionDate();

  // Random blueprint data generation
  const generateRandomPoints = () => {
    const points = [];
    for (let i = 0; i < 20; i++) {
      points.push({
        x: Math.floor(Math.random() * 100),
        y: Math.floor(Math.random() * 100)
      });
    }
    return points;
  };

  const [blueprintPoints, setBlueprintPoints] = useState(generateRandomPoints());

  // Track mouse movement over blueprint
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.floor(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.floor(((e.clientY - rect.top) / rect.height) * 100);
    setCoordinates({ x, y });
  };

  // Rotate blueprint
  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  // Handle layer selection
  const handleLayerSelect = (layer) => {
    setActiveLayer(layer);
  };

  // Generate a new set of points every 5 seconds to simulate "building"
  useEffect(() => {
    const interval = setInterval(() => {
      setBlueprintPoints(generateRandomPoints());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Array of available layers
  const layers = [
    { id: 'overview', label: 'OVERVIEW' },
    { id: 'ui-elements', label: 'UI ELEMENTS' },
    { id: 'backend', label: 'BACKEND' },
    { id: 'database', label: 'DATABASE' },
    { id: 'api', label: 'API' }
  ];

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        height: '100vh',
        backgroundColor: '#f0f4f7',
        overflow: 'auto'
      }}
    >
      {/* Blueprint navbar */}
      <Box
        sx={{
          py: 1.5,
          px: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(0,0,0,0.1)',
          backgroundColor: '#fff'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontFamily: 'monospace',
              letterSpacing: 1
            }}
          >
            <Icon icon="mdi:ruler" style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            PAGE UNDER CONSTRUCTION
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="body2"
            sx={{
              fontFamily: 'monospace',
              mr: 2,
              color: '#666'
            }}
          >
            X: {coordinates.x} | Y: {coordinates.y} | ZOOM: {zoomLevel}% | ROT: {rotation}°
          </Typography>

          <IconButton size="small" onClick={() => setZoomLevel(Math.min(zoomLevel + 10, 150))}>
            <Icon icon="mdi:magnify-plus" style={{ fontSize: '18px' }} />
          </IconButton>

          <IconButton size="small" onClick={() => setZoomLevel(Math.max(zoomLevel - 10, 50))}>
            <Icon icon="mdi:magnify-minus" style={{ fontSize: '18px' }} />
          </IconButton>

          <IconButton size="small" onClick={handleRotate}>
            <Icon icon="mdi:rotate-right" style={{ fontSize: '18px' }} />
          </IconButton>

          <Button
            component={Link}
            to="/dashboard"
            variant="outlined"
            size="medium"
            sx={{
              ml: 2,
              height: 36,
              borderRadius: 1,
              px: 2
            }}
          >
            <Icon icon="mdi:exit-to-app" style={{ marginRight: '4px' }} />
            Back to Dashboard
          </Button>
        </Box>
      </Box>

      {/* Main content area */}
      <Grid container sx={{ height: 'calc(100vh - 64px)' }}>
        {/* Sidebar */}
        <Grid
          item
          xs={3}
          md={2}
          sx={{
            borderRight: '1px solid rgba(0,0,0,0.1)',
            backgroundColor: '#f8f8f8',
            py: 2,
            display: { xs: 'none', sm: 'block' }
          }}
        >
          <Typography variant="subtitle2" sx={{ px: 2, mb: 2 }}>
            PROJECT SECTIONS
          </Typography>

          <List dense>
            {layers.map((layer) => (
              <ListItem
                key={layer.id}
                onClick={() => handleLayerSelect(layer.id)}
                sx={{
                  borderLeft: activeLayer === layer.id ? '3px solid' : '3px solid transparent',
                  borderColor: 'primary.main',
                  backgroundColor: activeLayer === layer.id ? 'rgba(33, 150, 243, 0.1)' : 'transparent',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.04)'
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <Icon icon="mdi:layers" style={{ fontSize: '18px' }} />
                </ListItemIcon>
                <ListItemText
                  primary={layer.label}
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontSize: '0.8rem'
                    }
                  }}
                />
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ px: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              VIEWING OPTIONS
            </Typography>

            <FormControlLabel
              control={<Switch size="small" checked={showGrid} onChange={(e) => setShowGrid(e.target.checked)} />}
              label={<Typography variant="body2">Show Grid</Typography>}
            />

            <FormControlLabel
              control={
                <Switch size="small" checked={showAnnotations} onChange={(e) => setShowAnnotations(e.target.checked)} />
              }
              label={<Typography variant="body2">Show Notes</Typography>}
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ px: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              CURRENT PROGRESS
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Icon icon="mdi:hammer" style={{ color: '#2196f3', marginRight: '8px', fontSize: '18px' }} />
              <Box sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2">UI Components</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    65%
                  </Typography>
                </Box>
                <LinearProgress variant="determinate" value={65} sx={{ height: 6, borderRadius: 3 }} />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, mt: 2 }}>
              <Icon icon="mdi:server" style={{ color: '#9c27b0', marginRight: '8px', fontSize: '18px' }} />
              <Box sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2">Backend Services</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>
                    48%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={48}
                  color="secondary"
                  sx={{ height: 6, borderRadius: 3 }}
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              <Icon icon="mdi:cog" style={{ color: '#ff9800', marginRight: '8px', fontSize: '18px' }} />
              <Box sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2">Integration</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'warning.main' }}>
                    30%
                  </Typography>
                </Box>
                <LinearProgress variant="determinate" value={30} color="warning" sx={{ height: 6, borderRadius: 3 }} />
              </Box>
            </Box>

            <Box sx={{ mt: 3, p: 2, bgcolor: 'rgba(0,0,0,0.03)', borderRadius: 1 }}>
              <Typography variant="body2" gutterBottom>
                <strong>Estimated completion:</strong> {estimatedCompletionDate}
              </Typography>
              <Typography variant="body2">We're working hard to bring you these new features soon.</Typography>
            </Box>

            {/* <Button
              component={Link}
              to="/dashboard"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mt: 3,
                height: 40,
                borderRadius: 1
              }}
              startIcon={<Icon icon="mdi:view-dashboard" />}
            >
              Return to Dashboard
            </Button> */}
          </Box>
        </Grid>

        {/* Blueprint viewing area */}
        <Grid item xs={12} sm={9} md={10}>
          <Box
            sx={{
              height: '100%',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'crosshair'
            }}
            onMouseMove={handleMouseMove}
          >
            {/* Blueprint grid */}
            {showGrid && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage:
                    'linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                  zIndex: 1
                }}
              />
            )}

            {/* Blueprint content */}
            <Box
              sx={{
                position: 'relative',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
                transform: `scale(${zoomLevel / 100}) rotate(${rotation}deg)`,
                transition: 'transform 0.3s ease-out'
              }}
            >
              {/* Main Heading */}
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  mb: 3,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: '#1976d2'
                }}
              >
                This Page Is Under Construction
              </Typography>

              {/* Main message */}
              <Typography variant="h6" sx={{ mb: 4, textAlign: 'center', maxWidth: 600 }}>
                We're building something awesome! Please check back soon to see the new features.
              </Typography>

              {/* Construction Image */}
              <Box
                component="img"
                src={underConstructionSvg}
                alt="Under Construction"
                sx={{
                  width: '80%',
                  maxWidth: '900px',
                  opacity: 0.9
                }}
              />

              {/* Blueprint annotation points */}
              {showAnnotations &&
                blueprintPoints.map((point, index) => (
                  <Box
                    key={index}
                    sx={{
                      position: 'absolute',
                      left: `${point.x}%`,
                      top: `${point.y}%`,
                      width: index % 3 === 0 ? '12px' : '8px',
                      height: index % 3 === 0 ? '12px' : '8px',
                      borderRadius: '50%',
                      backgroundColor:
                        index % 3 === 0 ? 'primary.main' : index % 3 === 1 ? 'secondary.main' : 'warning.main',
                      transform: 'translate(-50%, -50%)',
                      animation: 'pulse 2s infinite',
                      '@keyframes pulse': {
                        '0%': {
                          boxShadow: '0 0 0 0 rgba(33, 150, 243, 0.7)',
                          opacity: 1
                        },
                        '70%': {
                          boxShadow: '0 0 0 6px rgba(33, 150, 243, 0)',
                          opacity: 0.7
                        },
                        '100%': {
                          boxShadow: '0 0 0 0 rgba(33, 150, 243, 0)',
                          opacity: 1
                        }
                      }
                    }}
                  />
                ))}

              {/* Development Status */}
              <Paper
                elevation={3}
                sx={{
                  position: 'absolute',
                  top: '20%',
                  left: '15%',
                  padding: 2,
                  maxWidth: 250,
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  display: showAnnotations ? 'block' : 'none',
                  borderRadius: 2
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#ff9800',
                    mb: 1
                  }}
                >
                  <Icon icon="mdi:lightbulb" style={{ marginRight: '8px', fontSize: '24px' }} />
                  Current Status
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    mb: 1
                  }}
                >
                  We're currently working on the backend services. Overall completion is at 48%.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Expected completion date: {estimatedCompletionDate}
                </Typography>
              </Paper>

              {/* Feature under development */}
              <Paper
                elevation={3}
                sx={{
                  position: 'absolute',
                  bottom: '20%',
                  right: '15%',
                  padding: 2,
                  maxWidth: 250,
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  display: showAnnotations ? 'block' : 'none',
                  borderRadius: 2
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#1976d2',
                    mb: 1
                  }}
                >
                  <Icon icon="mdi:wrench" style={{ marginRight: '8px', fontSize: '24px' }} />
                  Coming Soon
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    mb: 1
                  }}
                >
                  We're building new features that will make your work more efficient and intuitive.
                </Typography>
                <Button component={Link} to="/dashboard" variant="outlined" size="small" fullWidth sx={{ mt: 1 }}>
                  Return to Dashboard
                </Button>
              </Paper>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UnderConstruction;
