import { Box, List, Typography, alpha, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

import NavCollapse from './NavCollapse';
import NavItem from './NavItem';

const NavGroup = ({ item, selectedItems, selectedLevel, setSelectedItems, setSelectedLevel }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  // Handle undefined items or items without children
  if (!item || !item.children) {
    return null;
  }

  const items = item.children
    ?.map((menu) => {
      // Ensure menu is properly defined and has a type property
      if (!menu || !menu.type) {
        console.warn('Menu item is missing required properties:', menu);
        return null;
      }

      switch (menu.type) {
        case 'collapse':
          return (
            <NavCollapse
              key={menu.id}
              menu={menu}
              level={1}
              selectedItems={selectedItems}
              selectedLevel={selectedLevel}
              setSelectedItems={setSelectedItems}
              setSelectedLevel={setSelectedLevel}
            />
          );
        case 'item':
          return (
            <NavItem
              key={menu.id}
              item={menu}
              level={1}
              selected={selectedItems === menu.id}
              selectedLevel={selectedLevel}
              setSelectedItems={setSelectedItems}
              setSelectedLevel={setSelectedLevel}
            />
          );
        default:
          return (
            <Typography key={menu.id || 'error'} variant="h6" color="error" align="center">
              Menu Items Error: {menu.type}
            </Typography>
          );
      }
    })
    .filter(Boolean); // Filter out any null items

  return (
    <List
      subheader={
        item.title && (
          <Box
            sx={{
              pl: { xs: 1.5, md: 2 },
              mb: 0.5,
              display: 'flex',
              alignItems: 'center',
              height: 24
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                color: isDark ? alpha(theme.palette.secondary.light, 0.9) : theme.palette.primary.dark,
                fontSize: '0.7rem',
                fontWeight: 600,
                lineHeight: '1.2',
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                position: 'relative',
                overflow: 'hidden',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  height: 1,
                  width: 30,
                  left: 'calc(100% + 12px)',
                  top: '50%',
                  background: isDark
                    ? `linear-gradient(90deg, ${alpha(theme.palette.secondary.light, 0.5)}, ${alpha(theme.palette.secondary.light, 0)})`
                    : `linear-gradient(90deg, ${alpha(theme.palette.secondary.main, 0.4)}, ${alpha(theme.palette.secondary.main, 0)})`
                }
              }}
            >
              {item.title}
            </Typography>
          </Box>
        )
      }
      sx={{
        mb: 2,
        py: 0.5,
        '& .MuiListItemButton-root': {
          height: 44,
          position: 'relative',
          transition: theme.transitions.create(['height', 'background-color'], {
            duration: theme.transitions.duration.standard
          }),
          '&.Mui-selected': {
            bgcolor: 'transparent',
            '&:hover': {
              bgcolor: isDark ? alpha(theme.palette.secondary.main, 0.2) : alpha(theme.palette.secondary.lighter, 0.4)
            }
          },
          '&:hover': {
            bgcolor: isDark ? alpha(theme.palette.secondary.main, 0.1) : alpha(theme.palette.secondary.lighter, 0.3)
          }
        }
      }}
    >
      {items}
    </List>
  );
};

NavGroup.propTypes = {
  item: PropTypes.object,
  selectedItems: PropTypes.string,
  selectedLevel: PropTypes.number,
  setSelectedItems: PropTypes.func,
  setSelectedLevel: PropTypes.func
};

export default NavGroup;
