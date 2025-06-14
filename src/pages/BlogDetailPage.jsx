import React, { useState, useEffect, useCallback } from 'react';
import { Container, Typography, Box, TextField, Button, Divider, Grid, Card, Avatar, Paper, CircularProgress, Chip, useMediaQuery, useTheme } from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RefreshIcon from '@mui/icons-material/Refresh';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CategoryIcon from '@mui/icons-material/Category';
import PersonIcon from '@mui/icons-material/Person';
import CommentIcon from '@mui/icons-material/Comment';
import { postsApi, commentsApi } from '../services/api';
import { formatDate, getRelativeTime } from '../utils/dateUtils';
import ErrorMessage from '../components/ErrorMessage';

// Mock blog data to use as fallback
const mockBlog = {
  id: 2,
  title: 'Exploring the Nightlife of Your City with a Dedicated Night Driver from Driveronhire.com',
  date: 'Fri Dec 13 2024',
  image: '/images/blog2.jpg',
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
    category: 'Safety',
    slug: 'safety-first'
  },
  {
    id: 3,
    title: 'Top Destinations from Mumbai for a Relaxing Driver-Driven Experience',
    date: 'Fri Dec 13 2024',
    image: '/images/blog3.jpg',
    category: 'Travel',
    slug: 'top-destinations'
  },
  {
    id: 4,
    title: 'Tips for a Comfortable Journey with a Driver for Overnight Rides',
    date: 'Fri Dec 13 2024',
    image: '/images/placeholder.jpg',
    category: 'Tips',
    slug: 'comfortable-journey'
  }
];

