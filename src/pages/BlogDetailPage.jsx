import React, { useState, useEffect, useCallback } from 'react';
import { Container, Typography, Box, TextField, Button, Divider, Grid, Card, Avatar, Paper, CircularProgress, Chip } from '@mui/material';
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
  
  // Form state for comments
  const [commentForm, setCommentForm] = useState({
    name: '',
    email: '',
    content: ''
  });
  
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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Show warning if using fallback data due to API error */}
      {showErrorWarning && (
        <Box sx={{ mb: 3 }}>
          <ErrorMessage 
            message={`${error} Using cached data instead.`} 
            apiUrl={apiUrl}
            onRetry={fetchBlogAndRelated}
            loading={loading}
          />
        </Box>
      )}
      
      {/* Breadcrumb navigation */}
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
        <Link 
          to="/" 
          style={{ textDecoration: 'none', color: '#666', fontSize: '0.85rem' }}
        >
          Home
        </Link>
        <Box component="span" sx={{ mx: 0.5, color: '#666', fontSize: '0.85rem' }}> &gt; </Box>
        <Link 
          to="/blogs" 
          style={{ textDecoration: 'none', color: '#666', fontSize: '0.85rem' }}
        >
          Blogs
        </Link>
        <Box component="span" sx={{ mx: 0.5, color: '#666', fontSize: '0.85rem' }}> &gt; </Box>
        <Box component="span" sx={{ color: '#ff5a5f', fontSize: '0.85rem' }}>
          {blog.title}
        </Box>
      </Box>

      {/* Blog header */}
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom 
        sx={{ 
          fontWeight: 'bold', 
          mb: 3,
          lineHeight: 1.3,
          fontSize: { xs: '1.5rem', md: '1.8rem' }
        }}
      >
        {blog.title}
      </Typography>

      {/* Publication date */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
          Published on: {formatDate(blog.created_at || blog.date)} | 9 min read
        </Typography>
      </Box>

      {/* Featured image */}
      {(blog.featured_image_url || blog.image) && !imageError && (
        <Box 
          component="img" 
          src={blog.featured_image_url || blog.image} 
          alt={blog.title}
          onError={() => setImageError(true)}
          sx={{ 
            width: '100%', 
            height: 'auto',
            borderRadius: '8px',
            mb: 3,
            maxHeight: '400px',
            objectFit: 'cover',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          }} 
        />
      )}

      {/* Reading time and metadata */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="body2" sx={{ fontSize: '0.9rem', color: '#666' }}>
          When the sun sets and the city lights come alive, the possibilities for a vibrant and exciting night out are endless. Whether you're looking to dance the night away at the trendiest club, savor a gourmet dinner, or attend a late-night event, your city's nightlife can be a thrilling experience. However, enjoying the nightlife responsibly, especially if it involves alcohol, is of utmost importance. This is where Driveronhire.com's dedicated service steps in, offering you a responsible and convenient solution to explore the city after dark.
        </Typography>
      </Box>

      {/* Blog content */}
      <Box 
        sx={{ 
          typography: 'body1',
          fontSize: '0.95rem',
          '& h2': { 
            mt: 4, 
            mb: 2, 
            fontWeight: 'bold',
            fontSize: '1.4rem',
            color: '#333',
            position: 'relative',
            '&:after': {
              content: '""',
              position: 'absolute',
              bottom: '-8px',
              left: 0,
              width: '60px',
              height: '3px',
              backgroundColor: 'secondary.main',
              borderRadius: '2px',
            }
          },
          '& h3': { 
            mt: 3, 
            mb: 2,
            fontWeight: 'medium',
            fontSize: '1.2rem',
            color: '#444',
          },
          '& p': { 
            mb: 2,
            lineHeight: 1.7,
            fontSize: '0.95rem',
          },
          '& a': {
            color: 'secondary.main',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            }
          },
          '& ul, & ol': {
            paddingLeft: '1.5rem',
            mb: 2,
          },
          '& li': {
            mb: 1,
          },
        }}
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      {/* Share buttons */}
      <Box sx={{ mt: 4, mb: 4, display: 'flex', alignItems: 'center' }}>
        <Typography variant="body2" sx={{ mr: 2, color: '#666', fontSize: '0.9rem' }}>
          Share:
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button 
            variant="contained" 
            size="small" 
            sx={{ 
              minWidth: 'auto', 
              width: 32, 
              height: 32, 
              p: 0, 
              bgcolor: '#3b5998',
              '&:hover': { bgcolor: '#2d4373' }
            }}
          >
            f
          </Button>
          <Button 
            variant="contained" 
            size="small" 
            sx={{ 
              minWidth: 'auto', 
              width: 32, 
              height: 32, 
              p: 0, 
              bgcolor: '#1da1f2',
              '&:hover': { bgcolor: '#0c85d0' }
            }}
          >
            t
          </Button>
          <Button 
            variant="contained" 
            size="small" 
            sx={{ 
              minWidth: 'auto', 
              width: 32, 
              height: 32, 
              p: 0, 
              bgcolor: '#0077b5',
              '&:hover': { bgcolor: '#005582' }
            }}
          >
            in
          </Button>
        </Box>
      </Box>

      {/* Comments section */}
      <Box sx={{ mt: 5, mb: 4 }}>
        <Typography 
          variant="h5" 
          sx={{ 
            mb: 3, 
            fontWeight: 'medium',
            fontSize: '1.3rem'
          }}
        >
          Comments
        </Typography>

        {/* Show comment error if any */}
        {commentError && (
          <Box sx={{ mb: 3 }}>
            <ErrorMessage 
              message={commentError} 
              onRetry={fetchComments}
              loading={false}
            />
          </Box>
        )}

        {/* Comments list */}
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Box 
              key={comment.id} 
              sx={{ 
                mb: 3, 
                pb: 3,
                borderBottom: '1px solid #f0f0f0',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'medium', fontSize: '0.95rem' }}>
                  {comment.name}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontSize: '0.8rem' }}>
                {formatDate(comment.created_at)}
              </Typography>
              <Typography 
                variant="body1"
                sx={{
                  fontSize: '0.9rem',
                }}
              >
                {comment.content}
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Button 
                  variant="text" 
                  size="small" 
                  sx={{ 
                    p: 0, 
                    color: 'secondary.main', 
                    textTransform: 'none',
                    fontSize: '0.8rem',
                    fontWeight: 'medium',
                  }}
                >
                  Reply
                </Button>
              </Box>
            </Box>
          ))
        ) : (
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: '0.9rem' }}>
            No comments yet. Be the first to comment!
          </Typography>
        )}

        {/* Comment form */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', fontSize: '1.1rem' }}>
            Leave a Comment
          </Typography>
          <form onSubmit={handleCommentSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  label="Your Name"
                  variant="outlined"
                  fullWidth
                  required
                  value={commentForm.name}
                  onChange={handleCommentChange}
                  disabled={commentLoading}
                  InputProps={{
                    sx: { fontSize: '0.9rem' }
                  }}
                  InputLabelProps={{
                    sx: { fontSize: '0.9rem' }
                  }}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  label="Your Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  required
                  value={commentForm.email}
                  onChange={handleCommentChange}
                  disabled={commentLoading}
                  InputProps={{
                    sx: { fontSize: '0.9rem' }
                  }}
                  InputLabelProps={{
                    sx: { fontSize: '0.9rem' }
                  }}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="content"
                  label="Write your comment..."
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  required
                  value={commentForm.content}
                  onChange={handleCommentChange}
                  disabled={commentLoading}
                  InputProps={{
                    sx: { fontSize: '0.9rem' }
                  }}
                  InputLabelProps={{
                    sx: { fontSize: '0.9rem' }
                  }}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  disabled={commentLoading}
                  sx={{ 
                    px: 3,
                    py: 0.8,
                    fontWeight: 'bold',
                    fontSize: '0.9rem'
                  }}
                >
                  {commentLoading ? 'Submitting...' : 'Submit'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>

      {/* Related blogs section */}
      <Box sx={{ mt: 6 }}>
        <Typography 
          variant="h5" 
          sx={{ 
            mb: 3, 
            fontWeight: 'medium',
            fontSize: '1.3rem'
          }}
        >
          Related Blogs
        </Typography>
        <Grid container spacing={3}>
          {relatedBlogs.map((relatedBlog) => (
            <Grid item key={relatedBlog.id} xs={12} md={4}>
              <Card 
                component={Link} 
                to={`/blog/${relatedBlog.slug || relatedBlog.id}`}
                sx={{ 
                  display: 'block', 
                  height: '100%', 
                  textDecoration: 'none',
                  color: 'inherit',
                  borderRadius: 2,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                  }
                }}
              >
                <Box 
                  component="img"
                  src={relatedBlog.featured_image_url || relatedBlog.image || '/images/placeholder.jpg'}
                  alt={relatedBlog.title}
                  sx={{ 
                    width: '100%', 
                    height: 160, 
                    objectFit: 'cover',
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8
                  }}
                />
                <Box sx={{ p: 2 }}>
                  {relatedBlog.category && (
                    <Chip
                      label={relatedBlog.category}
                      size="small"
                      color="secondary"
                      sx={{
                        mb: 1,
                        fontWeight: 500,
                        textTransform: 'capitalize',
                        fontSize: '0.7rem',
                        height: '22px',
                      }}
                    />
                  )}
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      fontWeight: 'bold',
                      mb: 1,
                      fontSize: '0.95rem',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {relatedBlog.title}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Search blogs section */}
      <Box sx={{ mt: 5, mb: 3 }}>
        <Typography 
          variant="h5" 
          sx={{ 
            mb: 2, 
            fontWeight: 'medium',
            fontSize: '1.3rem'
          }}
        >
          Search Blogs
        </Typography>
        <Box 
          component="form" 
          sx={{ 
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <TextField
            placeholder="Search for blogs..."
            variant="outlined"
            fullWidth
            size="small"
            InputProps={{
              sx: { fontSize: '0.9rem', borderRadius: '4px 0 0 4px' }
            }}
          />
          <Button
            variant="contained"
            color="secondary"
            sx={{ 
              height: '40px',
              borderRadius: '0 4px 4px 0',
              px: 2,
              minWidth: 'auto',
            }}
          >
            <Box component="span" sx={{ fontSize: '1.2rem', lineHeight: 1 }}>⌕</Box>
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default BlogDetailPage;