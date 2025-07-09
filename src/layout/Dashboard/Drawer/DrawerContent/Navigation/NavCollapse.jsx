import { useState } from 'react';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';

import NavItem from './NavItem';

const NavCollapse = ({ menu, level, selectedItems, selectedLevel, setSelectedItems, setSelectedLevel }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const isDark = theme.palette.mode === 'dark';

  const handleClick = () => {
    setOpen(!open);
  };

  const textColor = isDark ? 'grey.400' : 'text.primary';
  const iconSelectedColor = 'secondary.main';

  const itemIcon = menu?.icon ? <menu.icon /> : null;

  return (
    <>
      <ListItemButton
        disabled={menu.disabled}
        sx={{
          pl: level * 1.75,
          py: 0.75,
          mb: 0.25,
          borderRadius: 0.5,
          backgroundColor: 'transparent',
          color: open ? theme.palette.secondary.main : textColor,
          transition: theme.transitions.create(['color', 'background-color'], {
            duration: theme.transitions.duration.shorter
          }),
          '&:hover': {
            bgcolor: isDark ? alpha(theme.palette.secondary.main, 0.2) : alpha(theme.palette.secondary.lighter, 0.5),
            color: isDark ? theme.palette.secondary.light : theme.palette.secondary.dark
          }
        }}
        onClick={handleClick}
      >
        {itemIcon && (
          <ListItemIcon
            sx={{
              minWidth: 28,
              color: 'inherit',
              transition: theme.transitions.create(['color'], {
                duration: theme.transitions.duration.shorter
              })
            }}
          >
            {itemIcon}
          </ListItemIcon>
        )}
        <ListItemText
          primary={
            <Typography
              variant="body2"
              color="inherit"
              sx={{
                fontWeight: open ? 500 : 400,
                fontSize: '0.875rem',
                lineHeight: '1.5',
                textAlign: 'left',
                transition: theme.transitions.create(['font-weight'], {
                  duration: theme.transitions.duration.shorter
                })
              }}
            >
              {menu.title}
            </Typography>
          }
        />
        {open ? (
          <ExpandLessIcon
            fontSize="small"
            color="inherit"
            sx={{
              ml: 0.5,
              color: open ? theme.palette.secondary.main : 'inherit'
            }}
          />
        ) : (
          <ExpandMoreIcon fontSize="small" color="inherit" sx={{ ml: 0.5 }} />
        )}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          component="div"
          disablePadding
          sx={{
            position: 'relative',
            '&:before': {
              content: '""',
              position: 'absolute',
              left: level * 1.75 + 14,
              top: 0,
              height: '100%',
              width: 1,
              opacity: 0.4,
              background: `linear-gradient(to bottom, ${alpha(theme.palette.secondary.main, 0.5)}, ${alpha(theme.palette.secondary.main, 0.1)})`
            }
          }}
        >
          {menu.children?.map((item) => {
            switch (item.type) {
              case 'item':
                return (
                  <NavItem
                    key={item.id}
                    item={item}
                    level={level + 1}
                    selected={selectedItems === item.id}
                    selectedLevel={selectedLevel}
                    setSelectedItems={setSelectedItems}
                    setSelectedLevel={setSelectedLevel}
                  />
                );
              default:
                return (
                  <Typography key={item.id} variant="h6" color="error" align="center">
                    Menu Items Error: {item.type}
                  </Typography>
                );
            }
          })}
        </List>
      </Collapse>
    </>
  );
};

NavCollapse.propTypes = {
  menu: PropTypes.object,
  level: PropTypes.number,
  selectedItems: PropTypes.string,
  selectedLevel: PropTypes.number,
  setSelectedItems: PropTypes.func,
  setSelectedLevel: PropTypes.func
};

export default NavCollapse;
