import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { CssBaseline, Box, ThemeProvider } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import theme from '../theme';
import { ScrollToTop } from '../utils/ScrollToTop';

/**
 * Layout component that wraps all pages with common header and footer
 */
const Layout = () => {
  const location = useLocation();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ScrollToTop />
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          minHeight: '100vh',
          bgcolor: 'background.default',
        }}
      >
        <Header />
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1,
            pt: { xs: 2, md: 4 },
            pb: { xs: 4, md: 6 }
          }}
        >
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default Layout; 