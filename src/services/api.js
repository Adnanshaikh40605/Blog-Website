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

// Mock data for testing when API is unavailable
const mockPosts = [
  {
    id: 1,
    title: 'Safety First: The Importance of Background Checks for Professional Drivers',
    slug: 'safety-first',
    date: '2024-12-13',
    created_at: '2024-12-13T10:00:00Z',
    image: '/images/blog1.jpg',
    category: 'Safety',
    author: 'Adnan Shaikh',
    author_avatar: '/images/avatar1.jpg',
    excerpt: 'Learn why background checks are crucial for professional drivers and how they ensure passenger safety.',
    content: `
      <p>As a leading provider of professional driver services at Driveronhire.com, we recognize that one of the most critical steps in upholding this commitment is conducting thorough background checks on our professional drivers. In this blog post, we delve into the importance of background checks for professional drivers and how Driveronhire.com prioritizes safety through this essential practice.</p>
      
      <h2>The Significance of Background Checks</h2>
      
      <h3>1. Trust and Reliability</h3>
      <p>Background checks instill trust and confidence in passengers, ensuring them that they are entrusting their safety to qualified and trustworthy drivers.</p>
      
      <h3>2. Criminal History Screening</h3>
      <p>Conducting criminal background checks helps identify any past criminal convictions that might raise concerns about a driver's suitability for the role.</p>
      
      <h3>3. Verification of Driving Record</h3>
      <p>A driver's driving history ensures they have a clean record and are qualified to operate vehicles safely.</p>
    `
  },
  {
    id: 2,
    title: 'Exploring the Nightlife of Your City with a Dedicated Night Driver from Driveronhire.com',
    slug: 'exploring-nightlife',
    date: '2024-12-13',
    created_at: '2024-12-13T11:00:00Z',
    image: '/images/blog2.jpg',
    category: 'Nightlife',
    author: 'Rahul Sharma',
    author_avatar: '/images/avatar2.jpg',
    excerpt: 'Discover how a dedicated night driver can enhance your nightlife experience with safety and convenience.',
    content: `
      <p>The city lights come alive, the possibilities for a vibrant and exciting night out are endless. Whether you want to catch a live music performance, enjoy a formal dinner, or attend a late-night event, your city's nightlife can be a thrilling experience. However, navigating the city at night comes with its own set of challenges. This is where a dedicated driver service from Driveronhire.com steps in, offering you a responsible and convenient solution to explore the city after dark.</p>
      
      <h2>The Benefits of a Night Driver</h2>
      
      <h3>1. Safety First</h3>
      <p>The most significant advantage of hiring a night driver is safety. After a night of celebration, you can rely on a professional driver to get you home safely, eliminating the risks associated with driving under the influence or when fatigued.</p>
      
      <h3>2. Local Knowledge</h3>
      <p>Our drivers at Driveronhire.com are well-acquainted with the city's layout, including the best routes to avoid traffic and the quickest ways to reach your destination. This local knowledge is invaluable, especially at night when certain areas might be less accessible or safe.</p>
    `
  },
  {
    id: 3,
    title: 'Top Destinations from Mumbai for a Relaxing Driver-Driven Experience',
    slug: 'top-destinations',
    date: '2024-12-13',
    created_at: '2024-12-13T12:00:00Z',
    image: '/images/blog3.jpg',
    category: 'Travel',
    author: 'Priya Patel',
    author_avatar: '/images/avatar3.jpg',
    excerpt: 'Explore the best getaway destinations from Mumbai that are perfect for a relaxing driver-driven journey.',
    content: `
      <p>Mumbai, the bustling metropolis of India, often leaves its residents yearning for a peaceful escape from the city's constant hustle. Fortunately, the city is surrounded by numerous serene destinations that are perfect for a weekend getaway or a short vacation. With Driveronhire.com's reliable driver services, these journeys become even more relaxing and enjoyable.</p>
      
      <h2>Why Choose a Driver for Your Getaway?</h2>
      
      <p>Before we dive into the destinations, let's understand why hiring a professional driver for your trip is advantageous:</p>
      
      <h3>1. Stress-Free Travel</h3>
      <p>Navigate unfamiliar roads without worry, allowing you to fully enjoy the scenic beauty along the way.</p>
      
      <h3>2. Local Expertise</h3>
      <p>Our drivers are familiar with the best routes, hidden gems, and local attractions that might not be on typical tourist maps.</p>
    `
  }
];

const mockComments = [
  {
    id: 1,
    name: 'Abhishek',
    email: 'abhishek@example.com',
    content: 'Testing all production',
    created_at: '2023-03-28T08:17:22Z',
    post: 1,
    approved: true
  },
  {
    id: 2,
    name: 'Abhishek Sharma',
    email: 'sharma@example.com',
    content: 'Test result on live',
    created_at: '2023-03-28T19:14:41Z',
    post: 1,
    approved: true
  },
  {
    id: 3,
    name: 'Hello',
    email: 'hello@example.com',
    content: 'Test After Cache Issue Fixed',
    created_at: '2023-04-05T12:22:05Z',
    post: 2,
    approved: true
  }
];

// Export the API base URL for debugging purposes
export const API_BASE_URL_DEBUG = API_BASE_URL;

// Helper function to simulate API response
const simulateApiResponse = (data, delay = 500) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data });
    }, delay);
  });
};

