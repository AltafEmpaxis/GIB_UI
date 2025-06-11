import { useState, useEffect, useMemo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Box, Tab, Tabs, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Icon } from '@iconify/react';

// project imports
import MainCard from 'components/MainCard';
import useAuth from 'hooks/useAuth';
import ProfileTab from './Profile';
import SecurityTab from './Security';

// Tab mapping constants
const TAB_MAP = { profile: 0, security: 1 };
const REVERSE_TAB_MAP = { 0: 'profile', 1: 'security' };

const AccountSettings = () => {
  const theme = useTheme();
  const { user: currentUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Extract URL parameters directly
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('userId');
  const userEmail = searchParams.get('email');
  const username = searchParams.get('username');
  const tabParam = searchParams.get('tab');

  // Initialize states
  const [errorMessage, setErrorMessage] = useState('');
  const [targetUser, setTargetUser] = useState(null);
  const [tabValue, setTabValue] = useState(tabParam && TAB_MAP[tabParam] !== undefined ? TAB_MAP[tabParam] : 0);

  // Form state with initial values
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: userEmail || '',
    username: username || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Handle form input changes
  const handleInputChange = useCallback((e) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: e.target.type === 'checkbox' ? checked : value
    }));
  }, []);

  // Define tabs with their components
  const tabs = useMemo(
    () => [
      {
        value: 0,
        label: 'Profile',
        icon: <Icon icon="solar:user-circle-bold-duotone" width={22} height={22} />,
        color: theme.palette.primary.main,
        component: (
          <ProfileTab
            formData={formData}
            handleInputChange={handleInputChange}
            currentUser={currentUser}
            targetUser={targetUser}
          />
        )
      },
      {
        value: 1,
        label: 'Security',
        icon: <Icon icon="solar:shield-keyhole-bold-duotone" width={22} height={22} />,
        color: theme.palette.warning.main,
        component: <SecurityTab formData={formData} handleInputChange={handleInputChange} userId={userId} />
      }
    ],
    [theme, formData, handleInputChange, currentUser, targetUser, userId]
  );

  // Get current tab information
  const currentTabInfo = tabs.find((tab) => tab.value === tabValue);

  // Initialize user data and handle URL changes
  useEffect(() => {
    // Get user data from the best available source
    const userData =
      location.state?.userData || (!userId || userId === currentUser?.user_id?.toString() ? currentUser : null);

    // Set user data and update form if available
    if (userData) {
      setTargetUser(userData);
      setFormData({
        firstName: userData.first_name || '',
        lastName: userData.last_name || '',
        email: userData.email || userEmail || '',
        username: userData.username || username || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setErrorMessage('');
    }
    // Handle limited information case
    else if (userEmail || username) {
      setFormData((prev) => ({
        ...prev,
        email: userEmail || '',
        username: username || ''
      }));
      setErrorMessage('Limited user information available. Some features may be restricted.');
    }
    // Handle no data case
    else {
      setErrorMessage('Unable to load user data. Please try again or contact support.');
    }

    // Update tab value from URL or location state if needed
    if (tabParam && TAB_MAP[tabParam] !== undefined) {
      setTabValue(TAB_MAP[tabParam]);
    } else if (location.state?.tabValue !== undefined) {
      setTabValue(location.state.tabValue);
    }
  }, [location, userId, userEmail, username, currentUser]);

  // Handle tab change
  const handleTabChange = (_, newValue) => {
    if (newValue === tabValue) return;

    // Update tab state
    setTabValue(newValue);

    // Update URL with new tab
    const newParams = new URLSearchParams(location.search);
    newParams.set('tab', REVERSE_TAB_MAP[newValue]);
    navigate({ pathname: location.pathname, search: newParams.toString() }, { replace: true });
  };

  return (
    <MainCard title={userId ? `Account Settings: ${formData.username}` : 'Account Settings'}>
      {errorMessage && (
        <Alert severity="info" sx={{ mb: 3 }}>
          {errorMessage}
        </Alert>
      )}

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="account settings tabs"
          TabIndicatorProps={{ style: { backgroundColor: currentTabInfo?.color } }}
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.value}
              label={tab.label}
              icon={tab.icon}
              iconPosition="start"
              id={`tab-${tab.value}`}
              aria-controls={`tabpanel-${tab.value}`}
              sx={{
                fontWeight: 500,
                '&.Mui-selected': { color: tab.color }
              }}
            />
          ))}
        </Tabs>
      </Box>

      <div role="tabpanel" id={`tabpanel-${tabValue}`} aria-labelledby={`tab-${tabValue}`}>
        {currentTabInfo?.component}
      </div>
    </MainCard>
  );
};

export default AccountSettings;
