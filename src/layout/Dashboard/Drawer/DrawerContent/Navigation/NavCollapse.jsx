import { useState } from 'react';

import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
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
          py: 1,
          mb: 0.3,
          borderRadius: 1,
          backgroundColor: 'transparent',
          color: open ? theme.palette.secondary.main : textColor,
          transition: theme.transitions.create(['color', 'background-color', 'border-radius'], {
            duration: theme.transitions.duration.standard
          }),
          '&:hover': {
            bgcolor: isDark ? alpha(theme.palette.secondary.main, 0.15) : alpha(theme.palette.secondary.lighter, 0.5),
            color: isDark ? theme.palette.secondary.light : theme.palette.secondary.dark
          },
          ...(open && {
            bgcolor: isDark ? alpha(theme.palette.secondary.main, 0.1) : alpha(theme.palette.secondary.lighter, 0.3),
            '&:hover': {
              bgcolor: isDark ? alpha(theme.palette.secondary.main, 0.15) : alpha(theme.palette.secondary.lighter, 0.4)
            }
          })
        }}
        onClick={handleClick}
      >
        {itemIcon && (
          <ListItemIcon
            sx={{
              minWidth: 28,
              color: 'inherit',
              transition: theme.transitions.create(['color', 'transform'], {
                duration: theme.transitions.duration.standard
              }),
              ...(open && {
                color: isDark ? theme.palette.secondary.light : theme.palette.secondary.dark
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
                fontWeight: open ? 500 : 450,
                fontSize: '0.875rem',
                lineHeight: '1.5',
                letterSpacing: '0.01em',
                textAlign: 'left',
                transition: theme.transitions.create(['font-weight', 'letter-spacing'], {
                  duration: theme.transitions.duration.standard
                }),
                ...(open && {
                  letterSpacing: '0.02em'
                })
              }}
            >
              {menu.title}
            </Typography>
          }
        />
        {open ? (
          <ExpandLessRoundedIcon
            fontSize="small"
            color="inherit"
            sx={{
              ml: 0.5,
              transition: theme.transitions.create(['transform', 'color'], {
                duration: theme.transitions.duration.shorter
              }),
              color: open ? theme.palette.secondary.main : 'inherit',
              transform: open ? 'rotate(0deg)' : 'rotate(-90deg)'
            }}
          />
        ) : (
          <ExpandMoreRoundedIcon
            fontSize="small"
            color="inherit"
            sx={{
              ml: 0.5,
              transition: theme.transitions.create(['transform', 'color'], {
                duration: theme.transitions.duration.shorter
              })
            }}
          />
        )}
      </ListItemButton>

      <Collapse
        in={open}
        timeout={{
          enter: 200,
          exit: 150
        }}
        unmountOnExit
      >
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
              opacity: open ? 0.4 : 0,
              background: `linear-gradient(to bottom,
                ${alpha(theme.palette.secondary.main, 0.4)},
                ${alpha(theme.palette.secondary.main, 0.1)})`,
              transition: theme.transitions.create(['opacity'], {
                duration: theme.transitions.duration.standard
              })
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
