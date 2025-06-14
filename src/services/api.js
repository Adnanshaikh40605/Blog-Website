import axios from 'axios';
import { API_CONFIG, ENV, AUTH_CONFIG } from '../config';

// Determine the API base URL based on environment
const getApiBaseUrl = () => {
  if (ENV.isProd()) {
    return API_CONFIG.PRODUCTION_API_URL;
  }
  
  if (ENV.isDevAltPort()) {
    return API_CONFIG.DEV_ALT_PORT_API_URL;
  }
  
  return API_CONFIG.DEV_API_URL;
};

const API_BASE_URL = getApiBaseUrl();
console.log('Using API base URL:', API_BASE_URL);

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Enable CORS credentials if needed
  withCredentials: true,
  timeout: API_CONFIG.TIMEOUT,
});

// Add request interceptor to include auth token when available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AUTH_CONFIG.TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle network errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // If we're in development and get a network error, try the production API
    if (error.code === 'ERR_NETWORK' && !ENV.isProd() && API_BASE_URL !== API_CONFIG.PRODUCTION_API_URL) {
      console.warn('Network error with local API, falling back to production API');
      
      // Create a new request to the production API
      const fallbackClient = axios.create({
        baseURL: API_CONFIG.PRODUCTION_API_URL,
        headers: error.config.headers,
        withCredentials: error.config.withCredentials,
        timeout: error.config.timeout,
      });
      
      try {
        // Retry the request with the production API
        return await fallbackClient.request({
          url: error.config.url,
          method: error.config.method,
          data: error.config.data,
          params: error.config.params,
        });
      } catch (fallbackError) {
        return Promise.reject(fallbackError);
      }
    }
    
    return Promise.reject(error);
  }
);

// Export the API base URL for debugging purposes
export const API_BASE_URL_DEBUG = API_BASE_URL;

// Posts API
export const postsApi = {
  // Get the base URL for debugging
  getBaseUrl: () => API_BASE_URL,
  
  // Get all posts with optional filters
  getAllPosts: (filters = {}) => {
    const params = new URLSearchParams();
    
    if (filters.title) {
      params.append('title', filters.title);
    }
    
    if (filters.slug) {
      params.append('slug', filters.slug);
    }
    
    if (filters.page) {
      params.append('page', filters.page);
    }
    
    if (filters.limit) {
      params.append('limit', filters.limit);
    }
    
    if (filters.published !== undefined) {
      params.append('published', filters.published);
    }
    
    return apiClient.get(`/posts/${params.toString() ? `?${params.toString()}` : ''}`);
  },
  
  // Get post by slug
  getPostBySlug: (slug) => {
    return apiClient.get(`/posts/${slug}/`);
  },
  
  // Alternative endpoint for getting post by slug (if supported by backend)
  getPostBySlugAlt: (slug) => {
    return apiClient.get(`/posts/by-slug/${slug}/`);
  },
  
  // Get post details by ID
  getPostById: (id) => {
    return apiClient.get(`/posts/${id}/`);
  },
  
  // Create a new post (requires authentication)
  createPost: (postData) => {
    return apiClient.post('/posts/', postData);
  },
  
  // Update a post (requires authentication)
  updatePost: (id, postData) => {
    return apiClient.put(`/posts/${id}/`, postData);
  },
  
  // Partially update a post (requires authentication)
  patchPost: (id, postData) => {
    return apiClient.patch(`/posts/${id}/`, postData);
  },
  
  // Delete a post (requires authentication)
  deletePost: (id) => {
    return apiClient.delete(`/posts/${id}/`);
  },
  
  // Update post publish status (requires authentication)
  updatePostStatus: (id, published) => {
    return apiClient.patch(`/posts/${id}/`, { published });
  }
};

// Comments API
export const commentsApi = {
  // Get the base URL for debugging
  getBaseUrl: () => API_BASE_URL,
  
  // Get comments for a post
  getCommentsByPostId: (postId) => {
    return apiClient.get(`/comments/?post=${postId}&approved=true&is_trash=false`);
  },
  
  // Get all comments (with optional filters)
  getAllComments: (filters = {}) => {
    const params = new URLSearchParams();
    
    if (filters.post) {
      params.append('post', filters.post);
    }
    
    if (filters.approved !== undefined) {
      params.append('approved', filters.approved);
    }
    
    if (filters.is_trash !== undefined) {
      params.append('is_trash', filters.is_trash);
    }
    
    return apiClient.get(`/comments/${params.toString() ? `?${params.toString()}` : ''}`);
  },
  
  // Submit a new comment
  submitComment: (comment) => {
    return apiClient.post('/comments/', comment);
  },
  
  // Check approved comments
  checkApprovedComments: (postId) => {
    return apiClient.get(`/comments/check-approved/${postId}/`);
  },
  
  // Get comment counts
  getCommentCounts: () => {
    return apiClient.get('/comments/counts/');
  },
  
  // Perform action on a comment (approve, unapprove, trash, restore, delete)
  commentAction: (action, commentId) => {
    return apiClient.post(`/comments/${action}/${commentId}/`);
  }
};

// Authentication API
export const authApi = {
  // Login
  login: (credentials) => {
    return apiClient.post('/auth/login/', credentials);
  },
  
  // Register
  register: (userData) => {
    return apiClient.post('/auth/register/', userData);
  },
  
  // Get user profile
  getProfile: () => {
    return apiClient.get('/profile/');
  }
};

export default {
  posts: postsApi,
  comments: commentsApi,
  auth: authApi
};