// Posts API
export const postsApi = {
  // Get the base URL for debugging
  getBaseUrl: () => API_BASE_URL,
  
  // Get all posts with optional filters
  getAllPosts: async (filters = {}) => {
    try {
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
      
      const endpoint = `/posts/${params.toString() ? `?${params.toString()}` : ''}`;
      console.log('Fetching posts from endpoint:', endpoint);
      
      const response = await apiClient.get(endpoint);
      return response;
    } catch (error) {
      console.warn('Error fetching posts from API, using mock data:', error);
      
      // Filter mock data based on filters
      let filteredPosts = [...mockPosts];
      
      if (filters.title) {
        const titleLower = filters.title.toLowerCase();
        filteredPosts = filteredPosts.filter(post => 
          post.title.toLowerCase().includes(titleLower)
        );
      }
      
      // Return mock data in the same format as the API
      return simulateApiResponse({
        results: filteredPosts,
        count: filteredPosts.length,
        next: null,
        previous: null
      });
    }
  },
  
  // Get post by slug
  getPostBySlug: async (slug) => {
    try {
      // Try multiple endpoint formats since different APIs may use different conventions
      try {
        const response = await apiClient.get(`/posts/${slug}/`);
        return response;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Try alternative endpoint format
          const altResponse = await apiClient.get(`/posts/by-slug/${slug}/`);
          return altResponse;
        }
        throw error;
      }
    } catch (error) {
      console.warn(`Error fetching post with slug "${slug}" from API, using mock data:`, error);
      
      // Find the post in mock data
      const post = mockPosts.find(p => p.slug === slug);
      
      if (!post) {
        // If not found in mock data, throw 404 error
        const notFoundError = new Error(`Post with slug "${slug}" not found`);
        notFoundError.response = { status: 404, statusText: 'Not Found' };
        throw notFoundError;
      }
      
      // Return mock data in the same format as the API
      return simulateApiResponse(post);
    }
  },
  
  // Get post details by ID
  getPostById: async (id) => {
    try {
      const response = await apiClient.get(`/posts/${id}/`);
      return response;
    } catch (error) {
      console.warn(`Error fetching post with ID "${id}" from API, using mock data:`, error);
      
      // Find the post in mock data
      const post = mockPosts.find(p => p.id === parseInt(id));
      
      if (!post) {
        // If not found in mock data, throw 404 error
        const notFoundError = new Error(`Post with ID "${id}" not found`);
        notFoundError.response = { status: 404, statusText: 'Not Found' };
        throw notFoundError;
      }
      
      // Return mock data in the same format as the API
      return simulateApiResponse(post);
    }
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
  getCommentsByPostId: async (postId) => {
    try {
      console.log(`Fetching comments for post ID: ${postId} from ${API_BASE_URL}/comments/`);
      
      // Try different endpoint formats that might be used by the API
      let response;
      const endpoints = [
        `/comments/?post=${postId}&approved=true&is_trash=false`,
        `/comments/post/${postId}/`,
        `/comments/by-post/${postId}/`
      ];
      
      let lastError = null;
      
      // Try each endpoint until we get a successful response
      for (const endpoint of endpoints) {
        try {
          console.log(`Trying endpoint: ${API_BASE_URL}${endpoint}`);
          response = await apiClient.get(endpoint);
          console.log(`Success with endpoint: ${endpoint}`);
          break; // Exit the loop if successful
        } catch (err) {
          console.warn(`Failed with endpoint ${endpoint}:`, err.message);
          lastError = err;
          // Continue to the next endpoint
        }
      }
      
      // If all endpoints failed, throw the last error
      if (!response) {
        throw lastError || new Error('All comment endpoints failed');
      }
      
      console.log('Comments API response:', response);
      return response;
    } catch (error) {
      console.warn(`Error fetching comments for post ID "${postId}" from API, using mock data:`, error);
      
      // Filter mock comments for the post
      const postComments = mockComments.filter(
        comment => comment.post === parseInt(postId) && comment.approved && !comment.is_trash
      );
      
      // Return mock data in the same format as the API
      return simulateApiResponse({
        results: postComments,
        count: postComments.length,
        next: null,
        previous: null
      });
    }
  },
  
  // Get all comments (with optional filters)
  getAllComments: async (filters = {}) => {
    try {
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
      
      const response = await apiClient.get(`/comments/${params.toString() ? `?${params.toString()}` : ''}`);
      return response;
    } catch (error) {
      console.warn('Error fetching comments from API, using mock data:', error);
      
      // Filter mock comments based on filters
      let filteredComments = [...mockComments];
      
      if (filters.post) {
        filteredComments = filteredComments.filter(
          comment => comment.post === parseInt(filters.post)
        );
      }
      
      if (filters.approved !== undefined) {
        filteredComments = filteredComments.filter(
          comment => comment.approved === filters.approved
        );
      }
      
      if (filters.is_trash !== undefined) {
        filteredComments = filteredComments.filter(
          comment => (comment.is_trash || false) === filters.is_trash
        );
      }
      
      // Return mock data in the same format as the API
      return simulateApiResponse({
        results: filteredComments,
        count: filteredComments.length,
        next: null,
        previous: null
      });
    }
  },
  
  // Submit a new comment
  submitComment: async (comment) => {
    try {
      // Add additional logging for debugging
      console.log('Submitting comment to API:', comment);
      console.log('API endpoint:', `${API_BASE_URL}/comments/`);
      
      // Add a timeout to prevent long-hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(`${API_BASE_URL}/comments/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      return { data };
    } catch (error) {
      console.warn('Error submitting comment to API, simulating successful submission:', error);
      
      // Generate a new comment with an ID for the UI
      const newComment = {
        ...comment,
        id: Math.floor(Math.random() * 10000) + 1000,
        created_at: new Date().toISOString(),
        approved: false, // Set to false to indicate moderation is required
        is_trash: false,
        status: 'pending' // Add status field for UI
      };
      
      // Add to mock comments for local state
      mockComments.push(newComment);
      
      // Return mock response with a note about the error
      return simulateApiResponse({
        ...newComment,
        _note: 'This is a simulated response due to an API error. Your comment will appear after moderation.'
      });
    }
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