import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Container, Avatar, Menu, MenuItem } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import PlaceholderImage from './PlaceholderImage';
// Import SVG as a regular image
import logoImage from '../assets/logos/logo.svg';

const pages = [
  { name: 'Blogs', path: '/blogs' }
];

const Header = () => {
  const [logoError, setLogoError] = useState(false);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const location = useLocation();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Check if the current path matches the nav item
  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  // Handle SVG rendering errors
  const handleLogoError = () => {
    console.error("Error loading SVG logo");
    setLogoError(true);
  };

  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Container>
        <Toolbar sx={{ padding: '10px 0', display: 'flex', justifyContent: 'space-between', minHeight: '64px' }}>
          {/* Logo */}
          <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
            <Box sx={{ height: '40px', width: '80px', mr: 1, display: 'flex', alignItems: 'center' }}>
              {!logoError ? (
                <img 
                  src={logoImage} 
                  alt="Blog CMS"
                  style={{ height: '40px', width: 'auto' }}
                  onError={handleLogoError}
                />
              ) : (
                <PlaceholderImage width={80} height={40} text="Blog CMS" />
              )}
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', display: { xs: 'none', sm: 'block' }, fontSize: '1.1rem' }}>
              VacationBNA Blog
            </Typography>
          </Box>
          
          {/* Mobile menu */}
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
                <MenuItem 
                  key={page.name} 
                  onClick={handleCloseNavMenu} 
                  component={Link} 
                  to={page.path}
                  selected={isActive(page.path)}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
          {/* Desktop navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            {pages.map((page) => (
              <Button 
                key={page.name} 
                color="inherit" 
                component={Link} 
                to={page.path}
                sx={{ 
                  fontWeight: isActive(page.path) ? 'bold' : 'normal',
                  borderBottom: isActive(page.path) ? '2px solid #ff5a5f' : 'none',
                  borderRadius: 0,
                  px: 2,
                  py: 2.5,
                  fontSize: '0.9rem',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    borderBottom: '2px solid #ff5a5f',
                  }
                }}
              >
                {page.name}
              </Button>
            ))}
            
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                ml: { xs: 0, md: 2 },
                cursor: 'pointer'
              }}
              onClick={handleOpenUserMenu}
            >
              <Avatar 
                sx={{ 
                  width: 32, 
                  height: 32,
                  bgcolor: 'secondary.main',
                  '&:hover': {
                    boxShadow: '0 0 0 2px #ff5a5f',
                  }
                }}
              >
                A
              </Avatar>
              <Typography variant="body2" sx={{ ml: 1, display: { xs: 'none', md: 'block' }, fontSize: '0.9rem' }}>
                profile
              </Typography>
              <KeyboardArrowDownIcon sx={{ fontSize: '1rem', ml: 0.5, display: { xs: 'none', md: 'block' } }} />
            </Box>
            
            <Menu
              id="user-menu"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu} component={Link} to="/profile">
                Profile
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu} component={Link} to="/account">
                Account
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu} component={Link} to="/logout">
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;