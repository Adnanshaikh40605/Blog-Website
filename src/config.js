/**
 * Application configuration settings
 */

// API configuration
const API_CONFIG = {
  // Production API URL (Vercel deployment)
  PRODUCTION_API_URL: 'https://backend-production-92ae.up.railway.app/api',
  
  // Development API URL (default)
  DEV_API_URL: 'http://localhost:8000/api',
  
  // Alternative development port
  DEV_ALT_PORT_API_URL: 'http://localhost:8000/api',
  
  // Timeout for API requests in milliseconds
  TIMEOUT: 30000,
};

// Environment detection
const ENV = {
  isProd: () => window.location.hostname === 'blog-website-sigma-one.vercel.app' || window.location.hostname === 'dohblog.vercel.app',
  isDev: () => window.location.hostname === 'localhost',
  isDevAltPort: () => window.location.hostname === 'localhost' && window.location.port === '3001' ,
};

// Auth configuration
const AUTH_CONFIG = {
  TOKEN_KEY: 'authToken',
  REFRESH_TOKEN_KEY: 'refreshToken',
};

export {
  API_CONFIG,
  ENV,
  AUTH_CONFIG,
};

export default {
  API_CONFIG,
  ENV,
  AUTH_CONFIG,
}; 