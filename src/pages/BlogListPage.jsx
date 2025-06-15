import React, { useState, useEffect, useCallback } from 'react';
import { Container, Grid, TextField, Box, Typography, Pagination, MenuItem, Select, FormControl, InputLabel, InputAdornment, CircularProgress, Button, Chip, useMediaQuery, useTheme } from '@mui/material';
import BlogCard from '../components/BlogCard';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import { postsApi } from '../services/api';
import { API_CONFIG } from '../config';
import { formatDate, getRelativeTime } from '../utils/dateUtils';
import ErrorMessage from '../components/ErrorMessage';

const BlogListPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [apiUrl, setApiUrl] = useState('');
  
  // Get theme and media query for responsive design
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  // Add smooth scrolling to the whole page
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  // Add viewport meta tag for proper mobile scaling
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

    // Add custom CSS for blog titles
    const style = document.createElement('style');
    style.textContent = `
      .blog-title {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        word-break: break-word;
        hyphens: auto;
      }
    `;
    document.head.appendChild(style);

    return () => {
      // Restore default viewport settings when component unmounts
      const viewport = document.querySelector('meta[name=viewport]');
      if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
      }
      // Remove custom CSS
      document.head.removeChild(style);
    };
  }, []);

  // Fetch blogs function (extracted to be reusable)
  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Use the search term if available
      const filters = {
        page: page,
        limit: 6,
        published: true
      };
      
      if (searchTerm) {
        filters.title = searchTerm;
      }
      
      // Store the API URL being used for display in case of errors
      setApiUrl(postsApi.getBaseUrl ? postsApi.getBaseUrl() : 'API URL not available');
      
      const response = await postsApi.getAllPosts(filters);
      console.log('API Response:', response.data);
      
      // Handle the API response
      if (response.data && (response.data.results || Array.isArray(response.data))) {
        setBlogs(response.data.results || response.data);
        
        // Set total pages if pagination info is available
        if (response.data.count) {
          setTotalPages(Math.ceil(response.data.count / 6));
        } else if (Array.isArray(response.data)) {
          // If the API doesn't return count, estimate based on the array length
          setTotalPages(Math.ceil(response.data.length / 6));
        }
      } else {
        // If no data or unexpected format, set empty array
        setBlogs([]);
        setTotalPages(1);
      }
      
      setError(null);
    } catch (err) {
      console.error('Error fetching blogs:', err);
      
      // Provide more detailed error messages
      if (err.code === 'ERR_NETWORK') {
        setError(`Network error: Could not connect to the API server. Please check your internet connection or try again later.`);
      } else if (err.response) {
        setError(`Server error: ${err.response.status} - ${err.response.statusText || 'Unknown error'}`);
      } else {
        setError('Failed to load blogs. Please try again later.');
      }
      
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, page]);

  // Fetch blogs on component mount and when search term changes
  useEffect(() => {
    // Debounce search to avoid too many API calls
    const timeoutId = setTimeout(() => {
      fetchBlogs();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, page, fetchBlogs]);

  // Handle page change with smooth scrolling
  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter blogs based on category
  const filteredBlogs = blogs.filter(blog => {
    const matchesCategory = category === 'all' || blog.category === category;
    return matchesCategory;
  });

  // Sort blogs based on selected order
  const sortedBlogs = [...filteredBlogs].sort((a, b) => {
    if (sortOrder === 'newest') {
      return new Date(b.date || b.created_at) - new Date(a.date || a.created_at);
    } else {
      return new Date(a.date || a.created_at) - new Date(b.date || b.created_at);
    }
  });

  // Get unique categories
  const categories = ['all', ...new Set(blogs.map(blog => blog.category).filter(Boolean))];

  // Fallback to mock data only if there's an error or no data
  const shouldUseMockData = error || (blogs.length === 0 && !loading);
  
  // Mock data as fallback
  const mockBlogs = [
    {
      id: 1,
      title: 'Safety First: The Importance of Background Checks for Professional Drivers',
      date: 'Fri Dec 13 2024',
      image: '/images/blog1.jpg',
      category: 'Safety',
      slug: 'safety-first'
    },
    {
      id: 2,
      title: 'Exploring the Nightlife of Your City with a Dedicated Night Driver from Driveronhire.com',
      date: 'Fri Dec 13 2024',
      image: '/images/blog2.jpg',
      category: 'Nightlife',
      slug: 'exploring-nightlife'
    },
    {
      id: 3,
      title: 'Top Destinations from Mumbai for a Relaxing Driver-Driven Experience',
      date: 'Fri Dec 13 2024',
      image: '/images/blog3.jpg',
      category: 'Travel',
      slug: 'top-destinations'
    }
  ];

  // Determine which blogs to display
  const displayBlogs = shouldUseMockData ? mockBlogs : sortedBlogs;

  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        py: { xs: 2, md: 4 },
        px: { xs: 1, sm: 2, md: 3 },
        overflowX: 'hidden',
        width: '100%',
      }}
    >
      <Typography 
        variant="h4" 
        component="h1" 
        align="center" 
        gutterBottom 
        sx={{ 
          fontWeight: 'bold',
          mb: { xs: 2, md: 4 },
          position: 'relative',
          fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
          '&:after': {
            content: '""',
            position: 'absolute',
            bottom: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: { xs: '60px', md: '80px' },
            height: '3px',
            backgroundColor: 'secondary.main',
            borderRadius: '2px',
          }
        }}
      >
        Blog Articles
      </Typography>

      <Grid container spacing={{ xs: 1.5, sm: 2 }} sx={{ mb: { xs: 2, md: 4 } }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            placeholder="Search blogs..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' } }} />
                </InputAdornment>
              ),
              style: { fontSize: isMobile ? '0.9rem' : '1rem' }
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                height: { xs: '42px', md: '46px' },
                transition: 'box-shadow 0.3s ease',
                '&:hover': {
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                },
                '&.Mui-focused': {
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                },
              }
            }}
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <FormControl fullWidth>
            <InputLabel id="category-select-label" sx={{ 
              display: 'flex', 
              alignItems: 'center',
              fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' }
            }}>
              <FilterListIcon sx={{ fontSize: { xs: '0.9rem', md: '1rem' }, mr: 0.5 }} /> 
              {isMobile ? 'Category' : 'All Categories'}
            </InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={category}
              label={isMobile ? 'Category' : 'All Categories'}
              onChange={(e) => setCategory(e.target.value)}
              sx={{
                borderRadius: '8px',
                height: { xs: '42px', md: '46px' },
                fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' },
                '& .MuiSelect-select': {
                  display: 'flex',
                  alignItems: 'center',
                  paddingTop: '8px',
                  paddingBottom: '8px',
                },
              }}
            >
              {categories.map((cat) => (
                <MenuItem 
                  key={cat || 'uncategorized'} 
                  value={cat || 'uncategorized'}
                  sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' } }}
                >
                  {cat === 'all' ? (isMobile ? 'All' : 'All Categories') : (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Chip 
                        size="small" 
                        label={cat || 'Uncategorized'} 
                        color={cat === category ? 'secondary' : 'default'} 
                        sx={{ 
                          mr: 1, 
                          textTransform: 'capitalize',
                          fontSize: { xs: '0.7rem', sm: '0.75rem' },
                          height: { xs: '20px', sm: '24px' }
                        }} 
                      />
                      {isMobile ? '' : (cat || 'Uncategorized')}
                    </Box>
                  )}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} md={3}>
          <FormControl fullWidth>
            <InputLabel id="sort-select-label" sx={{ 
              display: 'flex', 
              alignItems: 'center',
              fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' }
            }}>
              <SortIcon sx={{ fontSize: { xs: '0.9rem', md: '1rem' }, mr: 0.5 }} /> 
              {isMobile ? 'Sort' : 'Sort By'}
            </InputLabel>
            <Select
              labelId="sort-select-label"
              id="sort-select"
              value={sortOrder}
              label={isMobile ? 'Sort' : 'Sort By'}
              onChange={(e) => setSortOrder(e.target.value)}
              sx={{
                borderRadius: '8px',
                height: { xs: '42px', md: '46px' },
                fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' },
                '& .MuiSelect-select': {
                  display: 'flex',
                  alignItems: 'center',
                  paddingTop: '8px',
                  paddingBottom: '8px',
                },
              }}
            >
              <MenuItem value="newest" sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' } }}>
                {isMobile ? 'Newest' : 'Newest First'}
              </MenuItem>
              <MenuItem value="oldest" sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' } }}>
                {isMobile ? 'Oldest' : 'Oldest First'}
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {error && (
        <Box sx={{ mb: 3 }}>
          <ErrorMessage 
            message={error} 
            apiUrl={apiUrl}
            onRetry={fetchBlogs}
          />
        </Box>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: { xs: 4, md: 8 } }}>
          <CircularProgress size={isMobile ? 30 : 40} />
        </Box>
      ) : displayBlogs.length > 0 ? (
        <>
          <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
            {displayBlogs.map((blog) => (
              <Grid item key={blog.id || blog.slug} xs={12} sm={6} md={4}>
                <BlogCard 
                  blog={blog} 
                  onClick={() => {
                    // Smooth scroll to top when clicking a blog
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              </Grid>
            ))}
          </Grid>

          {totalPages > 1 && (
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              mt: { xs: 2, md: 5 }, 
              mb: { xs: 1, md: 3 } 
            }}>
              <Pagination 
                count={totalPages} 
                page={page} 
                onChange={handlePageChange} 
                color="primary"
                size={isMobile ? "small" : "medium"}
                siblingCount={isMobile ? 0 : 1}
                showFirstButton={!isMobile}
                showLastButton={!isMobile}
                sx={{
                  '& .MuiPaginationItem-root': {
                    borderRadius: '8px',
                    minWidth: { xs: '28px', md: '32px' },
                    height: { xs: '28px', md: '32px' },
                    fontSize: { xs: '0.8rem', md: '0.9rem' },
                  },
                  '& .Mui-selected': {
                    fontWeight: 'bold',
                  }
                }}
              />
            </Box>
          )}
        </>
      ) : (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          py: { xs: 4, md: 8 } 
        }}>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            gutterBottom
            sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' } }}
          >
            No blogs found
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            align="center" 
            sx={{ 
              mb: 3,
              fontSize: { xs: '0.85rem', md: '0.9rem' },
              px: 2
            }}
          >
            {searchTerm ? `No results matching "${searchTerm}"` : 'No blogs available at the moment.'}
          </Typography>
          {searchTerm && (
            <Button 
              variant="outlined" 
              color="primary" 
              startIcon={<RefreshIcon sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }} />}
              onClick={() => setSearchTerm('')}
              sx={{ 
                borderRadius: '8px',
                fontSize: { xs: '0.8rem', md: '0.9rem' },
                py: { xs: 0.5, md: 0.75 }
              }}
            >
              Clear Search
            </Button>
          )}
        </Box>
      )}
    </Container>
  );
};

export default BlogListPage;