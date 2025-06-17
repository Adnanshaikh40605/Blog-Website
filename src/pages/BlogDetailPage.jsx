import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  TextField, 
  Button, 
  Divider, 
  Grid, 
  Card, 
  Avatar, 
  Paper, 
  CircularProgress, 
  Chip, 
  useMediaQuery, 
  useTheme, 
  Breadcrumbs,
  InputAdornment,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Tooltip,
  Stack,
  Link as MuiLink,
  FormHelperText,
  Pagination,
  Collapse
} from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RefreshIcon from '@mui/icons-material/Refresh';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CategoryIcon from '@mui/icons-material/Category';
import PersonIcon from '@mui/icons-material/Person';
import CommentIcon from '@mui/icons-material/Comment';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SearchIcon from '@mui/icons-material/Search';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import UpdateIcon from '@mui/icons-material/Update';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CopyrightIcon from '@mui/icons-material/Copyright';
import ReplyIcon from '@mui/icons-material/Reply';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { postsApi, commentsApi } from '../services/api';
import { formatDate, getRelativeTime } from '../utils/dateUtils';
import ErrorMessage from '../components/ErrorMessage';

// Mock blog data to use as fallback
const mockBlog = {
  id: 2,
  title: 'Exploring the Nightlife of Your City with a Dedicated Night Driver from Driveronhire.com',
  date: 'Fri Dec 13 2024',
  image: '/images/blog2.jpg',
  featured_image: '/images/blog2.jpg',
  author: 'Rahul Sharma',
  author_avatar: '/images/avatar2.jpg',
  category: 'Nightlife',
  slug: 'exploring-nightlife',
  content: `
    <p>The city lights come alive, the possibilities for a vibrant and exciting night out are endless. Whether you want to catch a live music performance, enjoy a formal dinner, or attend a late-night event, your city's nightlife can be a thrilling experience. However, navigating the city at night comes with its own set of challenges. This is where a dedicated driver service from Driveronhire.com steps in, offering you a responsible and convenient solution to explore the city after dark.</p>
    
    <h2>The Benefits of a Night Driver</h2>
    
    <h3>1. Safety First</h3>
    <p>The most significant advantage of hiring a night driver is safety. After a night of celebration, you can rely on a professional driver to get you home safely, eliminating the risks associated with driving under the influence or when fatigued.</p>
    
    <h3>2. Local Knowledge</h3>
    <p>Our drivers at Driveronhire.com are well-acquainted with the city's layout, including the best routes to avoid traffic and the quickest ways to reach your destination. This local knowledge is invaluable, especially at night when certain areas might be less accessible or safe.</p>
    
    <h3>3. Convenience and Comfort</h3>
    <p>With a dedicated night driver, you can enjoy the convenience of door-to-door service. No need to worry about parking, navigating through unfamiliar streets, or waiting for a taxi. Your driver will be ready to pick you up and drop you off exactly where you need to be.</p>
    
    <h3>4. Stress-Free Experience</h3>
    <p>Nightlife is meant to be enjoyable, and having a driver allows you to fully immerse yourself in the experience without the stress of transportation logistics. You can focus on having a good time, knowing that your journey home is taken care of.</p>
    
    <h2>Exploring the Nightlife with Driveronhire.com</h2>
    
    <h3>1. Customized Itinerary</h3>
    <p>Our service allows you to plan a customized nightlife itinerary. Want to visit multiple venues in one night? No problem. Your driver can wait for you or pick you up at predetermined times, making your night out seamless and enjoyable.</p>
    
    <h3>2. Professional and Reliable Service</h3>
    <p>At Driveronhire.com, we pride ourselves on providing professional and reliable service. Our drivers are punctual, courteous, and committed to ensuring your satisfaction and safety.</p>
    
    <h3>3. Affordable Luxury</h3>
    <p>Hiring a night driver from Driveronhire.com is an affordable luxury that enhances your nightlife experience. It's a small investment for the convenience, safety, and peace of mind it brings.</p>
    
    <h2>Conclusion</h2>
    <p>The nightlife of your city is waiting to be explored, and with a dedicated night driver from Driveronhire.com, you can do so in style, comfort, and safety. Whether it's a special occasion, a night out with friends, or simply a desire to experience the city's vibrant after-dark scene, our service is designed to make your night memorable for all the right reasons.</p>
    
    <p>Book your night driver with Driveronhire.com today and transform your nightlife experience into something extraordinary.</p>
  `
};

// Mock related blogs as fallback
const mockRelatedBlogs = [
  {
    id: 1,
    title: 'Safety First: The Importance of Background Checks for Professional Drivers',
    date: 'Fri Dec 13 2024',
    image: '/images/blog1.jpg',
    featured_image: '/images/blog1.jpg',
    category: 'Safety',
    slug: 'safety-first'
  },
  {
    id: 3,
    title: 'Top Destinations from Mumbai for a Relaxing Driver-Driven Experience',
    date: 'Fri Dec 13 2024',
    image: '/images/blog3.jpg',
    featured_image: '/images/blog3.jpg',
    category: 'Travel',
    slug: 'top-destinations'
  },
  {
    id: 4,
    title: 'Tips for a Comfortable Journey with a Driver for Overnight Rides',
    date: 'Fri Dec 13 2024',
    image: '/images/placeholder.jpg',
    featured_image: '/images/placeholder.jpg',
    category: 'Tips',
    slug: 'comfortable-journey'
  }
];

