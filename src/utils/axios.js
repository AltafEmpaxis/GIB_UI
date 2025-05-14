import axios from 'axios';
import { HOST_API_KEY } from 'config';

//==============================******||Axios-Instance||******==============================
/**
 * Custom Axios instance with base configuration and interceptors
 * @type {import('axios').AxiosInstance}
 */
const axiosInstance = axios.create({
  baseURL: HOST_API_KEY,
  // timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
  }
});
//==============================******||HTTP-STATUS-CODES||******==============================
/**
 * HTTP status code messages for common error scenarios
 * @type {Object.<number, string>}
 */
const HTTP_STATUS_MESSAGES = {
  // Auth errors
  401: '(401) - Your session has expired. Please log in again to continue. ',
  403: '(403) - Your session has been invalidated or you have been logged out due to another login using your credentials. ',

  // Connection errors
  0: '(0) - Unable to connect to the server. Please check your internet connection. ',
  408: '(408) - The request timed out. Please check your internet connection.',

  // Client errors
  400: '(400) - Invalid request format. Please check your input.',
  404: '(404) - The requested resource could not be found.(check your url)',
  429: '(429) - Too many requests. Please wait a moment before trying again.',

  // Server errors
  500: '(500) - An internal server error occurred. Our team has been notified. ',
  502: '(502) - The server is temporarily unavailable. Please try again in a few minutes.',
  503: '(503) - The service is currently unavailable. Please try again later.',
  504: '(504) - The server request timed out. Please try again.'
};
//==============================******||Request-Interceptor||******==============================
/**
 * Request interceptor for handling authentication and request configuration
 * @param {import('axios').AxiosRequestConfig} config - The request configuration
 * @returns {import('axios').AxiosRequestConfig} Modified request configuration
 */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);
//==============================******||Response-Interceptor||******==============================
/**
 * Response interceptor for handling API responses and errors
 * @param {import('axios').AxiosResponse} response - The API response
 * @returns {import('axios').AxiosResponse} The response or error
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Response error:', error);

    const { response, config } = error;
    const status = response?.status || 0;

    // Get error message from predefined messages or response
    const errorMessage = HTTP_STATUS_MESSAGES[status] || response?.data?.message || error.message;

    // Determine error type and create event
    const isAuthError = status === 401 || status === 403;
    const eventName = isAuthError ? 'auth:error' : 'api:error';

    /**
     * @type {CustomEvent}
     */
    const errorEvent = new CustomEvent(eventName, {
      detail: {
        status,
        statusText: response?.statusText,
        message: errorMessage,
        originalError: error,
        config: config,
        timestamp: new Date().toISOString()
      }
    });

    // Log error details

    console.log('Dispatching error event:', {
      eventName,
      status,
      statusText: response?.statusText,
      message: errorMessage,
      url: config?.url,
      timestamp: new Date().toISOString()
    });

    window.dispatchEvent(errorEvent);
    return Promise.reject(error);
  }
);
//==============================******||End-Point||******==============================
/**
 * API endpoints configuration object
 * @type {Object.<string, string>}
 */
