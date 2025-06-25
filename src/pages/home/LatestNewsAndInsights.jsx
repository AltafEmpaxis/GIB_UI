import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Typography,
  useTheme,
  alpha,
  useMediaQuery,
  Paper,
  CircularProgress,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';
import { Icon } from '@iconify/react';

// Sample news data
const newsData = [
  {
    id: 1,
    category: 'PRESS RELEASES',
    date: '23 JUNE 2025',
    title: 'GIB establishes its first commercial paper program, further diversifying its funding sources',
    summary:
      "The new commercial paper program will enhance the bank's liquidity management and provide additional flexibility in funding operations.",
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&q=80&w=400&h=250&fit=crop',
    url: '#',
    featured: true,
    isNew: true,
    readTime: '3 min read'
  },
  {
    id: 2,
    category: 'PRESS RELEASES',
    date: '19 JUNE 2025',
    title: 'GIB launches new company to deliver Expo 2030 Riyadh',
    summary:
      'GIB announces the formation of a specialized subsidiary dedicated to supporting infrastructure development for Expo 2030 Riyadh.',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&q=80&w=400&h=250&fit=crop',
    url: '#',
    featured: false,
    isNew: true,
    readTime: '4 min read'
  },
  {
    id: 3,
    category: 'PRESS RELEASES',
    date: '05 JUNE 2025',
    title: 'GIB and FIFA forge partnership for FIFA Club World Cup 2025™',
    summary:
      'Strategic partnership will provide financial services and support for the upcoming FIFA Club World Cup 2025™ tournament.',
    image: 'https://images.unsplash.com/photo-1517747614396-d21a78b850e8?ixlib=rb-4.0.3&q=80&w=400&h=250&fit=crop',
    url: '#',
    featured: false,
    isNew: false,
    readTime: '2 min read'
  },
  {
    id: 4,
    category: 'MARKET UPDATES',
    date: '21 MAY 2025',
    title: 'Riyadh Air unveils its leading interior cabin designs',
    summary:
      'Riyadh Air reveals innovative cabin designs that will set new standards for passenger comfort and experience.',
    image: 'https://images.unsplash.com/photo-1525193612562-0ec53b0e5965?ixlib=rb-4.0.3&q=80&w=400&h=250&fit=crop',
    url: '#',
    featured: false,
    isNew: false,
    readTime: '5 min read'
  },
  {
    id: 5,
    category: 'INSIGHTS',
    date: '19 MAY 2025',
    title: 'GIB brings together more than 1,000 board members and executives of its portfolio companies',
    summary:
      'GIB hosts landmark gathering to facilitate knowledge exchange and collaboration among its portfolio companies.',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&q=80&w=400&h=250&fit=crop',
    url: '#',
    featured: false,
    isNew: false,
    readTime: '4 min read'
  },
  {
    id: 6,
    category: 'PRESS RELEASES',
    date: '19 MAY 2025',
    title: 'GIB opens subsidiary company office in Paris, latest step in its global expansion',
    summary:
      "The new Paris office represents GIB's commitment to strengthening its presence in European financial markets.",
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&q=80&w=400&h=250&fit=crop',
    url: '#',
    featured: false,
    isNew: false,
    readTime: '3 min read'
  },
  {
    id: 7,
    category: 'INSIGHTS',
    date: '12 MAY 2025',
    title: "Emerging trends in sustainable finance: GIB's perspective",
    summary: "GIB's research team analyzes key trends and opportunities in sustainable finance across global markets.",
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&q=80&w=400&h=250&fit=crop',
    url: '#',
    featured: false,
    isNew: false,
    readTime: '6 min read'
  },
  {
    id: 8,
    category: 'MARKET UPDATES',
    date: '05 MAY 2025',
    title: 'Quarterly market review: Economic outlook and investment strategy',
    summary: "GIB's analysis of current market conditions and strategic recommendations for the coming quarter.",
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&q=80&w=400&h=250&fit=crop',
    url: '#',
    featured: false,
    isNew: false,
    readTime: '5 min read'
  }
];

// Extract unique categories for filter
const categories = ['ALL', ...new Set(newsData.map((item) => item.category))];

