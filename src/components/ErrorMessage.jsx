import React from 'react';
import { Box, Typography, Button, Paper, CircularProgress } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

/**
 * ErrorMessage component for displaying error messages with retry functionality
 * @param {Object} props - Component props
 * @param {string} props.message - Error message to display
 * @param {string} props.apiUrl - API URL that caused the error (optional)
 * @param {Function} props.onRetry - Function to call when retry button is clicked
 * @param {boolean} props.loading - Whether the retry operation is in progress
 * @param {Object} props.sx - Additional styling props
 */
const ErrorMessage = ({ message, apiUrl, onRetry, loading, sx = {} }) => {
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 3, 
        textAlign: 'center', 
        borderRadius: 2, 
        border: '1px dashed #e0e0e0',
        bgcolor: '#fff8f8',
        ...sx
      }}
    >
      <ErrorOutlineIcon color="error" sx={{ fontSize: '3rem', mb: 2 }} />
      <Typography variant="h6" color="error" gutterBottom>
        Something went wrong
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {message}
      </Typography>
      {apiUrl && (
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
          API: {apiUrl}
        </Typography>
      )}
      {onRetry && (
        <Button
          variant="outlined"
          color="secondary"
          startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <RefreshIcon />}
          onClick={onRetry}
          disabled={loading}
          sx={{ mt: 1 }}
        >
          {loading ? 'Retrying...' : 'Retry'}
        </Button>
      )}
    </Paper>
  );
};

export default ErrorMessage; 