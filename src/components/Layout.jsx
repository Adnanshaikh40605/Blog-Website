import React from 'react';
import { Outlet } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

/**
 * Layout component that wraps all pages with common header and footer
 */
const Layout = () => {
  return (
    <>
      <CssBaseline />
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          minHeight: '100vh'
        }}
      >
        <Header />
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1,
            pt: 2,
            pb: 4
          }}
        >
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default Layout; 