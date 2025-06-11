/// <reference types="vite/client" />

/**
 * This type definition is for development purposes only.
 * It provides IntelliSense for import.meta.env in JavaScript files.
 * @typedef {Object} ImportMetaEnv
 * @property {string} VITE_API_URL - Base URL for the API
 * Example: VITE_API_URL="http://localhost:3000/api"
 *
 * @property {string} VITE_APP_TITLE - Application title
 * Example: VITE_APP_TITLE="GIB UI"
 *
 * @property {string} VITE_AUTH_API_URL - Authentication API endpoint
 * Example: VITE_AUTH_API_URL="http://localhost:3000/api/auth"
 *
 * @property {string} VITE_API_VERSION - API version
 * Example: VITE_API_VERSION="v1"
 *
 * @property {string} VITE_UPLOAD_API_URL - File upload API endpoint
 * Example: VITE_UPLOAD_API_URL="http://localhost:3000/api/upload"
 *
 * @property {string} VITE_REPORTS_API_URL - Reports API endpoint
 * Example: VITE_REPORTS_API_URL="http://localhost:3000/api/reports"
 *
 * @property {string} VITE_USER_API_URL - User management API endpoint
 * Example: VITE_USER_API_URL="http://localhost:3000/api/users"
 *
 * @property {string} VITE_DATA_API_URL - Data viewing/processing API endpoint
 * Example: VITE_DATA_API_URL="http://localhost:3000/api/data"
 *
 * @property {boolean} VITE_ENABLE_CACHE - Enable/disable API caching
 * Example: VITE_ENABLE_CACHE=true
 *
 * @property {string} VITE_ENVIRONMENT - Current environment (development/production/staging)
 * Example: VITE_ENVIRONMENT="development"
 *
 * @property {number} VITE_CACHE_DURATION - Cache duration in milliseconds
 * Example: VITE_CACHE_DURATION=3600000
 */

/**
 * @typedef {Object} ImportMeta
 * @property {ImportMetaEnv} env - The environment variables
 */

// Usage examples:
// import.meta.env.VITE_API_URL -> "http://localhost:3000/api"
// import.meta.env.VITE_ENVIRONMENT === "production" -> false
// import.meta.env.VITE_ENABLE_CACHE -> true
// import.meta.env.VITE_CACHE_DURATION -> 3600000
