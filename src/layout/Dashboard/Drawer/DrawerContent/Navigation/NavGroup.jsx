import { Box, List, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import NavCollapse from './NavCollapse';
import NavItem from './NavItem';

const NavGroup = ({ item, selectedItems, selectedLevel, setSelectedItems, setSelectedLevel }) => {
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
              pl: 1.5,
              mb: 0.5,
              display: 'flex',
              alignItems: 'center',
              height: 25
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                color: 'text.secondary',
                fontSize: '0.65rem',
                fontWeight: 500,
                lineHeight: '1.2',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              {item.title}
            </Typography>
          </Box>
        )
      }
      sx={{
        mb: 1,
        py: 0,
        '& .MuiListItemButton-root': {
          height: 44,
          '&.Mui-selected': {
            bgcolor: 'transparent',
            '&:hover': {
              bgcolor: 'primary.lighter'
            }
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
