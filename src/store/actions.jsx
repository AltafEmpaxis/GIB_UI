// action - account reducer
export const LOGIN = '@auth/LOGIN';
export const LOGOUT = '@auth/LOGOUT';
export const REGISTER = '@auth/REGISTER';
export const INITIALIZED = '@auth/INITIALIZED';
export const AUTH_ERROR = '@auth/AUTH_ERROR';

// action creators
export const login = (user) => ({
  type: LOGIN,
  payload: { user }
});

export const logout = () => ({
  type: LOGOUT
});

export const register = (user) => ({
  type: REGISTER,
  payload: { user }
});

export const initialized = () => ({
  type: INITIALIZED
});

export const authError = (error) => ({
  type: AUTH_ERROR,
  payload: { error }
});
