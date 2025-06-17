import { Icon } from '@iconify/react';
import { Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const NavItem = ({ item, level, selected, selectedLevel, setSelectedItems, setSelectedLevel }) => {
  const theme = useTheme();
  const { icon, id, title, url, chip } = item;
  const isDark = theme.palette.mode === 'dark';

  const itemIcon = item?.icon ? <item.icon /> : <Icon icon={icon} width={22} height={22} />;

  const textColor = isDark ? 'grey.400' : 'text.primary';
  const iconSelectedColor = isDark ? 'primary.light' : 'primary.main';
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
        pl: level * 1.75,
        py: 0.75,
        mb: 0.5,
        borderRadius: 1.5,
        backgroundColor: 'transparent',
        color: isSelected ? iconSelectedColor : textColor,
        transition: 'all 0.18s ease-in-out',
        '&:hover': {
          bgcolor: isDark
            ? alpha(theme.palette.primary.main, isSelected ? 0.25 : 0.1)
            : alpha(theme.palette.primary.lighter, isSelected ? 0.7 : 0.4),
          color: isSelected ? iconSelectedColor : theme.palette.primary.main
        },
        '&::after': isSelected
          ? {
              content: '""',
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 4,
              height: '60%',
              borderRadius: '2px 0 0 2px',
              background: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${alpha(theme.palette.primary.main, 0.7)})`,
              boxShadow: isDark
                ? `0 0 5px ${alpha(theme.palette.primary.main, 0.5)}`
                : `0 0 12px ${alpha(theme.palette.primary.light, 0.7)}`
            }
          : {},
        '&.Mui-selected': {
          bgcolor: isDark ? alpha(theme.palette.primary.main, 0.15) : alpha(theme.palette.primary.lighter, 0.5),
          color: iconSelectedColor,
          '&:hover': {
            bgcolor: isDark ? alpha(theme.palette.primary.main, 0.25) : alpha(theme.palette.primary.lighter, 0.7),
            color: iconSelectedColor
          }
        }
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 30,
          color: 'inherit',
          fontSize: isSelected ? '1.125rem' : '1rem',
          transition: 'all 0.18s ease-in-out',
          ...(!item?.icon && {
            borderRadius: 1.5,
            width: 36,
            height: 36,
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
              fontWeight: isSelected ? 600 : 400,
              fontSize: '0.875rem',
              lineHeight: '1.5',
              textAlign: 'left',
              transition: 'all 0.18s ease-in-out',
              ...(isSelected && {
                background: isDark
                  ? `-webkit-linear-gradient(${theme.palette.primary.light}, ${alpha(theme.palette.primary.main, 0.9)})`
                  : `-webkit-linear-gradient(${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
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
          avatar={chip.avatar && <Avatar sx={{ width: 20, height: 20, fontSize: '0.75rem' }}>{chip.avatar}</Avatar>}
          sx={{
            ml: 1,
            height: 20,
            fontSize: '0.75rem',
            '& .MuiChip-label': {
              px: 1.25
            },
            '& .MuiChip-root': {
              height: 20,
              boxShadow: isDark ? 'none' : `0 2px 4px ${alpha(theme.palette.grey[300], 0.35)}`
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
