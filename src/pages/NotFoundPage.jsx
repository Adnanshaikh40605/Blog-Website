import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const NotFoundPage = () => {
  return (
    <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
      <Typography variant="h1" component="h1" sx={{ fontSize: '8rem', fontWeight: 'bold', color: 'secondary.main' }}>
        404
      </Typography>
      
      <Typography variant="h4" component="h2" sx={{ mb: 4 }}>
        Page Not Found
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 6, maxWidth: '600px', mx: 'auto' }}>
        The page you are looking for might have been removed, had its name changed, 
        or is temporarily unavailable.
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button 
          component={Link} 
          to="/" 
          variant="contained" 
          color="primary"
          startIcon={<ArrowBackIcon />}
        >
          Back to Home
        </Button>
        
        <Button 
          component={Link} 
          to="/blogs" 
          variant="outlined" 
          color="secondary"
        >
          Browse Blogs
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage; 