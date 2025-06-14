import React, { useState } from 'react';
import { Container, Grid, TextField, Box, Typography, Pagination, MenuItem, Select, FormControl, InputLabel, InputAdornment } from '@mui/material';
import BlogCard from '../components/BlogCard';
import SearchIcon from '@mui/icons-material/Search';

const blogs = [
  { 
    id: 1, 
    title: 'Safety First: The Importance of Background Checks for Professional Drivers', 
    date: 'Fri Dec 13 2024', 
    image: '/images/blog1.jpg', 
    category: 'Safety' 
  },
  { 
    id: 2, 
    title: 'Exploring the Nightlife of Your City with a Dedicated Night Driver from Driveronhire.com', 
    date: 'Fri Dec 13 2024', 
    image: '/images/blog2.jpg', 
    category: 'Nightlife' 
  },
  { 
    id: 3, 
    title: 'Top Destinations from Mumbai for a Relaxing Driver-Driven Experience', 
    date: 'Fri Dec 13 2024', 
    image: '/images/blog3.jpg', 
    category: 'Travel' 
  },
  { 
    id: 4, 
    title: 'Tips for a Comfortable Journey with a Driver for Outstation Trips', 
    date: 'Fri Dec 12 2024', 
    image: '/images/blog4.jpg', 
    category: 'Travel' 
  },
  { 
    id: 5, 
    title: 'How to Choose the Right Driver Service for Your Corporate Events', 
    date: 'Fri Dec 11 2024', 
    image: '/images/blog5.jpg', 
    category: 'Business' 
  },
  { 
    id: 6, 
    title: 'The Benefits of Hiring a Professional Driver for Airport Transfers', 
    date: 'Fri Dec 10 2024', 
    image: '/images/blog6.jpg', 
    category: 'Travel' 
  },
];

const BlogListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [category, setCategory] = useState('all');

  // Filter blogs based on search term and category
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || blog.category === category;
    return matchesSearch && matchesCategory;
  });

  // Sort blogs based on selected order
  const sortedBlogs = [...filteredBlogs].sort((a, b) => {
    if (sortOrder === 'newest') {
      return new Date(b.date) - new Date(a.date);
    } else {
      return new Date(a.date) - new Date(b.date);
    }
  });

  // Get unique categories
  const categories = ['all', ...new Set(blogs.map(blog => blog.category))];

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
                <MenuItem key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
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

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
        <Pagination 
          count={Math.ceil(sortedBlogs.length / 6)} 
          page={1} 
          color="secondary" 
          size="large"
          shape="rounded"
        />
      </Box>
    </Container>
  );
};

export default BlogListPage;