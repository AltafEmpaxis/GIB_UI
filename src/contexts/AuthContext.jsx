import { createContext, useReducer, useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

import Loader from 'components/Loader/Loader';
import accountReducer from 'store/accountReducer';
import { login, logout, initialized, authError } from 'store/actions';
import axios, { endpoints } from 'utils/axios';
import Crypto from 'utils/Crypto';

// ==============================|| AUTH CONTEXT & PROVIDER ||============================== //

const AuthContext = createContext(null);

// Initial state
const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

// Helper functions
const setSession = (accessToken, userData = null) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('userData', JSON.stringify(userData));
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userData');
    delete axios.defaults.headers.common.Authorization;
  }
};

const verifyToken = (accessToken) => {
  if (!accessToken) {
    setSession(null);
    return false;
  }
  return true;
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(accountReducer, initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const userData = JSON.parse(localStorage.getItem('userData') || 'null');

        if (accessToken && userData && verifyToken(accessToken)) {
          setSession(accessToken, userData);
          dispatch(login(userData));
        } else {
          setSession(null);
          dispatch(logout());
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        setSession(null);
        dispatch(authError(err.message));
      } finally {
        dispatch(initialized());
      }
    };

    initialize();
  }, []);

  const handleLogin = async (username, password) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.post(endpoints.loginUser, {
        username,
        password
      });

      // Check if response.data exists and is valid
      if (!response.data) {
        throw new Error('Invalid response from server');
      }

      const decryptedData = JSON.parse(Crypto.DecryptText(response.data));

      if (!decryptedData?.accessToken || !decryptedData?.userDetails) {
        throw new Error('Invalid response format');
      }

      const { accessToken, userDetails } = decryptedData;

      setSession(accessToken, userDetails);
      dispatch(login(userDetails));
      navigate('/dashboard', { replace: true });

      return { success: true, data: decryptedData };
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Authentication failed';
      setError(errorMessage);
      dispatch(authError(errorMessage));
      return {
        success: false,
        message: errorMessage
      };
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (userData) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.post(endpoints.registerUser, userData);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.message || 'Registration failed';
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage
      };
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setSession(null);
      dispatch(logout());
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
      setSession(null);
      dispatch(logout());
      navigate('/login', { replace: true });
    }
  };

  const handlePasswordReset = async (resetData) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.post(endpoints.resetUserPassword, resetData);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Password reset error:', error);
      const errorMessage = error.response?.data?.message || 'Password reset failed';
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage
      };
    } finally {
      setIsLoading(false);
    }
  };

  if (!state.isInitialized) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
        resetPassword: handlePasswordReset,
        isLoading,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export { AuthProvider };
export default AuthContext;
