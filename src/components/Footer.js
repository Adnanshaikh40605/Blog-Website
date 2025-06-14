import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Divider } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn, YouTube } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#f8f9fa', color: '#333', pt: 6, pb: 3 }} component="footer">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <img 
                src="/images/logo.png" 
                alt="Vacation BNA" 
                style={{ height: '40px', marginRight: '8px' }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/120x40?text=Vacation+BNA';
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Vacationbna
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi sed veritatis
              voluptatibus error omnis quo?
            </Typography>
            <Box sx={{ mt: 2, display: 'flex' }}>
              <IconButton href="#" size="small" sx={{ mr: 1, color: '#3b5998' }}><Facebook /></IconButton>
              <IconButton href="#" size="small" sx={{ mr: 1, color: '#1da1f2' }}><Twitter /></IconButton>
              <IconButton href="#" size="small" sx={{ mr: 1, color: '#c32aa3' }}><Instagram /></IconButton>
              <IconButton href="#" size="small" sx={{ mr: 1, color: '#0a66c2' }}><LinkedIn /></IconButton>
              <IconButton href="#" size="small" sx={{ color: '#ff0000' }}><YouTube /></IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
              Top Listings
            </Typography>
            <Link component={RouterLink} to="/listings/luxury-villa" color="text.secondary" sx={{ display: 'block', mb: 1, textDecoration: 'none' }}>The Luxury Private Villa</Link>
            <Link component={RouterLink} to="/listings/nature-villa" color="text.secondary" sx={{ display: 'block', mb: 1, textDecoration: 'none' }}>The Nature Villa</Link>
            <Link component={RouterLink} to="/listings/luxury-villa-2" color="text.secondary" sx={{ display: 'block', mb: 1, textDecoration: 'none' }}>The Luxury Private Villa</Link>
            <Link component={RouterLink} to="/listings/nature-villa-2" color="text.secondary" sx={{ display: 'block', textDecoration: 'none' }}>The Nature Villa</Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
              Useful Links
            </Typography>
            <Link component={RouterLink} to="/" color="text.secondary" sx={{ display: 'block', mb: 1, textDecoration: 'none' }}>Home</Link>
            <Link component={RouterLink} to="/listings" color="text.secondary" sx={{ display: 'block', mb: 1, textDecoration: 'none' }}>Listings</Link>
            <Link component={RouterLink} to="/explore" color="text.secondary" sx={{ display: 'block', mb: 1, textDecoration: 'none' }}>Explore</Link>
            <Link component={RouterLink} to="/blogs" color="text.secondary" sx={{ display: 'block', mb: 1, textDecoration: 'none' }}>Blogs</Link>
            <Link component={RouterLink} to="/about" color="text.secondary" sx={{ display: 'block', mb: 1, textDecoration: 'none' }}>About Us</Link>
            <Link component={RouterLink} to="/contact" color="text.secondary" sx={{ display: 'block', textDecoration: 'none' }}>Contact Us</Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
              Contact
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
              <Box component="span" sx={{ mr: 1 }}>📍</Box>
              <Typography variant="body2" color="text.secondary">
                William Industry Estate
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
              <Box component="span" sx={{ mr: 1 }}>✉️</Box>
              <Typography variant="body2" color="text.secondary">
                info@vacationbna.com
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
              <Box component="span" sx={{ mr: 1 }}>📞</Box>
              <Typography variant="body2" color="text.secondary">
                +01 234 567 88
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} Vacation BNA. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;