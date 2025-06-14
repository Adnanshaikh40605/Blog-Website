import React, { useState, useEffect, useCallback } from 'react';
import { Container, Grid, TextField, Box, Typography, Pagination, MenuItem, Select, FormControl, InputLabel, InputAdornment, CircularProgress, Button } from '@mui/material';
import BlogCard from '../components/BlogCard';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
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
      setBlogs(response.data.results || response.data);
      
      // Set total pages if pagination info is available
      if (response.data.count) {
        setTotalPages(Math.ceil(response.data.count / 6));
      } else if (Array.isArray(response.data)) {
        // If the API doesn't return count, estimate based on the array length
        setTotalPages(Math.ceil(response.data.length / 6));
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

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography 
        variant="h4" 
        component="h1" 
        align="center" 
        gutterBottom 
        sx={{ 
          fontWeight: 'bold',
          mb: 4
        }}
      >
        Blog Articles
      </Typography>

      <Grid container spacing={3} sx={{ mb: 5 }}>
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
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <FormControl fullWidth>
            <InputLabel id="category-select-label">All Categories</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={category}
              label="All Categories"
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <MenuItem key={cat || 'uncategorized'} value={cat || 'uncategorized'}>
                  {cat === 'all' ? 'All Categories' : (cat || 'Uncategorized')}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} md={3}>
          <FormControl fullWidth>
            <InputLabel id="sort-select-label">Newest First</InputLabel>
            <Select
              labelId="sort-select-label"
              id="sort-select"
              value={sortOrder}
              label="Newest First"
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <MenuItem value="newest">Newest First</MenuItem>
              <MenuItem value="oldest">Oldest First</MenuItem>
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
          <Grid container spacing={4}>
            {sortedBlogs.map(blog => (
              <Grid item key={blog.id} xs={12} sm={6} md={4}>
                <BlogCard blog={blog} />
              </Grid>
            ))}
          </Grid>

          {sortedBlogs.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6">No blogs found matching your criteria.</Typography>
            </Box>
          )}

          {sortedBlogs.length > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
              <Pagination 
                count={totalPages} 
                page={page} 
                onChange={handlePageChange}
                color="secondary" 
                size="large"
                shape="rounded"
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default BlogListPage;