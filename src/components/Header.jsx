import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Container, Avatar, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import PlaceholderImage from './PlaceholderImage';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Blogs', path: '/blogs' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Status', path: '/status' }
];

const Header = () => {
  const [logoError, setLogoError] = useState(false);
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" color="primary" elevation={0} sx={{ borderBottom: '1px solid #e0e0e0' }}>
      <Container>
        <Toolbar sx={{ padding: { xs: '0.5rem 0', md: '0.5rem 0' }, display: 'flex', justifyContent: 'space-between' }}>
          <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
            <Box sx={{ height: '40px', width: '120px', mr: 1, display: 'flex', alignItems: 'center' }}>
              {!logoError ? (
                <img 
                  src="/images/logo.png" 
                  alt="Vacation BNA" 
                  style={{ height: '40px', width: '120px', objectFit: 'contain' }}
                  onError={() => setLogoError(true)}
                />
              ) : (
                <PlaceholderImage width={120} height={40} text="Vacation BNA" />
              )}
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', display: { xs: 'none', sm: 'block' } }}>
              Vacation BNA
            </Typography>
          </Box>
          
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu} component={Link} to={page.path}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: { md: '1rem' } }}>
            {pages.map((page) => (
              <Button 
                key={page.name} 
                color="inherit" 
                component={Link} 
                to={page.path}
              >
                {page.name}
              </Button>
            ))}
            
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