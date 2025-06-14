import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PlaceholderImage from './PlaceholderImage';
import { formatDate } from '../utils/dateUtils';

const BlogCard = ({ blog }) => {
  const [imageError, setImageError] = React.useState(false);
  
  // Format the date - use created_at from API or fallback to date
  const formattedDate = formatDate(blog.created_at || blog.date);

  return (
    <Card 
      elevation={0}
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%',
        borderRadius: '12px',
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
        }
      }}
    >
      <Box sx={{ position: 'relative', height: '200px' }}>
        {!imageError && (blog.featured_image_url || blog.image) ? (
          <CardMedia
            component="img"
            height="200"
            image={blog.featured_image_url || blog.image}
            alt={blog.title}
            sx={{ objectFit: 'cover' }}
            onError={() => setImageError(true)}
          />
        ) : (
          <PlaceholderImage width={345} height={200} text="Blog Image" />
        )}
        {blog.category && (
          <Chip
            label={blog.category}
            size="small"
            color="secondary"
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              fontWeight: 500,
            }}
          />
        )}
      </Box>
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ mb: 1, display: 'block' }}
        >
          {formattedDate}
        </Typography>
        <Typography 
          gutterBottom 
          variant="h6" 
          component="h3" 
          sx={{ 
            fontWeight: '600',
            fontSize: '1.1rem',
            lineHeight: 1.3,
            mb: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {blog.title}
        </Typography>
        
        <Button 
          component={Link} 
          to={`/blog/${blog.slug || blog.id}`} 
          color="secondary" 
          sx={{ 
            p: 0, 
            fontWeight: 600,
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'transparent',
            },
            '&:hover .MuiSvgIcon-root': {
              transform: 'translateX(4px)',
            }
          }}
          disableRipple
        >
          Read More
          <ArrowForwardIcon 
            sx={{ 
              ml: 0.5, 
              fontSize: '1rem',
              transition: 'transform 0.2s ease'
            }} 
          />
        </Button>
      </CardContent>
    </Card>
  );
};

export default BlogCard;