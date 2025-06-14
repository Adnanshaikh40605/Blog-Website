import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Grid, Card, CardMedia, CardContent, CardActions, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { postsApi } from '../services/api';
import { API_BASE_URL_DEBUG } from '../services/api';
import ErrorMessage from '../components/ErrorMessage';

const HomePage = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiUrl, setApiUrl] = useState(API_BASE_URL_DEBUG || 'Unknown');

  useEffect(() => {
    const fetchFeaturedPosts = async () => {
      setLoading(true);
      try {
        // Store the API URL being used for display in case of errors
        if (postsApi.getBaseUrl) {
          setApiUrl(postsApi.getBaseUrl());
        }
        
        const response = await postsApi.getAllPosts();
        const posts = response.data.results || response.data;
        
        // Get the most recent 3 posts
        setFeaturedPosts(posts.slice(0, 3));
        setError(null);
      } catch (err) {
        console.error('Error fetching featured posts:', err);
        
        // Provide more detailed error messages
        if (err.code === 'ERR_NETWORK') {
          setError(`Network error: Could not connect to the API server. Please check your internet connection or try again later.`);
        } else if (err.response) {
          setError(`Server error: ${err.response.status} - ${err.response.statusText || 'Unknown error'}`);
        } else {
          setError('Failed to load featured posts. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedPosts();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'white', 
          py: { xs: 8, md: 12 },
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 'bold',
              mb: 3,
              fontSize: { xs: '2.5rem', md: '3.5rem' }
            }}
          >
            Welcome to Vacation BNA Blog
          </Typography>
          
          <Typography 
            variant="h5" 
            component="p" 
            sx={{ 
              mb: 4,
              maxWidth: '800px',
              mx: 'auto',
              opacity: 0.9
            }}
          >
            Discover amazing travel destinations, tips, and stories from around the world
          </Typography>
          
          <Button 
            component={Link}
            to="/blogs"
            variant="contained" 
            color="secondary" 
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{ px: 4, py: 1.5 }}
          >
            Explore Blogs
          </Button>
        </Container>
      </Box>
      
      {/* Featured Posts Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" sx={{ mb: 1 }}>
          Featured Posts
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Check out our most recent travel stories and tips
        </Typography>
        
        <Divider sx={{ mb: 6 }} />
        
        {loading ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography>Loading featured posts...</Typography>
          </Box>
        ) : error ? (
          <ErrorMessage 
            message={error} 
            apiUrl={apiUrl} 
            onRetry={() => window.location.reload()}
          />
        ) : (
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <Grid item xs={12} md={4} key={post.id}>
                <Card 
                  elevation={0} 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    borderRadius: 2,
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)'
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={post.image || `https://source.unsplash.com/random/400x200/?travel,${post.id}`}
                    alt={post.title}
                    sx={{ borderRadius: '8px 8px 0 0' }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {post.excerpt || (post.content ? post.content.substring(0, 120) + '...' : 'No content available')}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button 
                      component={Link} 
                      to={`/blog/${post.slug}`} 
                      size="small" 
                      color="secondary"
                      endIcon={<ArrowForwardIcon />}
                    >
                      Read More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
        
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button 
            component={Link}
            to="/blogs"
            variant="outlined" 
            color="primary" 
            endIcon={<ArrowForwardIcon />}
          >
            View All Posts
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default HomePage; 