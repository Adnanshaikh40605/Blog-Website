import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

/**
 * A reusable error message component with retry functionality
 * 
 * @param {Object} props - Component props
 * @param {string} props.message - The error message to display
 * @param {string} [props.apiUrl] - The API URL that was used (for debugging)
 * @param {Function} props.onRetry - Function to call when retry button is clicked
 * @param {boolean} [props.loading] - Whether the component is in loading state
 * @param {Object} [props.sx] - Additional styles for the container
 */
const ErrorMessage = ({ message, apiUrl, onRetry, loading = false, sx = {} }) => {
  return (
    <Box 
      sx={{ 
        textAlign: 'center', 
        py: 4, 
        bgcolor: 'background.paper', 
        borderRadius: 2,
        ...sx 
      }}
    >
      <Typography variant="body1" color="error" sx={{ mb: 2 }}>
        {message}
      </Typography>
      
      {apiUrl && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Attempted to connect to: {apiUrl}
        </Typography>
      )}
      
      {onRetry && (
        <Button
          variant="outlined"
          color="primary"
          onClick={onRetry}
          startIcon={<RefreshIcon />}
          disabled={loading}
        >
          {loading ? 'Retrying...' : 'Retry'}
        </Button>
      )}
    </Box>
  );
};

export default ErrorMessage; 