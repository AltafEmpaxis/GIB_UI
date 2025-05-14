// types
import { LOGIN, LOGOUT, REGISTER, INITIALIZED, AUTH_ERROR } from './actions';

// initial state
const initialState = {
  isLoggedIn: false,
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  error: null
};

// ==============================|| ACCOUNT REDUCER ||============================== //

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZED:
      return {
        ...state,
        isInitialized: true,
        error: null
      };

    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        isAuthenticated: true,
        isInitialized: true,
        user: action.payload.user,
        error: null
      };

    case REGISTER:
      return {
        ...state,
        isLoggedIn: true,
        isAuthenticated: true,
        isInitialized: true,
        user: action.payload.user,
        error: null
      };

    case LOGOUT:
      return {
        ...initialState,
        isInitialized: true // Keep initialized state on logout
      };

    case AUTH_ERROR:
      return {
        ...state,
        error: action.payload.error,
        isLoggedIn: false,
        isAuthenticated: false,
        user: null
      };

    default:
      return state;
  }
};

export { initialState };
export default accountReducer;
