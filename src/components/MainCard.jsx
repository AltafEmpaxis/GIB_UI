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

    // Get color style based on color prop (following GIB guidelines)
    const getColorStyle = (colorName) => ({
      backgroundColor: alpha(theme.palette[colorName].main, 0.05),
      borderColor: alpha(theme.palette[colorName].main, 0.25),
      '&:hover': {
        backgroundColor: alpha(theme.palette[colorName].main, 0.1),
        boxShadow: colorName === 'secondary' ? theme.customShadows.secondaryButton : theme.customShadows.z2
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
          position: 'relative',
          border: '1px solid',
          borderColor: isDark ? alpha(theme.palette.common.white, 0.08) : alpha(theme.palette.grey[300], 0.8),
          borderRadius: 2,
          boxShadow: theme.customShadows.card,
          transition: theme.transitions.create(['box-shadow', 'border-color', 'background-color'], {
            duration: theme.transitions.duration.short
          }),
          '&:hover': {
            boxShadow: isDark ? theme.customShadows.z8 : theme.customShadows.z1
          },
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
            title={typeof title === 'string' ? <Typography variant="h5">{title}</Typography> : title}
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
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  content: PropTypes.bool,
  children: PropTypes.node,
  color: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'error', 'warning', 'info', 'success'])
};

export default MainCard;
