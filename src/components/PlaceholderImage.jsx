import React from 'react';

const PlaceholderImage = ({ width = 200, height = 200, text = 'Placeholder Image', bgColor = '#f0f0f0', textColor = '#333' }) => {
  // Convert width and height to numbers for calculations
  const numWidth = typeof width === 'string' && width.includes('%') ? 200 : parseInt(width) || 200;
  const numHeight = typeof height === 'string' && height.includes('%') ? 200 : parseInt(height) || 200;
  
  // Calculate font size based on numeric dimensions
  const fontSize = Math.min(numWidth, numHeight) / 10;
  
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${numWidth} ${numHeight}`}
      style={{ maxWidth: '0%' }}
    >
      <rect width="100%" height="100%" fill={bgColor} />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill={textColor}
        fontFamily="Arial, sans-serif"
        fontSize={`${fontSize}px`}
      >
        {text}
      </text>
    </svg>
  );
};

export default PlaceholderImage; 