// Mock comments as fallback with added fields for moderation and replies
const mockComments = [
  {
    id: 1,
    name: 'Abhishek',
    created_at: '2023-03-28T08:17:22',
    content: 'Testing all production',
    status: 'approved',
    parent_id: null,
    replies: []
  },
  {
    id: 2,
    name: 'Abhishek Sharma',
    created_at: '2023-03-28T19:14:41',
    content: 'Test result on live',
    status: 'approved',
    parent_id: null,
    replies: [
      {
        id: 4,
        name: 'Admin',
        created_at: '2023-03-29T10:12:33',
        content: 'Thanks for testing and providing feedback!',
        status: 'approved',
        parent_id: 2
      }
    ]
  },
  {
    id: 3,
    name: 'Hello',
    created_at: '2023-04-05T12:22:05',
    content: 'Test After Cache Issue Fixed',
    status: 'approved',
    parent_id: null,
    replies: []
  }
];

// Related blogs (excluding the current one)
const getRelatedBlogs = (blogs, currentSlug) => {
  if (!blogs || !Array.isArray(blogs)) {
    return [];
  }
  return blogs
    .filter(blog => blog.slug !== currentSlug)
    .slice(0, 3);
};

// Helper function to get the correct image URL from blog data
const getImageUrl = (blog) => {
  if (!blog) return null;
  
  // Check all possible image fields in order of preference
  const imageUrl = blog.featured_image || blog.image || blog.featured_image_url || blog.imageUrl;
  
  if (!imageUrl) return null;
  
  // Make sure the URL is absolute
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  } else if (imageUrl.startsWith('/')) {
    return imageUrl;
  } else {
    return '/' + imageUrl;
  }
};

// Helper function to calculate estimated reading time
const calculateReadingTime = (content) => {
  if (!content) return '1 min';
  
  // Strip HTML tags
  const text = content.replace(/<[^>]*>/g, '');
  
  // Count words (roughly)
  const words = text.split(/\s+/).length;
  
  // Average reading speed: 200-250 words per minute
  const minutes = Math.ceil(words / 225);
  
  return `${minutes} min${minutes !== 1 ? 's' : ''}`;
};

const BlogDetailPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);
  const [error, setError] = useState(null);
  const [commentError, setCommentError] = useState(null);
  const [apiUrl, setApiUrl] = useState('');
  const [imageError, setImageError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const contentRef = useRef(null);
  const sidebarRef = useRef(null);
  
  // Get theme and media query for responsive design
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('lg'));
  
  // Form state for comments
  const [commentForm, setCommentForm] = useState({
    name: '',
    email: '',
    content: '',
    parent_id: null
  });
  const [commentFormErrors, setCommentFormErrors] = useState({
    name: '',
    email: '',
    content: ''
  });
  const [isReplying, setIsReplying] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [commentPage, setCommentPage] = useState(1);
  const [commentsPerPage] = useState(5);
  const [expandedReplies, setExpandedReplies] = useState({});
  
  // Add smooth scrolling to the whole page
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);
  
  // Add useEffect to set viewport meta tag for proper mobile scaling
  useEffect(() => {
    // Set viewport meta tag to prevent zooming issues
    const viewport = document.querySelector('meta[name=viewport]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
      document.head.appendChild(meta);
    }

    return () => {
      // Restore default viewport settings when component unmounts
      const viewport = document.querySelector('meta[name=viewport]');
      if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
      }
    };
  }, []);
  
  // Fetch blog post by slug
  const fetchBlogAndRelated = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Store the API URL being used for display in case of errors
      setApiUrl(postsApi.getBaseUrl ? postsApi.getBaseUrl() : 'API URL not available');
      
      // Get the current blog
      const blogResponse = await postsApi.getPostBySlug(slug);
      console.log('Blog response:', blogResponse.data);
      
      if (blogResponse.data) {
        // Ensure the image URL is absolute if it's relative
        let blogData = {...blogResponse.data};
        
        // Debug image paths
        console.log('Original image path:', blogData.image);
        console.log('Featured image path:', blogData.featured_image);
        
        // Use the helper function to ensure we have a proper image URL
        const imageUrl = getImageUrl(blogData);
        if (imageUrl) {
          blogData.image = imageUrl;
        }
        
        console.log('Final blog data with image:', blogData);
        
        setBlog(blogData);
        
        // Get related blogs
        try {
          const allBlogsResponse = await postsApi.getAllPosts();
          console.log('All blogs response:', allBlogsResponse.data);
          
          const allBlogs = allBlogsResponse.data.results || allBlogsResponse.data;
          if (allBlogs && Array.isArray(allBlogs)) {
            setRelatedBlogs(getRelatedBlogs(allBlogs, slug));
          } else {
            setRelatedBlogs(mockRelatedBlogs);
          }
        } catch (relatedError) {
          console.error('Error fetching related blogs:', relatedError);
          setRelatedBlogs(mockRelatedBlogs);
        }
      } else {
        // If no data returned, use mock data
        setBlog(mockBlog);
        setRelatedBlogs(mockRelatedBlogs);
      }
      
      setError(null);
    } catch (err) {
      console.error('Error fetching blog:', err);
      
      // Provide more detailed error messages
      if (err.code === 'ERR_NETWORK') {
        setError(`Network error: Could not connect to the API server. Please check your internet connection or try again later.`);
      } else if (err.response && err.response.status === 404) {
        setError(`Blog post not found. The URL may be incorrect or the post may have been removed.`);
      } else if (err.response) {
        setError(`Server error: ${err.response.status} - ${err.response.statusText || 'Unknown error'}`);
      } else {
        setError('Failed to load blog. Please try again later.');
      }
      
      // Use mock data as fallback when there's an error
      setBlog(mockBlog);
      setRelatedBlogs(mockRelatedBlogs);
    } finally {
      setLoading(false);
    }
  }, [slug]);
  
  useEffect(() => {
    fetchBlogAndRelated();
    // Scroll to top when the component mounts or slug changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [fetchBlogAndRelated]);
  
  // Fetch comments when blog is loaded
  const fetchComments = useCallback(async () => {
    if (!blog) return;
    
    try {
      const response = await commentsApi.getCommentsByPostId(blog.id);
      console.log('Comments response:', response.data);
      
      if (response.data && (response.data.results || Array.isArray(response.data))) {
        setComments(response.data.results || response.data);
      } else {
        // Use mock comments if API doesn't return proper data
        setComments(mockComments);
      }
      
      setCommentError(null);
    } catch (err) {
      console.error('Error fetching comments:', err);
      
      // Provide more detailed error messages
      if (err.code === 'ERR_NETWORK') {
        setCommentError('Network error: Could not load comments. Please check your connection.');
      } else if (err.response) {
        setCommentError(`Error loading comments: ${err.response.status} - ${err.response.statusText || 'Unknown error'}`);
      } else {
        setCommentError('Failed to load comments. Please try again later.');
      }
      
      // Use mock comments as fallback
      setComments(mockComments);
    }
  }, [blog]);
  
  useEffect(() => {
    if (blog) {
      fetchComments();
    }
  }, [blog, fetchComments]);
  
  // Enhanced validation for comment form
  const validateCommentForm = () => {
    let isValid = true;
    const errors = {
      name: '',
      email: '',
      content: ''
    };

    // Name validation
    if (!commentForm.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    } else if (commentForm.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!commentForm.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(commentForm.email.trim())) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Content validation
    if (!commentForm.content.trim()) {
      errors.content = 'Comment cannot be empty';
      isValid = false;
    } else if (commentForm.content.trim().length < 3) {
      errors.content = 'Comment must be at least 3 characters';
      isValid = false;
    } else if (commentForm.content.trim().length > 1000) {
      errors.content = 'Comment cannot exceed 1000 characters';
      isValid = false;
    }

    setCommentFormErrors(errors);
    return isValid;
  };

  // Handle reply to comment
  const handleReplyClick = (commentId, authorName) => {
    setIsReplying(true);
    setReplyingTo({ id: commentId, name: authorName });
    setCommentForm(prev => ({
      ...prev,
      parent_id: commentId,
      content: `@${authorName} `
    }));
    
    // Scroll to comment form
    setTimeout(() => {
      const formElement = document.getElementById('comment-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  // Cancel reply
  const handleCancelReply = () => {
    setIsReplying(false);
    setReplyingTo(null);
    setCommentForm(prev => ({
      ...prev,
      parent_id: null,
      content: ''
    }));
  };

  // Toggle expanded replies
  const toggleReplies = (commentId) => {
    setExpandedReplies(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };

  // Handle comment page change
  const handleCommentPageChange = (event, value) => {
    setCommentPage(value);
    
    // Scroll to top of comments section
    const commentsSection = document.getElementById('comments-section');
    if (commentsSection) {
      commentsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Handle comment form changes
  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setCommentForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field as user types
    if (commentFormErrors[name]) {
      setCommentFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Enhanced comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!blog) return;
    
    // Validate form
    if (!validateCommentForm()) return;
    
    setCommentLoading(true);
    try {
      const commentData = {
        ...commentForm,
        post: blog.id,
        status: 'pending' // Set initial status as pending for moderation
      };
      
      console.log('Submitting comment:', commentData);
      
      const response = await commentsApi.submitComment(commentData);
      console.log('Comment submission response:', response);
      
      // Reset form
      setCommentForm({
        name: '',
        email: '',
        content: '',
        parent_id: null
      });
      setIsReplying(false);
      setReplyingTo(null);
      
      // Show success message
      alert('Your comment has been submitted successfully.');
      
      // Refresh comments
      await fetchComments();
      setCommentError(null);
      setCommentFormErrors({
        name: '',
        email: '',
        content: '',
      });
    } catch (err) {
      console.error('Error submitting comment:', err);
      
      // Provide more detailed error messages
      if (err.code === 'ERR_NETWORK') {
        setCommentError('Network error: Could not submit comment. Please check your connection.');
      } else if (err.response) {
        setCommentError(`Error submitting comment: ${err.response.status} - ${err.response.statusText || 'Unknown error'}`);
      } else {
        setCommentError('Failed to submit comment. Please try again.');
      }
    } finally {
      setCommentLoading(false);
    }
  };

  // Get current comments for pagination
  const getCurrentComments = () => {
    const filteredComments = comments.filter(comment => 
      comment.status === 'approved' && comment.parent_id === null
    );
    
    const indexOfLastComment = commentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    return filteredComments.slice(indexOfFirstComment, indexOfLastComment);
  };

  // Render comment with replies
  const renderComment = (comment, isReply = false) => (
    <Box 
      key={comment.id} 
      sx={{ 
        mb: isReply ? 1 : 2,
        p: { xs: 1.5, sm: 2 },
        borderRadius: '8px',
        bgcolor: isReply ? 'rgba(0, 0, 0, 0.02)' : 'background.default',
        border: isReply ? '1px solid rgba(0, 0, 0, 0.05)' : 'none',
        ml: isReply ? { xs: 2, sm: 4 } : 0,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Avatar 
          sx={{ 
            width: { xs: 32, sm: 36 }, 
            height: { xs: 32, sm: 36 }, 
            mr: 1.5,
            bgcolor: comment.name.toLowerCase().includes('admin') ? 'secondary.main' : 'primary.main',
            fontSize: { xs: '0.85rem', sm: '1rem' },
          }}
        >
          {comment.name ? comment.name.charAt(0).toUpperCase() : 'A'}
        </Avatar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
            {comment.name || 'Anonymous'}
            {comment.name.toLowerCase().includes('admin') && (
              <Chip 
                label="Admin" 
                size="small" 
                color="secondary" 
                sx={{ ml: 1, height: 20, fontSize: '0.7rem' }} 
              />
            )}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
            {getRelativeTime(comment.created_at)}
          </Typography>
        </Box>
        {!isReply && (
          <Button
            size="small"
            startIcon={<ReplyIcon fontSize="small" />}
            onClick={() => handleReplyClick(comment.id, comment.name)}
            sx={{ fontSize: '0.75rem' }}
          >
            Reply
          </Button>
        )}
      </Box>
      <Typography 
        variant="body2" 
        sx={{ 
          pl: { xs: 0, sm: '52px' }, 
          mt: 1,
          fontSize: { xs: '0.85rem', sm: '0.9rem' },
          wordBreak: 'break-word',
          whiteSpace: 'pre-line',
        }}
      >
        {comment.content}
      </Typography>
      
      {/* Display replies if they exist */}
      {!isReply && comment.replies && comment.replies.length > 0 && (
        <>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mt: 1.5, 
              pl: { xs: 0, sm: '52px' },
              cursor: 'pointer',
            }}
            onClick={() => toggleReplies(comment.id)}
          >
            <Typography 
              variant="body2" 
              color="primary" 
              sx={{ 
                fontSize: '0.8rem', 
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {expandedReplies[comment.id] ? (
                <>
                  <ExpandLessIcon fontSize="small" sx={{ mr: 0.5 }} />
                  Hide Replies ({comment.replies.length})
                </>
              ) : (
                <>
                  <ExpandMoreIcon fontSize="small" sx={{ mr: 0.5 }} />
                  Show Replies ({comment.replies.length})
                </>
              )}
            </Typography>
          </Box>
          
          <Collapse in={expandedReplies[comment.id]}>
            <Box sx={{ mt: 1.5 }}>
              {comment.replies.map(reply => renderComment(reply, true))}
            </Box>
          </Collapse>
        </>
      )}
    </Box>
  );

  // Add search functionality
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page or filter content
      window.location.href = `/blogs?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };
  
  // Add sticky sidebar effect
  useEffect(() => {
    if (isMediumScreen || !sidebarRef.current) return;
    
    const handleScroll = () => {
      const sidebar = sidebarRef.current;
      const scrollY = window.scrollY;
      const headerHeight = 100; // Approximate header height
      
      if (scrollY > headerHeight) {
        sidebar.style.position = 'fixed';
        sidebar.style.top = '20px';
      } else {
        sidebar.style.position = 'static';
        sidebar.style.top = 'auto';
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMediumScreen]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress color="secondary" />
      </Container>
    );
  }

  if (error && !blog) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <ErrorMessage 
          message={error || 'Blog not found'} 
          apiUrl={apiUrl}
          onRetry={fetchBlogAndRelated}
          loading={loading}
          sx={{ mb: 4 }}
        />
        
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button 
            component={Link} 
            to="/blogs" 
            variant="outlined" 
            color="secondary"
            startIcon={<ArrowBackIcon />}
          >
            Back to Blogs
          </Button>
        </Box>
      </Container>
    );
  }

  // If we have an error but also have fallback data, show a warning but continue with the fallback data
  const showErrorWarning = error && blog;
  
  // Calculate reading time if we have a blog
  const readingTime = blog ? calculateReadingTime(blog.content) : '1 min';

  return (
    <>
      <Container maxWidth="xl" sx={{ 
        py: { xs: 2, md: 4 },
        px: { xs: 1, sm: 2, md: 3 },
        overflowX: 'hidden',
        width: '100%',
      }}>
        {/* Breadcrumb Navigation */}
        <Breadcrumbs 
          separator={<NavigateNextIcon fontSize="small" />} 
          aria-label="breadcrumb"
          sx={{ 
            mb: { xs: 2, md: 3 },
            '& .MuiBreadcrumbs-ol': {
              flexWrap: 'nowrap',
            },
            '& .MuiBreadcrumbs-li': {
              whiteSpace: 'nowrap',
            }
          }}
        >
          <Link 
            to="/" 
            style={{ 
              display: 'flex', 
              alignItems: 'center',
              color: 'inherit',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              }
            }}
          >
            <HomeIcon sx={{ mr: 0.5, fontSize: '0.9rem' }} />
            Home
          </Link>
          <Link 
            to="/blogs" 
            style={{ 
              color: 'inherit',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              }
            }}
          >
            Blog
          </Link>
          <Typography color="text.primary" sx={{ 
            fontWeight: 500,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: { xs: '150px', sm: '250px', md: '100%' }
          }}>
            {blog?.title || 'Blog Post'}
          </Typography>
        </Breadcrumbs>

        {/* Back button with smooth scroll - Keep this for mobile users */}
        <Box
          component={Link}
          to="/blogs"
          onClick={(e) => {
            e.preventDefault();
            window.history.back();
          }}
          sx={{
            display: { xs: 'inline-flex', md: 'none' }, // Only show on mobile
            alignItems: 'center',
            color: 'text.secondary',
            textDecoration: 'none',
            mb: { xs: 2, md: 3 },
            transition: 'color 0.2s',
            '&:hover': {
              color: 'primary.main',
            },
          }}
        >
          <ArrowBackIcon sx={{ mr: 1, fontSize: '1rem' }} />
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            Back to Blogs
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress color="secondary" />
          </Box>
        ) : error && !blog ? (
          <Box sx={{ mb: 4 }}>
            <ErrorMessage 
              message={error} 
              apiUrl={apiUrl}
              onRetry={fetchBlogAndRelated}
            />
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Button 
                component={Link} 
                to="/blogs" 
                variant="outlined" 
                color="secondary"
                startIcon={<ArrowBackIcon />}
              >
                Back to Blogs
              </Button>
            </Box>
          </Box>
        ) : blog ? (
          <Grid container spacing={4}>
            {/* Main Content Area - 8 columns on large screens, 12 on medium and below */}
            <Grid item xs={12} lg={8}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: { xs: 0, sm: 0, md: 0 }, // Remove padding for image
                  mb: { xs: 3, md: 5 }, 
                  borderRadius: '12px',
                  backgroundColor: 'background.paper',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                  width: '100%',
                  overflowX: 'hidden',
                  overflow: 'hidden', // Ensure image doesn't overflow rounded corners
                }}
              >
                {/* Featured Image - Moved to top of content with full width */}
                {getImageUrl(blog) && (
                  <Box 
                    sx={{ 
                      position: 'relative',
                      width: '100%',
                      paddingTop: { xs: '75%', sm: '56.25%' }, // Higher aspect ratio on mobile
                      overflow: 'hidden',
                      backgroundColor: '#f5f5f5',
                    }}
                  >
                    <img
                      src={imageError ? '/images/placeholder.jpg' : getImageUrl(blog)}
                      alt={blog.title}
                      onError={(e) => {
                        console.error("Image failed to load:", e);
                        setImageError(true);
                      }}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                      }}
                      loading="eager"
                    />
                  </Box>
                )}
                
                <Box sx={{ p: { xs: 1.5, sm: 2, md: 4 } }}> {/* Content container with padding */}
                  <Typography 
                    variant="h1" 
                    component="h1" 
                    sx={{ 
                      fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.25rem', lg: '2.5rem' },
                      fontWeight: 700,
                      lineHeight: 1.2,
                      mb: { xs: 2, md: 3 },
                      mt: { xs: 1, md: 2 }, // Add margin top for spacing from image
                      wordBreak: 'break-word',
                      overflowWrap: 'break-word',
                      hyphens: 'auto',
                      width: '100%',
                      maxWidth: '100%',
                      display: 'block',
                    }}
                  >
                    {blog.title}
                  </Typography>
                  
                  <Grid container spacing={2} alignItems="center" sx={{ mb: { xs: 2, md: 3 } }}>
                    <Grid item xs={12} sm="auto">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                          <CalendarTodayIcon sx={{ fontSize: '0.9rem', color: 'text.secondary', mr: 0.5 }} />
                          <Typography variant="caption" color="text.secondary">
                            {formatDate(blog.date || blog.created_at)}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12} sm="auto" sx={{ ml: { sm: 'auto' } }}>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
                        {blog.category && (
                          <Chip 
                            icon={<CategoryIcon sx={{ fontSize: '1rem' }} />}
                            label={blog.category}
                            size="small"
                            color="secondary"
                            sx={{ borderRadius: '4px' }}
                          />
                        )}
                        <Chip 
                          icon={<CommentIcon sx={{ fontSize: '1rem' }} />}
                          label={`${comments.length} Comments`}
                          size="small"
                          sx={{ borderRadius: '4px' }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                  
                  {/* Blog Content */}
                  <Box 
                    ref={contentRef}
                    className="blog-content"
                    sx={{
                      position: 'relative',
                      width: '100%',
                      overflowX: 'hidden',
                      '& img': {
                        maxWidth: '100%',
                        height: 'auto',
                        borderRadius: '8px',
                        my: 2,
                        display: 'block',
                      },
                      '& h2': {
                        fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
                        fontWeight: 600,
                        mt: 4,
                        mb: 2,
                        wordBreak: 'break-word',
                      },
                      '& h3': {
                        fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' },
                        fontWeight: 600,
                        mt: 3,
                        mb: 2,
                        wordBreak: 'break-word',
                      },
                      '& p': {
                        fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
                        lineHeight: 1.7,
                        mb: 2,
                        wordBreak: 'break-word',
                      },
                      '& ul, & ol': {
                        pl: { xs: 2, sm: 3 },
                        mb: 2,
                        fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
                      },
                      '& li': {
                        mb: 1,
                        wordBreak: 'break-word',
                      },
                      '& a': {
                        color: 'primary.main',
                        textDecoration: 'none',
                        wordBreak: 'break-word',
                        '&:hover': {
                          textDecoration: 'underline',
                        }
                      },
                      '& blockquote': {
                        borderLeft: '4px solid',
                        borderColor: 'secondary.main',
                        pl: { xs: 1, sm: 2 },
                        py: 1,
                        my: 3,
                        fontStyle: 'italic',
                        bgcolor: 'background.default',
                        borderRadius: '4px',
                        fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
                      },
                      '& pre': {
                        bgcolor: 'background.default',
                        p: { xs: 1, sm: 2 },
                        borderRadius: '8px',
                        overflowX: 'auto',
                        fontSize: { xs: '0.9rem', sm: '0.95rem', md: '1rem' },
                      },
                      '& code': {
                        fontFamily: 'monospace',
                        bgcolor: 'background.default',
                        p: { xs: 0.3, sm: 0.5 },
                        borderRadius: '4px',
                        fontSize: { xs: '0.9rem', sm: '0.95rem', md: '1rem' },
                      },
                      '& table': {
                        width: '100%',
                        overflowX: 'auto',
                        display: 'block',
                        borderCollapse: 'collapse',
                        mb: 2,
                        '& th, & td': {
                          border: '1px solid #ddd',
                          padding: { xs: '0.5rem', sm: '0.75rem' },
                          fontSize: { xs: '0.9rem', sm: '0.95rem', md: '1rem' },
                        }
                      }
                    }}
                  >
                    {/* Use key to force re-render when blog changes */}
                    <div key={blog.id || blog.slug} dangerouslySetInnerHTML={{ __html: blog.content }} />
                  </Box>
                </Box>
              </Paper>

              {/* Related Blogs Section */}
              <Box sx={{ mb: { xs: 3, md: 6 } }}>
                <Typography 
                  variant="h2" 
                  component="h2" 
                  sx={{ 
                    fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' }, 
                    fontWeight: 600, 
                    mb: { xs: 1.5, md: 3 } 
                  }}
                >
                  Related Blogs
                </Typography>
                
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 2, sm: 3 },
                    borderRadius: '12px',
                    backgroundColor: 'background.paper',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                  }}
                >
                  {relatedBlogs.map((relatedBlog) => (
                    <Box
                      key={relatedBlog.id || relatedBlog.slug}
                      component={Link}
                      to={`/blog/${relatedBlog.slug}`}
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        textDecoration: 'none',
                        mb: 2,
                        pb: 2,
                        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                        '&:last-child': {
                          mb: 0,
                          pb: 0,
                          borderBottom: 'none',
                        },
                        transition: 'transform 0.2s ease',
                        '&:hover': {
                          transform: 'translateX(5px)',
                        }
                      }}
                    >
                      {/* Blog Image */}
                      <Box
                        sx={{
                          width: { xs: 68, sm: 80 },
                          height: { xs: 68, sm: 80 },
                          borderRadius: '8px',
                          overflow: 'hidden',
                          flexShrink: 0,
                          mr: { xs: 2, sm: 3 },
                          bgcolor: '#f5f5f5',
                        }}
                      >
                        <img
                          src={getImageUrl(relatedBlog) || '/images/placeholder.jpg'}
                          alt={relatedBlog.title}
                          onError={(e) => {
                            console.error("Related blog image failed to load:", e.target.src);
                            e.target.src = '/images/placeholder.jpg';
                          }}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center',
                          }}
                          loading="lazy"
                        />
                      </Box>
                      
                      {/* Blog Content */}
                      <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                        <Typography
                          variant="h6"
                          component="h3"
                          color="text.primary"
                          sx={{
                            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                            fontWeight: 600,
                            mb: 0.5,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                          }}
                        >
                          {relatedBlog.title}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                          {relatedBlog.category && (
                            <Chip
                              label={relatedBlog.category}
                              size="small"
                              color="secondary"
                              sx={{ 
                                height: 20, 
                                fontSize: '0.7rem',
                                borderRadius: '4px',
                                '& .MuiChip-label': { px: 1 }
                              }}
                            />
                          )}
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ fontSize: '0.7rem' }}
                          >
                            {formatDate(relatedBlog.date || relatedBlog.created_at)}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Paper>
              </Box>

              {/* Comments Section */}
              <Paper 
                elevation={0} 
                sx={{ 
                  p: { xs: 2, sm: 3, md: 4 }, 
                  borderRadius: '12px',
                  backgroundColor: 'background.paper',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                  width: '100%',
                  overflowX: 'hidden',
                  mb: 4,
                }}
                id="comments-section"
              >
                <Typography 
                  variant="h2" 
                  component="h2" 
                  sx={{ 
                    fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }, 
                    fontWeight: 700, 
                    mb: { xs: 3, md: 4 } 
                  }}
                >
                  Comments ({comments.filter(c => c.status === 'approved').length})
                </Typography>
                
                {/* Comment Form */}
                <Box component="form" id="comment-form" sx={{ mb: { xs: 3, md: 4 } }}>
                  <Typography variant="h6" sx={{ mb: 2, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                    {isReplying ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                        <span>Replying to {replyingTo?.name}</span>
                        <Button 
                          size="small" 
                          sx={{ ml: 2, fontSize: '0.75rem' }} 
                          onClick={handleCancelReply}
                        >
                          Cancel Reply
                        </Button>
                      </Box>
                    ) : (
                      'Leave a Comment'
                    )}
                  </Typography>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        name="name"
                        label="Your Name"
                        variant="outlined"
                        value={commentForm.name}
                        onChange={handleCommentChange}
                        required
                        error={!!commentFormErrors.name}
                        helperText={commentFormErrors.name}
                        sx={{ mb: { xs: 0, sm: 0 } }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        name="email"
                        label="Your Email"
                        type="email"
                        variant="outlined"
                        value={commentForm.email}
                        onChange={handleCommentChange}
                        required
                        error={!!commentFormErrors.email}
                        helperText={commentFormErrors.email}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="comment-content"
                        name="content"
                        label="Your Comment"
                        multiline
                        rows={4}
                        variant="outlined"
                        value={commentForm.content}
                        onChange={handleCommentChange}
                        required
                        error={!!commentFormErrors.content}
                        helperText={commentFormErrors.content}
                        sx={{ mb: 2 }}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCommentSubmit}
                        disabled={commentLoading}
                        startIcon={commentLoading && <CircularProgress size={16} />}
                        sx={{
                          px: 3,
                          py: 1,
                          borderRadius: '8px',
                          boxShadow: 2,
                          bgcolor: 'secondary.main',
                          '&:hover': {
                            bgcolor: 'secondary.dark',
                          }
                        }}
                      >
                        {commentLoading ? 'Submitting...' : 'Submit Comment'}
                      </Button>
                    </Grid>
                  </Grid>
                  
                  {commentError && (
                    <Box sx={{ mt: 2 }}>
                      <ErrorMessage message={commentError} />
                    </Box>
                  )}
                </Box>
                
                <Divider sx={{ mb: 3 }} />
                
                {/* Comments List */}
                <Box>
                  {comments.length > 0 ? (
                    <>
                      {getCurrentComments().map((comment) => renderComment(comment))}
                      
                      {/* Pagination */}
                      {comments.filter(c => c.status === 'approved' && c.parent_id === null).length > commentsPerPage && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                          <Pagination
                            count={Math.ceil(comments.filter(c => c.status === 'approved' && c.parent_id === null).length / commentsPerPage)}
                            page={commentPage}
                            onChange={handleCommentPageChange}
                            color="secondary"
                            size={isMobile ? "small" : "medium"}
                          />
                        </Box>
                      )}
                    </>
                  ) : (
                    <Box sx={{ textAlign: 'center', py: 3 }}>
                      <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                        No comments yet. Be the first to comment!
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Paper>
            </Grid>
            
            {/* Sidebar - 4 columns on large screens, 12 on medium and below */}
            <Grid item xs={12} lg={4}>
              <Box 
                ref={sidebarRef}
                sx={{ 
                  width: { lg: '100%', xl: '350px' },
                  maxWidth: '100%',
                  position: { xs: 'static', lg: 'sticky' },
                  top: '20px',
                }}
              >
                {/* Search Bar */}
                <Paper
                  elevation={0}
                  component="form"
                  onSubmit={handleSearchSubmit}
                  sx={{
                    p: 2,
                    mb: 3,
                    borderRadius: '12px',
                    backgroundColor: 'background.paper',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <TextField
                    fullWidth
                    placeholder="Search blogs..."
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton type="submit" edge="end">
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                      sx: {
                        borderRadius: '8px',
                      }
                    }}
                  />
                </Paper>
                
                {/* Related Blogs */}
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    mb: 3,
                    borderRadius: '12px',
                    backgroundColor: 'background.paper',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                  }}
                >
                  <Typography 
                    variant="h3" 
                    component="h3" 
                    sx={{ 
                      fontSize: '1.25rem', 
                      fontWeight: 700, 
                      mb: 2,
                      pb: 1,
                      borderBottom: '2px solid',
                      borderColor: 'secondary.main',
                    }}
                  >
                    Related Blogs
                  </Typography>
                  
                  <List sx={{ p: 0 }}>
                    {relatedBlogs.map((relatedBlog) => (
                      <ListItem
                        key={relatedBlog.id || relatedBlog.slug}
                        component={Link}
                        to={`/blog/${relatedBlog.slug}`}
                        onClick={() => {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        sx={{
                          p: 0,
                          mb: 2,
                          '&:last-child': {
                            mb: 0,
                          },
                          textDecoration: 'none',
                          color: 'inherit',
                          display: 'flex',
                          alignItems: 'flex-start',
                          transition: 'transform 0.2s ease',
                          '&:hover': {
                            transform: 'translateX(5px)',
                          }
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar
                            variant="rounded"
                            src={getImageUrl(relatedBlog) || '/images/placeholder.jpg'}
                            alt={relatedBlog.title}
                            sx={{
                              width: 80,
                              height: 60,
                              borderRadius: '8px',
                              mr: 1,
                            }}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography
                              variant="subtitle1"
                              sx={{
                                fontWeight: 600,
                                fontSize: '1rem',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                mb: 0.5,
                              }}
                            >
                              {relatedBlog.title}
                            </Typography>
                          }
                          secondary={
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                              <CalendarTodayIcon sx={{ fontSize: '0.7rem', color: 'text.secondary', mr: 0.5 }} />
                              <Typography variant="caption" color="text.secondary">
                                {formatDate(relatedBlog.date || relatedBlog.created_at)}
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                  
                  <Button
                    component={Link}
                    to="/blogs"
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    sx={{ mt: 2, borderRadius: '8px' }}
                  >
                    View All Blogs
                  </Button>
                </Paper>
                
                {/* Popular Categories */}
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    mb: 3,
                    borderRadius: '12px',
                    backgroundColor: 'background.paper',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                  }}
                >
                  <Typography 
                    variant="h3" 
                    component="h3" 
                    sx={{ 
                      fontSize: '1.25rem', 
                      fontWeight: 700, 
                      mb: 2,
                      pb: 1,
                      borderBottom: '2px solid',
                      borderColor: 'secondary.main',
                    }}
                  >
                    Categories
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {['Safety', 'Travel', 'Nightlife', 'Tips', 'Services'].map((category) => (
                      <Chip
                        key={category}
                        label={category}
                        component={Link}
                        to={`/blogs?category=${category}`}
                        clickable
                        color="secondary"
                        sx={{ 
                          m: 0.5,
                          borderRadius: '4px',
                          '&:hover': {
                            bgcolor: 'secondary.dark',
                          }
                        }}
                      />
                    ))}
                  </Box>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        ) : null}
      </Container>
      
      {/* Footer */}
      <Box 
        component="footer"
        sx={{ 
          bgcolor: 'background.paper',
          py: 4,
          borderTop: '1px solid',
          borderColor: 'divider',
          mt: 4,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* Contact Information */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Contact Us
              </Typography>
              <List dense disablePadding>
                <ListItem disableGutters>
                  <ListItemAvatar sx={{ minWidth: 30 }}>
                    <LocationOnIcon color="secondary" fontSize="small" />
                  </ListItemAvatar>
                  <ListItemText 
                    primary="Midtown Industry Estate 123 Main Street"
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemAvatar sx={{ minWidth: 30 }}>
                    <EmailIcon color="secondary" fontSize="small" />
                  </ListItemAvatar>
                  <ListItemText 
                    primary="info@driveronhire.com"
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemAvatar sx={{ minWidth: 30 }}>
                    <PhoneIcon color="secondary" fontSize="small" />
                  </ListItemAvatar>
                  <ListItemText 
                    primary="+91 123 456 789"
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
              </List>
            </Grid>
            
            {/* Top Listings */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Top Listings
              </Typography>
              <List dense disablePadding>
                {['Local Private Driver', 'Daily Driver Hire', 'Monthly Driver Hire', 'Luxury Private Hire'].map((item) => (
                  <ListItem 
                    key={item} 
                    disableGutters
                    component={Link}
                    to="/"
                    sx={{ 
                      color: 'text.primary',
                      textDecoration: 'none',
                      '&:hover': { color: 'secondary.main' },
                    }}
                  >
                    <ListItemText 
                      primary={item}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
            
            {/* Useful Links */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Useful Links
              </Typography>
              <List dense disablePadding>
                {['Home', 'About Us', 'Services', 'Blogs', 'Contact Us'].map((item) => (
                  <ListItem 
                    key={item} 
                    disableGutters
                    component={Link}
                    to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    sx={{ 
                      color: 'text.primary',
                      textDecoration: 'none',
                      '&:hover': { color: 'secondary.main' },
                    }}
                  >
                    <ListItemText 
                      primary={item}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
            
            {/* Social Media */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Follow Us
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <IconButton color="primary" component="a" href="https://facebook.com" target="_blank">
                  <FacebookIcon />
                </IconButton>
                <IconButton color="primary" component="a" href="https://twitter.com" target="_blank">
                  <TwitterIcon />
                </IconButton>
                <IconButton color="primary" component="a" href="https://instagram.com" target="_blank">
                  <InstagramIcon />
                </IconButton>
                <IconButton color="primary" component="a" href="https://linkedin.com" target="_blank">
                  <LinkedInIcon />
                </IconButton>
              </Box>
              
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Subscribe to our newsletter for the latest updates and offers.
              </Typography>
            </Grid>
          </Grid>
          
          {/* Copyright */}
          <Box 
            sx={{ 
              mt: 4, 
              pt: 2, 
              borderTop: '1px solid', 
              borderColor: 'divider',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CopyrightIcon fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="body2" color="text.secondary" align="center">
              {new Date().getFullYear()} Driver On Hire. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default BlogDetailPage;