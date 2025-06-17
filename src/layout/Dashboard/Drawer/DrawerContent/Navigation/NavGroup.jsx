import { Box, List, Typography, alpha, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

import NavCollapse from './NavCollapse';
import NavItem from './NavItem';

const NavGroup = ({ item, selectedItems, selectedLevel, setSelectedItems, setSelectedLevel }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const items = item.children?.map((menu) => {
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
          <Typography key={menu.id} variant="h6" color="error" align="center">
            Menu Items Error: {menu.type}
          </Typography>
        );
    }
  });

  return (
    <List
      subheader={
        item.title && (
          <Box
            sx={{
              pl: { xs: 1.5, md: 2 },
              mb: 1,
              display: 'flex',
              alignItems: 'center',
              height: 26
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                color: isDark ? alpha(theme.palette.primary.light, 0.7) : theme.palette.primary.main,
                fontSize: '0.7rem',
                fontWeight: 600,
                lineHeight: '1.2',
                textTransform: 'uppercase',
                letterSpacing: '0.6px',
                position: 'relative',
                overflow: 'hidden',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  height: '1px',
                  width: '24px',
                  left: 'calc(100% + 10px)',
                  top: '50%',
                  background: isDark
                    ? `linear-gradient(90deg, ${alpha(theme.palette.primary.light, 0.4)}, ${alpha(theme.palette.primary.light, 0)})`
                    : `linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0.5)}, ${alpha(theme.palette.primary.main, 0)})`
                }
              }}
            >
              {item.title}
            </Typography>
          </Box>
        )
      }
      sx={{
        mb: 1.5,
        py: 0,
        '& .MuiListItemButton-root': {
          height: 44,
          transition: 'all 0.2s ease-in-out',
          '&.Mui-selected': {
            bgcolor: 'transparent',
            '&:hover': {
              bgcolor: isDark ? alpha(theme.palette.primary.main, 0.12) : alpha(theme.palette.primary.lighter, 0.6)
            }
          },
          '&:hover': {
            bgcolor: isDark ? alpha(theme.palette.primary.main, 0.08) : alpha(theme.palette.primary.lighter, 0.4)
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
