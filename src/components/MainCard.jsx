import { forwardRef } from 'react';

// material-ui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

// ==============================|| CUSTOM MAIN CARD ||============================== //

const MainCard = forwardRef(
  (
    {
      border = true,
      boxShadow,
      children,
      content = true,
      contentSX = {},
      darkTitle,
      divider = true,
      elevation,
      secondary,
      shadow,
      sx = {},
      title,
      ...others
    },
    ref
  ) => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    return (
      <Card
        elevation={elevation !== undefined ? elevation : 1}
        ref={ref}
        {...others}
        sx={{
          position: 'relative',
          border: border ? `1px solid ${theme.palette.divider}` : 'none',
          borderRadius: 2,
          ':hover': {
            boxShadow: boxShadow ? shadow || (isDark ? theme.customShadows.z2 : theme.customShadows.z1) : 'inherit'
          },
          ...sx
        }}
      >
        {/* card header and action */}
        {!title ? null : (
          <CardHeader
            sx={{ p: 2.5 }}
            title={
              <Typography variant="h5" sx={{ color: darkTitle ? theme.palette.grey[900] : 'inherit' }}>
                {title}
              </Typography>
            }
            action={secondary}
          />
        )}

        {/* content & header divider */}
        {title && divider && <Divider />}

        {/* card content */}
        {content && <CardContent sx={{ p: 2.5, ...contentSX }}>{children}</CardContent>}
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
  children: PropTypes.node
};

export default MainCard;
