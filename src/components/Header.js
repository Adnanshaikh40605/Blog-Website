import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Container, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Header = () => {
  return (
    <AppBar position="static" color="primary" elevation={0} sx={{ borderBottom: '1px solid #e0e0e0' }}>
      <Container>
        <Toolbar sx={{ padding: { xs: '0.5rem 0', md: '0.5rem 0' }, display: 'flex', justifyContent: 'space-between' }}>
          <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
            <img 
              src="/images/logo.png" 
              alt="Vacation BNA" 
              style={{ height: '40px', marginRight: '8px' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/120x40?text=Vacation+BNA';
              }}
            />
            <Typography variant="h6" sx={{ fontWeight: 'bold', display: { xs: 'none', sm: 'block' } }}>
              Vacation BNA
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: '0.5rem', md: '1rem' } }}>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/blogs">Blogs</Button>
            <Button color="inherit" component={Link} to="/about">About Us</Button>
            <Button color="inherit" component={Link} to="/contact">Contact Us</Button>
            
            <Button 
              color="inherit" 
              sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}
              component={Link} 
              to="/wishlist"
            >
              Wishlist <FavoriteIcon sx={{ color: '#f50057', fontSize: '1rem' }} />
            </Button>
            
            <Box sx={{ display: 'flex', alignItems: 'center', ml: { xs: 0, md: 2 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <Avatar sx={{ width: 32, height: 32 }}>A</Avatar>
                <Typography variant="body2" sx={{ ml: 1, display: { xs: 'none', md: 'block' } }}>
                  Adnan
                </Typography>
                <KeyboardArrowDownIcon sx={{ fontSize: '1rem', ml: 0.5, display: { xs: 'none', md: 'block' } }} />
              </Box>
            </Box>
            
            <Button 
              variant="contained" 
              color="secondary" 
              sx={{ 
                ml: { xs: 1, md: 2 },
                px: { xs: 1, md: 2 },
                py: 1,
                fontSize: { xs: '0.75rem', md: '0.875rem' },
                whiteSpace: 'nowrap'
              }}
              component={Link}
              to="/list-property"
            >
              List your property
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;