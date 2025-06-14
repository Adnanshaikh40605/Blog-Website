import React from 'react';
import { Box, Typography } from '@mui/material';

/**
 * PlaceholderImage component to display when actual images fail to load
 * @param {Object} props - Component props
 * @param {string|number} props.width - Width of the placeholder
 * @param {string|number} props.height - Height of the placeholder
 * @param {string} props.text - Text to display inside the placeholder
 */
const PlaceholderImage = ({ width, height, text }) => {
  return (
    <Box
      sx={{
        width: width,
        height: height,
        backgroundColor: '#f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#999',
        fontSize: '0.8rem',
        textAlign: 'center',
        padding: 2,
        borderRadius: '4px',
      }}
    >
      <Typography variant="body2" color="inherit">
        {text || 'Image'}
      </Typography>
    </Box>
  );
};

export default PlaceholderImage; 