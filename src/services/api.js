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

// Posts API
export const postsApi = {
  // Get all posts with optional filters
  getAllPosts: (filters = {}) => {
    const params = new URLSearchParams();
    
    if (filters.title) {
      params.append('title', filters.title);
    }
    
    if (filters.slug) {
      params.append('slug', filters.slug);
    }
    
    return apiClient.get(`/posts/${params.toString() ? `?${params.toString()}` : ''}`);
  },
  
  // Get post by slug
  getPostBySlug: (slug) => {
    return apiClient.get(`/posts/${slug}/`);
  },
  
  // Get post details by ID
  getPostById: (id) => {
    return apiClient.get(`/posts/${id}/`);
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
  // Get comments for a post
  getCommentsByPostId: (postId) => {
    return apiClient.get(`/comments/?post=${postId}`);
  },
  
  // Submit a new comment
  submitComment: (comment) => {
    return apiClient.post('/comments/', comment);
  },
  
  // Check approved comments
  checkApprovedComments: (postId) => {
    return apiClient.get(`/comments/check-approved/${postId}/`);
  }
};

export default {
  posts: postsApi,
  comments: commentsApi
}; 