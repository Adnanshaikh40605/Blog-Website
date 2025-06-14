import React, { useState, useEffect, useCallback } from 'react';
import { Container, Grid, TextField, Box, Typography, Pagination, MenuItem, Select, FormControl, InputLabel, InputAdornment, CircularProgress, Button, Chip } from '@mui/material';
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

  // Handle page change
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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography 
        variant="h4" 
        component="h1" 
        align="center" 
        gutterBottom 
        sx={{ 
          fontWeight: 'bold',
          mb: 4,
          position: 'relative',
          fontSize: '2rem',
          '&:after': {
            content: '""',
            position: 'absolute',
            bottom: '-12px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80px',
            height: '3px',
            backgroundColor: 'secondary.main',
            borderRadius: '2px',
          }
        }}
      >
        Blog Articles
      </Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
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
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                height: '46px',
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
            <InputLabel id="category-select-label" sx={{ display: 'flex', alignItems: 'center' }}>
              <FilterListIcon sx={{ fontSize: '1rem', mr: 0.5 }} /> All Categories
            </InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={category}
              label="All Categories"
              onChange={(e) => setCategory(e.target.value)}
              sx={{
                borderRadius: '8px',
                height: '46px',
                '& .MuiSelect-select': {
                  display: 'flex',
                  alignItems: 'center',
                  paddingTop: '8px',
                  paddingBottom: '8px',
                },
              }}
            >
              {categories.map((cat) => (
                <MenuItem key={cat || 'uncategorized'} value={cat || 'uncategorized'}>
                  {cat === 'all' ? 'All Categories' : (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Chip 
                        size="small" 
                        label={cat || 'Uncategorized'} 
                        color={cat === category ? 'secondary' : 'default'} 
                        sx={{ mr: 1, textTransform: 'capitalize' }} 
                      />
                      {cat || 'Uncategorized'}
                    </Box>
                  )}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} md={3}>
          <FormControl fullWidth>
            <InputLabel id="sort-select-label" sx={{ display: 'flex', alignItems: 'center' }}>
              <SortIcon sx={{ fontSize: '1rem', mr: 0.5 }} /> Newest First
            </InputLabel>
            <Select
              labelId="sort-select-label"
              id="sort-select"
              value={sortOrder}
              label="Newest First"
              onChange={(e) => setSortOrder(e.target.value)}
              sx={{
                borderRadius: '8px',
                height: '46px',
                '& .MuiSelect-select': {
                  display: 'flex',
                  alignItems: 'center',
                  paddingTop: '8px',
                  paddingBottom: '8px',
                },
              }}
            >
              <MenuItem value="newest">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <SortIcon sx={{ mr: 1, transform: 'rotate(180deg)', fontSize: '1rem' }} />
                  Newest First
                </Box>
              </MenuItem>
              <MenuItem value="oldest">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <SortIcon sx={{ mr: 1, fontSize: '1rem' }} />
                  Oldest First
                </Box>
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {error ? (
        <ErrorMessage 
          message={error} 
          apiUrl={apiUrl}
          onRetry={() => fetchBlogs(page)}
          loading={loading}
          sx={{ mb: 4 }}
        />
      ) : loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress color="secondary" />
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {displayBlogs.map(blog => (
              <Grid item key={blog.id} xs={12} sm={6} md={4}>
                <BlogCard blog={blog} />
              </Grid>
            ))}
          </Grid>

          {displayBlogs.length === 0 && (
            <Box sx={{ 
              textAlign: 'center', 
              py: 8, 
              px: 3,
              border: '1px dashed #e0e0e0',
              borderRadius: '12px',
              backgroundColor: '#f9f9f9'
            }}>
              <Typography variant="h6" sx={{ mb: 2 }}>No blogs found matching your criteria.</Typography>
              <Button 
                variant="outlined" 
                color="secondary" 
                startIcon={<RefreshIcon />}
                onClick={() => {
                  setSearchTerm('');
                  setCategory('all');
                  setSortOrder('newest');
                  setPage(1);
                }}
              >
                Reset Filters
              </Button>
            </Box>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5, mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button 
                variant="outlined" 
                color="secondary" 
                sx={{ 
                  minWidth: 'auto', 
                  px: 1.5, 
                  py: 0.5, 
                  mr: 1,
                  borderColor: '#e0e0e0',
                  color: '#666',
                  '&:hover': {
                    borderColor: '#ff5a5f',
                    color: '#ff5a5f',
                  }
                }}
                disabled={page <= 1}
                onClick={() => handlePageChange(null, page - 1)}
              >
                Previous
              </Button>
              <Button 
                variant="contained" 
                color="secondary" 
                sx={{ 
                  minWidth: 'auto', 
                  px: 1.5, 
                  py: 0.5, 
                  mx: 1,
                  fontWeight: 'bold'
                }}
              >
                Page {page}
              </Button>
              <Button 
                variant="outlined" 
                color="secondary" 
                sx={{ 
                  minWidth: 'auto', 
                  px: 1.5, 
                  py: 0.5, 
                  ml: 1,
                  borderColor: '#e0e0e0',
                  color: '#666',
                  '&:hover': {
                    borderColor: '#ff5a5f',
                    color: '#ff5a5f',
                  }
                }}
                disabled={page >= totalPages}
                onClick={() => handlePageChange(null, page + 1)}
              >
                Next
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Container>
  );
};

export default BlogListPage;