export const endpoints = {
  // Authentication
  registerUser: '/api/User/create',
  loginUser: '/api/User/login',
  resetUserPassword: '/api/User/resetPassword',
  getUser: '/api/User/getUser',
  updateUser: '/api/User/update',
  deleteUser: '/api/User/delete',
  updateUserStatus: '/api/User/updateStatus',

  // Normalise File
  uploadNormaliseFile: '/api/NormaliseFile/UploadFiles/upload',
  generateReconTable: '/api/NormaliseFile/GenerateReconTable/generate-recon',
  getReconciliationTypes: '/api/NormaliseFile/GetReconciliationTypes/recon-types',

  // Upload File
  uploadExcelFile: '/api/UploadFile/UploadExcelFile',
  calculateExcelData: '/api/UploadFile/Calculate',
  getRecordDetails: '/api/UploadFile/ReadRecord',
  resetAllData: '/api/UploadFile/ResetAll',
  verifyFile: '/api/UploadFile/Filecheck',
  getAllData: '/api/UploadFile/FetchAllData',
  fetchDateDetails: '/api/UploadFile/DateFetch',
  getHistoryData: '/api/UploadFile/HistoryData',
  logErrorDetails: '/api/Auth/ErrorLogging',
  fetchLookupDetails: '/api/UploadFile/LookupFetch',
  updateLookup: '/api/UploadFile/LookupEdit',
  deleteLookupEntry: '/api/UploadFile/Lookupdlt',
  getAllLookups: '/api/UploadFile/Alllookup',

  // Dashboard
  getReconCounts: '/api/Dashboard/GetReconCounts/recon-counts',

  // Lookup Cash Mapping 1
  getLookupCashMapping1: '/api/LookupCashMapping1',
  createLookupCashMapping1: '/api/LookupCashMapping1',
  updateLookupCashMapping1: '/api/LookupCashMapping1',
  deleteLookupCashMapping1: '/api/LookupCashMapping1',

  // Lookup Cash Mapping 2
  getLookupCashMapping2: '/api/LookupCashMapping2/GetLookupCashMapping2s',
  createLookupCashMapping2: '/api/LookupCashMapping2/PostLookupCashMapping2',
  updateLookupCashMapping2: '/api/LookupCashMapping2/PutLookupCashMapping2',
  deleteLookupCashMapping2: '/api/LookupCashMapping2/DeleteLookupCashMapping2',

  // Lookup Investments
  lookupInvestments: '/api/LookupInvestments',

  // Lookup Portfolios
  lookupPortfolios: '/api/LookupPortfolios'
};
//==============================******||Fetch-Data||******==============================
/**
 * Fetches data from the specified endpoint with optional configuration
 * @async
 * @param {Array|string} args - URL and config array or just URL string
 * @param {string} args[0] - The API endpoint URL
 * @param {import('axios').AxiosRequestConfig} [args[1]] - Optional Axios request configuration
 * @returns {Promise<any>} The response data
 * @throws {Error} If the request fails
 * @example
 * // Simple fetch
 * const data = await fetchData('/api/endpoint');
 *
 * // Fetch with configuration
 * const data = await fetchData(['/api/endpoint', { params: { page: 1 } }]);
 */
export const fetchData = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];
    const res = await axiosInstance.get(url, { ...config });
    return res.data;
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw error;
  }
};
//==============================******||Create-Record||******==============================
/**
 * Creates a new record at the specified endpoint
 * @async
 * @param {string} endpoint - The API endpoint
 * @param {Object} data - The data to create
 * @returns {Promise<any>} The created record
 * @throws {Error} If the creation fails
 * @example
 * const newRecord = await createRecord('/api/endpoint', { name: 'John' });
 */
export const createRecord = async (endpoint, data) => {
  try {
    const response = await axiosInstance.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Failed to create record:', error);
    throw error;
  }
};
//==============================******||Update-Record||******==============================
/**
 * Updates an existing record at the specified endpoint
 * @async
 * @param {string} endpoint - The API endpoint
 * @param {string|number} id - The record ID
 * @param {Object} data - The data to update
 * @returns {Promise<any>} The updated record
 * @throws {Error} If the update fails
 * @example
 * const updatedRecord = await updateRecord('/api/endpoint', 123, { name: 'John' });
 */
export const updateRecord = async (endpoint, id, data) => {
  try {
    const response = await axiosInstance.put(`${endpoint}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Failed to update record:', error);
    throw error;
  }
};
//==============================******||Delete-Record||******==============================
/**
 * Deletes a record at the specified endpoint
 * @async
 * @param {string} endpoint - The API endpoint
 * @param {string|number} id - The record ID to delete
 * @returns {Promise<any>} The response data
 * @throws {Error} If the deletion fails
 * @example
 * await deleteRecord('/api/endpoint', 123);
 */
export const deleteRecord = async (endpoint, id) => {
  try {
    const response = await axiosInstance.delete(`${endpoint}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete record:', error);
    throw error;
  }
};

export default axiosInstance;
