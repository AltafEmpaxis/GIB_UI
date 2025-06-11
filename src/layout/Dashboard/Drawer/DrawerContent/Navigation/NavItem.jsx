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

  const textColor = theme.palette.mode === 'dark' ? 'grey.400' : 'text.primary';
  const iconSelectedColor = theme.palette.mode === 'dark' ? 'text.primary' : 'primary.main';
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
        mb: 0.25,
        borderRadius: 0.5,
        backgroundColor: 'transparent',
        color: isSelected ? iconSelectedColor : textColor,
        '&:hover': {
          bgcolor: isDark ? alpha(theme.palette.secondary.main, 0.2) : alpha(theme.palette.secondary.main, 0.12),
          color: theme.palette.secondary.main
        },
        '&.Mui-selected': {
          bgcolor: isDark ? alpha(theme.palette.primary.main, 0.2) : alpha(theme.palette.primary.main, 0.12),
          borderRight: `2px solid ${theme.palette.primary.main}`,
          color: iconSelectedColor,
          '&:hover': {
            bgcolor: isDark ? alpha(theme.palette.primary.main, 0.3) : alpha(theme.palette.primary.main, 0.18),
            color: iconSelectedColor
          }
        }
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 28,
          color: 'inherit',
          ...(!item?.icon && {
            borderRadius: 1,
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
              fontWeight: isSelected ? 500 : 400,
              fontSize: '0.875rem',
              lineHeight: '1.5',
              textAlign: 'left',
              transition: 'all .2s ease-in-out'
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
