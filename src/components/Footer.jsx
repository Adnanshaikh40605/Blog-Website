import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Divider } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn, YouTube } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import PlaceholderImage from './PlaceholderImage';
// Import SVG as a regular image
import logoImage from '../assets/logos/logo.svg';

const Footer = () => {
  const [logoError, setLogoError] = React.useState(false);

  // Handle SVG rendering errors
  const handleLogoError = () => {
    console.error("Error loading SVG logo");
    setLogoError(true);
  };

  return (
    <Box sx={{ bgcolor: '#f8f9fa', color: '#333', pt: 5, pb: 2 }} component="footer">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{ height: '36px', width: '36px', mr: 1 }}>
                {!logoError ? (
                  <img 
                    src={logoImage} 
                    alt="Blog CMS"
                    style={{ height: '36px', width: 'auto', marginRight: '8px' }}
                    onError={handleLogoError}
                  />
                ) : (
                  <PlaceholderImage width={36} height={36} text="Logo" />
                )}
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                VacationBNA Blog 
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontSize: '0.85rem' }}>
              A modern blog content management system with rich text editing capabilities and responsive design.
            </Typography>
            <Box sx={{ mt: 2, display: 'flex' }}>
              <IconButton 
                href="#" 
                size="small" 
                sx={{ 
                  mr: 1, 
                  color: '#3b5998',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  padding: '5px',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  }
                }}
              >
                <Facebook fontSize="small" />
              </IconButton>
              <IconButton 
                href="#" 
                size="small" 
                sx={{ 
                  mr: 1, 
                  color: '#1da1f2',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  padding: '5px',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  }
                }}
              >
                <Twitter fontSize="small" />
              </IconButton>
              <IconButton 
                href="#" 
                size="small" 
                sx={{ 
                  mr: 1, 
                  color: '#c32aa3',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  padding: '5px',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  }
                }}
              >
                <Instagram fontSize="small" />
              </IconButton>
              <IconButton 
                href="#" 
                size="small" 
                sx={{ 
                  mr: 1, 
                  color: '#0a66c2',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  padding: '5px',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  }
                }}
              >
                <LinkedIn fontSize="small" />
              </IconButton>
              <IconButton 
                href="#" 
                size="small" 
                sx={{ 
                  color: '#ff0000',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  padding: '5px',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  }
                }}
              >
                <YouTube fontSize="small" />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', mb: 2, fontSize: '1rem' }}>
              Recent Posts
            </Typography>
            <Link 
              component={RouterLink} 
              to="/blog/getting-started-with-react" 
              color="text.secondary" 
              sx={{ 
                display: 'block', 
                mb: 1.5, 
                textDecoration: 'none',
                transition: 'color 0.2s ease',
                fontSize: '0.85rem',
                '&:hover': {
                  color: 'secondary.main',
                }
              }}
            >
              Getting Started with React
            </Link>
            <Link 
              component={RouterLink} 
              to="/blog/modern-css-techniques" 
              color="text.secondary" 
              sx={{ 
                display: 'block', 
                mb: 1.5, 
                textDecoration: 'none',
                transition: 'color 0.2s ease',
                fontSize: '0.85rem',
                '&:hover': {
                  color: 'secondary.main',
                }
              }}
            >
              Modern CSS Techniques
            </Link>
            <Link 
              component={RouterLink} 
              to="/blog/javascript-best-practices" 
              color="text.secondary" 
              sx={{ 
                display: 'block', 
                mb: 1.5, 
                textDecoration: 'none',
                transition: 'color 0.2s ease',
                fontSize: '0.85rem',
                '&:hover': {
                  color: 'secondary.main',
                }
              }}
            >
              JavaScript Best Practices
            </Link>
            <Link 
              component={RouterLink} 
              to="/blog/responsive-web-design" 
              color="text.secondary" 
              sx={{ 
                display: 'block', 
                textDecoration: 'none',
                transition: 'color 0.2s ease',
                fontSize: '0.85rem',
                '&:hover': {
                  color: 'secondary.main',
                }
              }}
            >
              Responsive Web Design Tips
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', mb: 2, fontSize: '1rem' }}>
              Contact
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5 }}>
              <Box component="span" sx={{ mr: 1.5, fontSize: '1rem' }}>📍</Box>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                Tech Innovation Center
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5 }}>
              <Box component="span" sx={{ mr: 1.5, fontSize: '1rem' }}>✉️</Box>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{
                  transition: 'color 0.2s ease',
                  fontSize: '0.85rem',
                  '&:hover': {
                    color: 'secondary.main',
                    cursor: 'pointer'
                  }
                }}
              >
                info@blogcms.com
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
              <Box component="span" sx={{ mr: 1.5, fontSize: '1rem' }}>📞</Box>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{
                  transition: 'color 0.2s ease',
                  fontSize: '0.85rem',
                  '&:hover': {
                    color: 'secondary.main',
                    cursor: 'pointer'
                  }
                }}
              >
                +01 234 567 88
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Typography variant="body2" color="text.secondary" align="center" sx={{ fontSize: '0.8rem' }}>
          © {new Date().getFullYear()} Blog CMS. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;