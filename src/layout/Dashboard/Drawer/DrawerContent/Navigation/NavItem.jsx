import { Icon } from '@iconify/react';
import { Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const NavItem = ({ item, level, selected, selectedLevel, setSelectedItems, setSelectedLevel }) => {
  const theme = useTheme();
  const { icon, id, title, url, chip } = item;
  const isDark = theme.palette.mode === 'dark';

  const itemIcon = item?.icon ? <item.icon /> : <Icon icon={icon} width={20} height={20} />;

  const textColor = isDark ? 'grey.400' : 'text.primary';
  const iconSelectedColor = 'secondary.main';
  const isSelected = selected && selectedLevel === level;

  return (
    <ListItemButton
      component={Link}
      to={url}
      disabled={item.disabled}
      selected={isSelected}
      onClick={() => {
        setSelectedItems(id);
        setSelectedLevel(level);
      }}
      sx={{
        pl: level * 1.5,
        py: 0.75,
        mb: 0.25,
        borderRadius: 1,
        backgroundColor: 'transparent',
        color: isSelected ? iconSelectedColor : textColor,
        transition: theme.transitions.create(['color', 'background-color', 'box-shadow'], {
          duration: theme.transitions.duration.standard
        }),
        '&:hover': {
          bgcolor: isDark ? alpha(theme.palette.secondary.main, 0.15) : alpha(theme.palette.secondary.lighter, 0.5),
          color: isSelected ? iconSelectedColor : theme.palette.primary.main,
          boxShadow: isSelected ? 'none' : 'none'
        },
        '&.Mui-selected': {
          bgcolor: isDark ? alpha(theme.palette.secondary.main, 0.2) : alpha(theme.palette.secondary.lighter, 0.3),
          color: isDark ? theme.palette.secondary.light : theme.palette.secondary.dark,
          position: 'relative',
          '&:before': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            height: '60%',
            width: 3,
            borderRadius: '0 2px 2px 0',
            backgroundColor: theme.palette.secondary.main,
            transition: theme.transitions.create(['height', 'opacity'], {
              duration: theme.transitions.duration.shorter
            })
          },
          '&:hover': {
            bgcolor: isDark ? alpha(theme.palette.secondary.main, 0.3) : alpha(theme.palette.secondary.lighter, 0.5),
            color: isDark ? theme.palette.secondary.main : theme.palette.secondary.dark
          }
        }
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 28,
          color: 'inherit',
          fontSize: isSelected ? '1.125rem' : '1rem',
          transition: theme.transitions.create(['color', 'font-size'], {
            duration: theme.transitions.duration.shorter
          }),
          ...(!item?.icon && {
            borderRadius: 1,
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '&:hover': {
              bgcolor: 'transparent'
            }
          })
        }}
      >
        {itemIcon}
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography
            variant="body2"
            color="inherit"
            sx={{
              fontWeight: isSelected ? 600 : 450,
              fontSize: '0.875rem',
              lineHeight: '1.5',
              letterSpacing: '0.01em',
              textAlign: 'left',
              transition: theme.transitions.create(['font-weight', 'letter-spacing'], {
                duration: theme.transitions.duration.shorter
              }),
              ...(isSelected && {
                color: isDark ? theme.palette.secondary.main : theme.palette.secondary.dark,
                letterSpacing: '0.02em'
              })
            }}
          >
            {title}
          </Typography>
        }
      />
      {chip && (
        <Chip
          color={chip.color}
          variant={chip.variant || 'light'}
          size="small"
          label={chip.label}
          avatar={chip.avatar && <Avatar sx={{ width: 18, height: 18, fontSize: '0.7rem' }}>{chip.avatar}</Avatar>}
          sx={{
            ml: 1,
            height: 18,
            fontSize: '0.7rem',
            borderRadius: '10px',
            '& .MuiChip-label': {
              px: 1,
              py: 0.1
            },
            '& .MuiChip-root': {
              height: 18,
              transition: theme.transitions.create('box-shadow', {
                duration: theme.transitions.duration.shorter
              }),
              boxShadow: isDark ? 'none' : `0 2px 4px ${alpha(theme.palette.grey[300], 0.2)}`
            }
          }}
        />
      )}
    </ListItemButton>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number,
  selected: PropTypes.bool,
  selectedLevel: PropTypes.number,
  setSelectedItems: PropTypes.func,
  setSelectedLevel: PropTypes.func
};

export default NavItem;
