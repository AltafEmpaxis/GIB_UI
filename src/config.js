// theme constant
export const DRAWER_WIDTH = 260;
export const HEADER_HEIGHT = 70;
export const GRID_SPACING = 1;

// ==============================|| THEME CONFIG  ||============================== //

// Get environment-specific API URL
export const getEnvironmentApiUrl = () => {
  const mode = import.meta.env.MODE;
  const apiUrl = import.meta.env.VITE_API_URL || '';

  // if (!apiUrl) {
  //   console.error(`
  //     API URL not configured for ${mode} environment.
  //     Please ensure you have the correct .env.${mode} file with VITE_API_URL defined.
  //   `);
  //   throw new Error(`API URL not configured for ${mode} environment`);
  // }

  // Log environment info

  console.log('Environment Config:', {
    MODE: mode,
    API_URL: apiUrl
  });

  return apiUrl;
};

export const HOST_API_KEY = getEnvironmentApiUrl();

// // Log final configuration
// console.log('Final Config:', {
//   MODE: import.meta.env.MODE,
//   API_URL: HOST_API_KEY
// });
