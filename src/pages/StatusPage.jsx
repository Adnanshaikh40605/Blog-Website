import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, Grid, Chip, Button, CircularProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import RefreshIcon from '@mui/icons-material/Refresh';
import { postsApi, commentsApi } from '../services/api';
import { API_BASE_URL_DEBUG } from '../services/api';

const StatusPage = () => {
  const [postsStatus, setPostsStatus] = useState({ loading: true, success: false, error: null });
  const [commentsStatus, setCommentsStatus] = useState({ loading: true, success: false, error: null });
  const [apiUrl, setApiUrl] = useState(API_BASE_URL_DEBUG || 'Unknown');

  const checkApiStatus = async () => {
    // Reset status
    setPostsStatus({ loading: true, success: false, error: null });
    setCommentsStatus({ loading: true, success: false, error: null });
    
    // Check posts API
    try {
      const postsResponse = await postsApi.getAllPosts();
      setPostsStatus({ 
        loading: false, 
        success: true, 
        error: null,
        data: {
          count: postsResponse.data.count || (Array.isArray(postsResponse.data) ? postsResponse.data.length : 0),
          responseTime: postsResponse.headers['x-response-time'] || 'N/A'
        }
      });
    } catch (error) {
      setPostsStatus({ 
        loading: false, 
        success: false, 
        error: error.message || 'Failed to connect to posts API'
      });
    }
    
    // Check comments API
    try {
      const commentsResponse = await commentsApi.getAllComments();
      setCommentsStatus({ 
        loading: false, 
        success: true, 
        error: null,
        data: {
          count: commentsResponse.data.count || (Array.isArray(commentsResponse.data) ? commentsResponse.data.length : 0),
          responseTime: commentsResponse.headers['x-response-time'] || 'N/A'
        }
      });
    } catch (error) {
      setCommentsStatus({ 
        loading: false, 
        success: false, 
        error: error.message || 'Failed to connect to comments API'
      });
    }
  };

  useEffect(() => {
    checkApiStatus();
    
    // Update API URL if available
    if (postsApi.getBaseUrl) {
      setApiUrl(postsApi.getBaseUrl());
    }
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        API Status
      </Typography>
      
      <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          API Configuration
        </Typography>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1">
            <strong>Base URL:</strong> {apiUrl}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<RefreshIcon />}
            onClick={checkApiStatus}
            disabled={postsStatus.loading || commentsStatus.loading}
          >
            Refresh Status
          </Button>
        </Box>
      </Paper>
      
      <Grid container spacing={3}>
        {/* Posts API Status */}
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Posts API
              </Typography>
              <Chip 
                icon={postsStatus.loading ? <CircularProgress size={16} /> : (postsStatus.success ? <CheckCircleIcon /> : <ErrorIcon />)} 
                label={postsStatus.loading ? 'Checking...' : (postsStatus.success ? 'Online' : 'Offline')}
                color={postsStatus.loading ? 'default' : (postsStatus.success ? 'success' : 'error')}
                variant="outlined"
              />
            </Box>
            
            {postsStatus.loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
                <CircularProgress />
              </Box>
            ) : postsStatus.success ? (
              <Box>
                <Typography variant="body1">
                  <strong>Posts Count:</strong> {postsStatus.data.count}
                </Typography>
                <Typography variant="body1">
                  <strong>Response Time:</strong> {postsStatus.data.responseTime}
                </Typography>
              </Box>
            ) : (
              <Typography color="error">
                {postsStatus.error}
              </Typography>
            )}
          </Paper>
        </Grid>
        
        {/* Comments API Status */}
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Comments API
              </Typography>
              <Chip 
                icon={commentsStatus.loading ? <CircularProgress size={16} /> : (commentsStatus.success ? <CheckCircleIcon /> : <ErrorIcon />)} 
                label={commentsStatus.loading ? 'Checking...' : (commentsStatus.success ? 'Online' : 'Offline')}
                color={commentsStatus.loading ? 'default' : (commentsStatus.success ? 'success' : 'error')}
                variant="outlined"
              />
            </Box>
            
            {commentsStatus.loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
                <CircularProgress />
              </Box>
            ) : commentsStatus.success ? (
              <Box>
                <Typography variant="body1">
                  <strong>Comments Count:</strong> {commentsStatus.data.count}
                </Typography>
                <Typography variant="body1">
                  <strong>Response Time:</strong> {commentsStatus.data.responseTime}
                </Typography>
              </Box>
            ) : (
              <Typography color="error">
                {commentsStatus.error}
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          This page shows the current status of the API endpoints used by the application.
        </Typography>
      </Box>
    </Container>
  );
};

export default StatusPage; 