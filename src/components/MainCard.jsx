import { forwardRef } from 'react';

// material-ui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import { useTheme, alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

// ==============================|| CUSTOM MAIN CARD ||============================== //

const MainCard = forwardRef(
  (
    {
      children,
      content = true,
      contentSX = {},
      darkTitle,
      divider = true,
      secondary,
      sx = {},
      title,
      color, // Added color prop for card variants
      ...others
    },
    ref
  ) => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    // Get color style based on color prop (similar to Card.jsx)
    const getColorStyle = (colorName) => ({
      backgroundColor: alpha(theme.palette[colorName].main, 0.05),
      borderColor: alpha(theme.palette[colorName].main, 0.25),
      '&:hover': {
        backgroundColor: alpha(theme.palette[colorName].main, 0.1)
      }
    });

    // Determine card style based on color prop
    const colorStyle = color ? getColorStyle(color) : {};

    return (
      <Card
        ref={ref}
        className="MainCard"
        {...others}
        sx={{
          ...(color && { ...colorStyle }),
          ...sx
        }}
      >
        {/* card header and action */}
        {!title ? null : (
          <CardHeader
            sx={{
              p: 2.5,
              '& .MuiCardHeader-title': {
                fontSize: '1rem',
                fontWeight: 500,
                color: darkTitle ? theme.palette.text.primary : 'inherit'
              }
            }}
            title={<Typography variant="h5">{title}</Typography>}
            action={secondary}
          />
        )}

        {/* content & header divider */}
        {title && divider && (
          <Divider
            sx={{
              opacity: isDark ? 0.2 : 0.4,
              borderColor: theme.palette.divider
            }}
          />
        )}

        {/* card content */}
        {content && (
          <CardContent
            sx={{
              p: 2.5,
              '&:last-child': { pb: 2.5 },
              ...contentSX
            }}
          >
            {children}
          </CardContent>
        )}
        {!content && children}
      </Card>
    );
  }
);

MainCard.displayName = 'MainCard';

MainCard.propTypes = {
  border: PropTypes.bool,
  boxShadow: PropTypes.bool,
  contentSX: PropTypes.object,
  darkTitle: PropTypes.bool,
  divider: PropTypes.bool,
  elevation: PropTypes.number,
  secondary: PropTypes.node,
  shadow: PropTypes.string,
  sx: PropTypes.object,
  title: PropTypes.string,
  content: PropTypes.bool,
  children: PropTypes.node,
  color: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'error', 'warning', 'info', 'success']) // Added color prop types
};

export default MainCard;