// Mock comments as fallback
const mockComments = [
  {
    id: 1,
    name: 'Abhishek',
    created_at: '2023-03-28T08:17:22',
    content: 'Testing all production'
  },
  {
    id: 2,
    name: 'Abhishek Sharma',
    created_at: '2023-03-28T19:14:41',
    content: 'Test result on live'
  },
  {
    id: 3,
    name: 'Hello',
    created_at: '2023-04-05T12:22:05',
    content: 'Test After Cache Issue Fixed'
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
  
  // Get theme and media query for responsive design
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  // Form state for comments
  const [commentForm, setCommentForm] = useState({
    name: '',
    email: '',
    content: ''
  });
  
  // Add smooth scrolling to the whole page
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = '';
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
        setBlog(blogResponse.data);
        
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
  
  // Handle comment form changes
  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setCommentForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!blog) return;
    
    setCommentLoading(true);
    try {
      const commentData = {
        ...commentForm,
        post: blog.id
      };
      
      console.log('Submitting comment:', commentData);
      
      const response = await commentsApi.submitComment(commentData);
      console.log('Comment submission response:', response);
      
      // Reset form
      setCommentForm({
        name: '',
        email: '',
        content: ''
      });
      
      // Refresh comments
      await fetchComments();
      setCommentError(null);
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

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
      {/* Back button with smooth scroll */}
      <Box
        component={Link}
        to="/blogs"
        onClick={(e) => {
          e.preventDefault();
          window.history.back();
        }}
        sx={{
          display: 'inline-flex',
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
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box sx={{ mb: 4 }}>
          <ErrorMessage 
            message={error} 
            apiUrl={apiUrl}
            onRetry={fetchBlogAndRelated}
          />
        </Box>
      ) : blog ? (
        <>
          {/* Blog Header */}
          <Paper 
            elevation={0} 
            sx={{ 
              p: { xs: 2, md: 4 }, 
              mb: { xs: 3, md: 5 }, 
              borderRadius: '12px',
              backgroundColor: 'background.paper',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            }}
          >
            <Typography 
              variant="h1" 
              component="h1" 
              sx={{ 
                fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' },
                fontWeight: 700,
                lineHeight: 1.2,
                mb: { xs: 2, md: 3 },
                wordBreak: 'break-word',
              }}
            >
              {blog.title}
            </Typography>
            
            <Grid container spacing={2} alignItems="center" sx={{ mb: { xs: 2, md: 3 } }}>
              <Grid item xs={12} sm="auto">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar 
                    src={blog.author_avatar || '/images/avatar-placeholder.jpg'} 
                    alt={blog.author || 'Author'}
                    sx={{ width: 40, height: 40, mr: 1.5 }}
                  />
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <PersonIcon sx={{ fontSize: '0.9rem', color: 'text.secondary', mr: 0.5 }} />
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {blog.author || 'Anonymous'}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                      <CalendarTodayIcon sx={{ fontSize: '0.9rem', color: 'text.secondary', mr: 0.5 }} />
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(blog.date || blog.created_at)}
                      </Typography>
                    </Box>
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
            
            {blog.image && (
              <Box 
                sx={{ 
                  position: 'relative',
                  width: '100%',
                  height: { xs: '200px', sm: '300px', md: '400px' },
                  mb: { xs: 2, md: 3 },
                  borderRadius: '8px',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={imageError ? '/images/placeholder.jpg' : blog.image}
                  alt={blog.title}
                  onError={() => setImageError(true)}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '8px',
                  }}
                />
              </Box>
            )}
            
            {/* Blog Content */}
            <Box 
              className="blog-content"
              sx={{
                '& img': {
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  my: 2,
                },
                '& h2': {
                  fontSize: { xs: '1.5rem', md: '1.75rem' },
                  fontWeight: 600,
                  mt: 4,
                  mb: 2,
                },
                '& h3': {
                  fontSize: { xs: '1.25rem', md: '1.5rem' },
                  fontWeight: 600,
                  mt: 3,
                  mb: 2,
                },
                '& p': {
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  lineHeight: 1.7,
                  mb: 2,
                },
                '& ul, & ol': {
                  pl: 3,
                  mb: 2,
                },
                '& li': {
                  mb: 1,
                },
                '& a': {
                  color: 'primary.main',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  }
                },
                '& blockquote': {
                  borderLeft: '4px solid',
                  borderColor: 'secondary.main',
                  pl: 2,
                  py: 1,
                  my: 3,
                  fontStyle: 'italic',
                  bgcolor: 'background.default',
                  borderRadius: '4px',
                },
                '& pre': {
                  bgcolor: 'background.default',
                  p: 2,
                  borderRadius: '8px',
                  overflowX: 'auto',
                },
                '& code': {
                  fontFamily: 'monospace',
                  bgcolor: 'background.default',
                  p: 0.5,
                  borderRadius: '4px',
                }
              }}
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </Paper>

          {/* Related Blogs Section */}
          <Box sx={{ mb: { xs: 4, md: 6 } }}>
            <Typography 
              variant="h2" 
              component="h2" 
              sx={{ 
                fontSize: { xs: '1.5rem', md: '1.75rem' }, 
                fontWeight: 600, 
                mb: { xs: 2, md: 3 } 
              }}
            >
              Related Articles
            </Typography>
            
            <Grid container spacing={{ xs: 2, md: 3 }}>
              {relatedBlogs.map((relatedBlog) => (
                <Grid item xs={12} sm={6} md={4} key={relatedBlog.id || relatedBlog.slug}>
                  <Card 
                    component={Link} 
                    to={`/blog/${relatedBlog.slug}`} 
                    onClick={() => {
                      // Scroll to top when clicking a related blog
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    sx={{ 
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      textDecoration: 'none',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                      }
                    }}
                  >
                    <Box 
                      sx={{ 
                        position: 'relative',
                        paddingTop: '60%', // 16:9 aspect ratio
                        overflow: 'hidden',
                      }}
                    >
                      <img
                        src={relatedBlog.image || '/images/placeholder.jpg'}
                        alt={relatedBlog.title}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </Box>
                    <Box sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      {relatedBlog.category && (
                        <Chip 
                          label={relatedBlog.category} 
                          size="small" 
                          color="secondary"
                          sx={{ alignSelf: 'flex-start', mb: 1, borderRadius: '4px' }}
                        />
                      )}
                      <Typography 
                        variant="h6" 
                        component="h3" 
                        color="text.primary"
                        sx={{ 
                          fontSize: '1rem', 
                          fontWeight: 600,
                          mb: 1,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {relatedBlog.title}
                      </Typography>
                      <Typography 
                        variant="caption" 
                        color="text.secondary"
                        sx={{ mt: 'auto', pt: 1 }}
                      >
                        {formatDate(relatedBlog.date || relatedBlog.created_at)}
                      </Typography>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Comments Section */}
          <Paper 
            elevation={0} 
            sx={{ 
              p: { xs: 2, md: 4 }, 
              borderRadius: '12px',
              backgroundColor: 'background.paper',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            }}
          >
            <Typography 
              variant="h2" 
              component="h2" 
              sx={{ 
                fontSize: { xs: '1.5rem', md: '1.75rem' }, 
                fontWeight: 600, 
                mb: { xs: 2, md: 3 } 
              }}
            >
              Comments ({comments.length})
            </Typography>
            
            {/* Comment Form */}
            <Box component="form" sx={{ mb: { xs: 3, md: 4 } }}>
              <Typography variant="h6" sx={{ mb: 2, fontSize: '1.1rem' }}>
                Leave a Comment
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
                    sx={{ mb: { xs: 0, sm: 2 } }}
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
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="content"
                    label="Your Comment"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={commentForm.content}
                    onChange={handleCommentChange}
                    required
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCommentSubmit}
                    disabled={commentLoading}
                    startIcon={commentLoading && <CircularProgress size={20} />}
                    sx={{
                      px: 3,
                      py: 1,
                      borderRadius: '8px',
                      boxShadow: 2,
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
            
            <Divider sx={{ mb: { xs: 3, md: 4 } }} />
            
            {/* Comments List */}
            <Box>
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <Box 
                    key={comment.id} 
                    sx={{ 
                      mb: 3,
                      p: 2,
                      borderRadius: '8px',
                      bgcolor: 'background.default',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Avatar 
                        sx={{ 
                          width: 36, 
                          height: 36, 
                          mr: 1.5,
                          bgcolor: 'primary.main',
                        }}
                      >
                        {comment.name ? comment.name.charAt(0).toUpperCase() : 'A'}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                          {comment.name || 'Anonymous'}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {getRelativeTime(comment.created_at)}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" sx={{ pl: { xs: 0, sm: '52px' }, mt: 1 }}>
                      {comment.content}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    No comments yet. Be the first to comment!
                  </Typography>
                </Box>
              )}
            </Box>
          </Paper>
        </>
      ) : null}
    </Container>
  );
};

export default BlogDetailPage;