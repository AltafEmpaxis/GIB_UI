import { useRef, useState } from 'react';

import { Icon } from '@iconify/react';
import {
  Avatar,
  Box,
  ButtonBase,
  ClickAwayListener,
  Divider,
  List,
  ListItemButton,
  Paper,
  Popper,
  Stack,
  Typography,
  styled
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

// project import
import Transitions from 'components/@extended/Transitions';
import useAuth from 'hooks/useAuth';

// menu items
const MENU_ITEMS = [
  { icon: 'solar:user-id-bold-duotone', label: 'My Profile', route: '/profile' },
  { icon: 'solar:settings-minimalistic-bold-duotone', label: 'Account Settings', route: '/account-settings' },
  { divider: true },
  { icon: 'solar:logout-3-bold-duotone', label: 'Logout', route: '/logout', color: 'error' }
];

// styled components
const ProfileWrapper = styled(Box)({
  marginLeft: 12
});

const AvatarButton = styled(ButtonBase)(({ theme, open }) => ({
  padding: 2,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: open ? alpha(theme.palette.secondary.main, 0.12) : 'transparent',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: alpha(theme.palette.secondary.main, 0.1)
  }
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
  width: 36,
  height: 36,
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  fontSize: '0.9rem',
  fontWeight: 600
}));

const ProfilePopper = styled(Popper)(({ theme }) => ({
  zIndex: 1100,
  width: 280,
  overflow: 'hidden'
}));

const MenuPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius,
  marginTop: 10,
  boxShadow: '0 5px 15px rgba(0,0,0,0.08)'
}));

const ProfileHeader = styled(Box)(({ theme }) => ({
  padding: 16,
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText
}));

const HeaderAvatar = styled(Avatar)(({ theme }) => ({
  width: 50,
  height: 50,
  backgroundColor: alpha(theme.palette.secondary.dark, 0.8),
  border: `2px solid ${theme.palette.common.white}`,
  fontSize: '1.2rem'
}));

const UserDetail = styled(Box)(({ theme }) => ({
  padding: '12px 16px',
  backgroundColor: alpha(theme.palette.secondary.lighter, 0.3)
}));

const DetailItem = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  padding: '6px 0',
  '& .icon': {
    color: theme.palette.primary.main,
    marginRight: 8,
    fontSize: 16
  },
  '& .text': {
    ...theme.typography.body2,
    color: theme.palette.text.primary
  }
}));

const MenuList = styled(List)({
  paddingTop: 6,
  paddingBottom: 6
});

const MenuDivider = styled(Divider)({
  margin: '6px 0'
});

const MenuItem = styled(ListItemButton)(({ theme, selected, color }) => ({
  position: 'relative',
  padding: '8px 16px',
  margin: '2px 6px',
  borderRadius: 8,
  transition: 'all 0.15s ease-in-out',
  '&:hover': {
    backgroundColor: alpha(theme.palette.secondary.main, 0.08)
  },
  ...(selected && {
    backgroundColor: alpha(theme.palette.secondary.main, 0.1),
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: '25%',
      height: '50%',
      width: 3,
      backgroundColor: color ? theme.palette[color].main : theme.palette.secondary.main,
      borderRadius: '0 2px 2px 0'
    }
  })
}));

const MenuIcon = styled(Icon)(({ theme, color, selected }) => ({
  marginRight: 12,
  fontSize: 18,
  color: color ? theme.palette[color].main : selected ? theme.palette.secondary.main : theme.palette.tertiary.main
}));

const UserProfile = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // User info
  const displayName =
    user?.first_name && user?.last_name ? `${user.first_name} ${user.last_name}` : user?.username || 'Guest User';

  const initials =
    user?.first_name && user?.last_name
      ? `${user.first_name[0]}${user.last_name[0]}`.toUpperCase()
      : user?.username?.[0]?.toUpperCase() || 'U';

  const handleMenuClick = (index, route) => {
    if (route === '/logout') {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will be logged out of your account',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: theme.palette.secondary.main,
        cancelButtonColor: theme.palette.error.main,
        confirmButtonText: 'Yes, logout',
        cancelButtonText: 'Cancel'
      }).then(({ isConfirmed }) => {
        if (isConfirmed) logout();
      });
    } else if (route) {
      navigate(route);
      setOpen(false);
    }

    setSelectedItem(index);
  };

  return (
    <ProfileWrapper>
      <AvatarButton ref={anchorRef} aria-label="open profile" onClick={() => setOpen(!open)} open={open}>
        <UserAvatar src={user?.image} alt={displayName}>
          {!user?.image && initials}
        </UserAvatar>
      </AvatarButton>

      <ProfilePopper
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-end"
        transition
        disablePortal
        popperOptions={{ modifiers: [{ name: 'offset', options: { offset: [0, 10] } }] }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" {...TransitionProps}>
            <MenuPaper elevation={2}>
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <div>
                  <ProfileHeader>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <HeaderAvatar src={user?.image} alt={displayName}>
                        {!user?.image && initials}
                      </HeaderAvatar>
                      <Stack spacing={0.5}>
                        <Typography variant="h6" fontWeight={600}>
                          {displayName}
                        </Typography>
                        <Typography variant="caption" sx={{ opacity: 0.9 }}>
                          {user?.role || 'GIB User'}
                        </Typography>
                      </Stack>
                    </Stack>
                  </ProfileHeader>

                  <UserDetail>
                    <DetailItem>
                      <Icon icon="solar:user-circle-bold-duotone" className="icon" />
                      <Typography className="text">{user?.department || 'Investment Banking'}</Typography>
                    </DetailItem>
                    <DetailItem>
                      <Icon icon="solar:clock-circle-bold-duotone" className="icon" />
                      <Typography className="text">{user?.lastLogin || 'Last login: Today'}</Typography>
                    </DetailItem>
                  </UserDetail>

                  <MenuList>
                    {MENU_ITEMS.map((item, index) =>
                      item.divider ? (
                        <MenuDivider key={`divider-${index}`} />
                      ) : (
                        <MenuItem
                          key={item.label}
                          onClick={() => handleMenuClick(index, item.route)}
                          selected={selectedItem === index}
                          color={item.color}
                        >
                          <MenuIcon icon={item.icon} color={item.color} selected={selectedItem === index} />
                          <Typography
                            variant="body2"
                            fontWeight={selectedItem === index ? 600 : 400}
                            color={item.color ? theme.palette[item.color].main : 'inherit'}
                          >
                            {item.label}
                          </Typography>
                        </MenuItem>
                      )
                    )}
                  </MenuList>
                </div>
              </ClickAwayListener>
            </MenuPaper>
          </Transitions>
        )}
      </ProfilePopper>
    </ProfileWrapper>
  );
};

export default UserProfile;
