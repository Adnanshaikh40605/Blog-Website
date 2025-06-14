/**
 * Application configuration settings
 */

// API configuration
const API_CONFIG = {
  // Production API URL (Railway deployment)
  PRODUCTION_API_URL: import.meta.env.VITE_API_BASE_URL || 'https://backend-production-92ae.up.railway.app/api',
  
  // Development API URL (default)
  DEV_API_URL: import.meta.env.VITE_DEV_API_BASE_URL || 'http://localhost:8000/api',
  
  // Alternative development port
  DEV_ALT_PORT_API_URL: import.meta.env.VITE_DEV_API_BASE_URL || 'http://localhost:8000/api',
  
  // Timeout for API requests in milliseconds
  TIMEOUT: 30000,
};

// Check if we should force using the production API
const FORCE_PRODUCTION_API = import.meta.env.VITE_FORCE_PRODUCTION_API === 'true';

// Environment detection
const ENV = {
  isProd: () => {
    // If force production API flag is set, always return true
    if (FORCE_PRODUCTION_API) return true;
    
    const hostname = window.location.hostname;
    return hostname === 'blog-website-sigma-one.vercel.app' || 
           hostname === 'dohblog.vercel.app' || 
           hostname === 'vacation-bna.vercel.app';
  },
  isDev: () => !FORCE_PRODUCTION_API && window.location.hostname === 'localhost',
  isDevAltPort: () => !FORCE_PRODUCTION_API && window.location.hostname === 'localhost' && window.location.port === '3001',
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