const LatestNewsAndInsights = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const [hoveredItem, setHoveredItem] = useState(null);
  const [visibleCount, setVisibleCount] = useState(5);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [filteredNews, setFilteredNews] = useState(newsData);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');

  // Filter news based on selected category
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      if (selectedCategory === 'ALL') {
        setFilteredNews(newsData);
      } else {
        setFilteredNews(newsData.filter((item) => item.category === selectedCategory));
      }
      setIsLoading(false);
    }, 400);
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setVisibleCount(5);
  };

  const handleShowMore = () => {
    setVisibleCount(filteredNews.length);
  };

  const handleShowLess = () => {
    setVisibleCount(5);
  };

  const handleViewModeChange = (event, newViewMode) => {
    if (newViewMode !== null) {
      setViewMode(newViewMode);
    }
  };

  const renderNewsCard = (item, index) => {
    const isFirst = index === 0 && viewMode === 'grid';

    return (
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: viewMode === 'list' ? 'row' : 'column',
          boxShadow: theme.customShadows.z1
        }}
        onMouseEnter={() => setHoveredItem(item.id)}
        onMouseLeave={() => setHoveredItem(null)}
      >
        {/* Image Section */}
        <Box
          sx={{
            position: 'relative',
            height: viewMode === 'list' ? 'auto' : isFirst ? 300 : 180,
            width: viewMode === 'list' ? { xs: '100%', sm: 150, md: 200 } : '100%',
            flexShrink: 0,
            overflow: 'hidden'
          }}
        >
          <Box
            component="img"
            src={item.image}
            alt={item.title}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)'
              },
              display: 'block'
            }}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x250?text=GIB+News';
            }}
          />

          {/* New badge */}
          {item.isNew && (
            <Box
              sx={{
                position: 'absolute',
                top: 12,
                left: 12,
                zIndex: 2,
                bgcolor: theme.palette.error.main,
                color: '#fff',
                fontSize: '0.7rem',
                fontWeight: 700,
                px: 1,
                py: 0.5,
                textTransform: 'uppercase'
              }}
            >
              New
            </Box>
          )}

          {/* Category chip */}
          <Chip
            label={item.category
              .split(' ')
              .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
              .join(' ')}
            size="small"
            sx={{
              position: 'absolute',
              bottom: 12,
              left: 12,
              bgcolor: alpha(theme.palette.background.paper, 0.9),
              color: theme.palette.text.primary,
              fontWeight: 600,
              fontSize: '0.7rem',
              height: 24
            }}
          />
        </Box>

        {/* Content Section */}
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            p: isFirst ? 2.5 : 2
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
            <Typography
              variant="caption"
              sx={{
                color: theme.palette.text.secondary,
                fontWeight: 500,
                fontSize: '0.75rem',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Icon icon="solar:calendar-linear" width={14} style={{ marginRight: 4 }} />
              {item.date}
            </Typography>

            <Typography
              variant="caption"
              sx={{
                color: theme.palette.text.secondary,
                fontWeight: 500,
                fontSize: '0.75rem',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Icon icon="solar:clock-circle-linear" width={14} style={{ marginRight: 4 }} />
              {item.readTime}
            </Typography>
          </Stack>

          <Typography
            variant={isFirst ? 'h5' : 'subtitle1'}
            sx={{
              fontWeight: 600,
              mb: isFirst ? 1.5 : 1,
              color: hoveredItem === item.id ? theme.palette.primary.main : theme.palette.text.primary,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: isFirst ? 3 : 2,
              WebkitBoxOrient: 'vertical'
            }}
          >
            {item.title}
          </Typography>

          {(isFirst || viewMode === 'list' || !isMobile) && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 2,
                display: '-webkit-box',
                WebkitLineClamp: isFirst ? 3 : 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                flexGrow: 1
              }}
            >
              {item.summary}
            </Typography>
          )}

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              mt: 'auto'
            }}
          >
            <Button
              variant="text"
              color="primary"
              size="small"
              endIcon={<Icon icon="solar:arrow-right-linear" width={16} />}
              sx={{
                fontWeight: 600,
                textTransform: 'none'
              }}
            >
              Read Article
            </Button>
          </Box>
        </CardContent>
      </Card>
    );
  };

  const renderLoadingState = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', my: 6 }}>
      <CircularProgress size={36} thickness={4} color="primary" />
    </Box>
  );

  const renderEmptyState = () => (
    <Paper
      elevation={0}
      sx={{
        textAlign: 'center',
        py: 6,
        px: 3,
        bgcolor: alpha(theme.palette.background.default, 0.5),
        border: `1px dashed ${alpha(theme.palette.divider, 0.6)}`
      }}
    >
      <Box
        sx={{
          width: 80,
          height: 80,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 3,
          mx: 'auto'
        }}
      >
        <Icon
          icon="solar:documents-minimalistic-bold"
          width={40}
          height={40}
          style={{
            opacity: 0.7,
            color: theme.palette.primary.main
          }}
        />
      </Box>
      <Typography variant="h6" color="textPrimary" gutterBottom>
        No Articles Found
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ maxWidth: 400, mx: 'auto', mb: 3 }}>
        We couldn't find any articles in the {selectedCategory.toLowerCase()} category. Please try another category or
        check back later for updates.
      </Typography>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => setSelectedCategory('ALL')}
        startIcon={<Icon icon="solar:refresh-bold" width={18} />}
      >
        View All News
      </Button>
    </Paper>
  );

  return (
    <Box sx={{ position: 'relative' }}>
      {/* Header section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', md: 'center' },
          mb: 3,
          pb: 2,
          borderBottom: `1px solid ${theme.palette.divider}`
        }}
      >
        <Box sx={{ mb: { xs: 2, md: 0 } }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: theme.palette.text.primary
            }}
          >
            Latest News & Insights
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, maxWidth: 500 }}>
            Get the latest updates on GIB Capital's activities, market insights, and financial news.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={handleViewModeChange}
            aria-label="view mode"
            size="small"
          >
            <ToggleButton value="grid" aria-label="grid view">
              <Icon icon="mdi:view-grid-outline" width={20} />
            </ToggleButton>
            <ToggleButton value="list" aria-label="list view">
              <Icon icon="mdi:view-list-outline" width={20} />
            </ToggleButton>
          </ToggleButtonGroup>
          <Button variant="outlined" color="primary" endIcon={<Icon icon="solar:arrow-right-linear" width={18} />}>
            Visit Newsroom
          </Button>
        </Box>
      </Box>

      {/* Category filter chips */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          mb: 3
        }}
      >
        {categories.map((category) => (
          <Chip
            key={category}
            label={
              category === 'ALL'
                ? 'All News'
                : category
                    .split(' ')
                    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
                    .join(' ')
            }
            onClick={() => handleCategoryChange(category)}
            variant={selectedCategory === category ? 'filled' : 'outlined'}
            color={selectedCategory === category ? 'primary' : 'default'}
            sx={{
              fontWeight: 600,
              fontSize: '0.85rem'
            }}
          />
        ))}
      </Box>

      {/* News content */}
      {isLoading ? (
        renderLoadingState()
      ) : filteredNews.length === 0 ? (
        renderEmptyState()
      ) : (
        <Box>
          {viewMode === 'grid' ? (
            <Grid container spacing={2}>
              {filteredNews.slice(0, visibleCount).map((item, index) => (
                <Grid item xs={12} sm={index === 0 ? 12 : 6} md={index === 0 ? 12 : 4} key={item.id}>
                  {renderNewsCard(item, index)}
                </Grid>
              ))}
            </Grid>
          ) : (
            <Stack spacing={2}>
              {filteredNews.slice(0, visibleCount).map((item, index) => (
                <Box key={item.id}>{renderNewsCard(item, index)}</Box>
              ))}
            </Stack>
          )}

          {/* Load More/Less Button */}
          {filteredNews.length > 5 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={visibleCount === 5 ? handleShowMore : handleShowLess}
                startIcon={
                  <Icon
                    icon={visibleCount === 5 ? 'solar:alt-arrow-down-bold' : 'solar:alt-arrow-up-bold'}
                    width={18}
                  />
                }
              >
                {visibleCount === 5 ? 'Load More Articles' : 'Show Less'}
              </Button>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default LatestNewsAndInsights;
