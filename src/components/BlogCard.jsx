import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, Chip, useMediaQuery, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PlaceholderImage from './PlaceholderImage';
import { formatDate } from '../utils/dateUtils';

const BlogCard = ({ blog, onClick }) => {
  const [imageError, setImageError] = React.useState(false);
  
  // Get theme for responsive design
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Format the date - use created_at from API or fallback to date
  const formattedDate = formatDate(blog.created_at || blog.date);

  return (
    <Card 
      elevation={0}
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%',
        borderRadius: '8px',
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
        },
        width: '100%',
      }}
    >
      {/* Image Container with fixed aspect ratio */}
      <Box 
        sx={{ 
          position: 'relative',
          paddingTop: '56.25%', // 16:9 aspect ratio (9/16 = 0.5625 or 56.25%)
          width: '100%',
          backgroundColor: '#f5f5f5', // Background color for image container
          overflow: 'hidden',
        }}
      >
        {!imageError && (blog.featured_image_url || blog.image) ? (
          <CardMedia
            component="img"
            image={blog.featured_image_url || blog.image}
            alt={blog.title}
            sx={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover', // This ensures the image covers the area without distortion
              objectPosition: 'center', // Center the image
            }}
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
            <PlaceholderImage width="100%" height="100%" text="Blog Image" />
          </Box>
        )}
        {blog.category && (
          <Chip
            label={blog.category}
            size="small"
            color="secondary"
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              fontWeight: 500,
              textTransform: 'capitalize',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              fontSize: { xs: '0.65rem', sm: '0.7rem' },
              height: { xs: '20px', sm: '22px' },
              '& .MuiChip-label': {
                px: { xs: 0.8, sm: 1 },
              }
            }}
          />
        )}
      </Box>
      <CardContent sx={{ 
        flexGrow: 1, 
        p: { xs: 1.5, sm: 2, md: 3 }, 
        pb: '16px !important',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 0.5, 
            display: 'block', 
            fontWeight: 500, 
            fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }
          }}
        >
          {formattedDate}
        </Typography>
        <Typography 
          gutterBottom 
          variant="h6" 
          component="h3" 
          className="blog-title"
          sx={{ 
            fontWeight: '600',
            fontSize: { xs: '0.9rem', sm: '0.95rem', md: '1rem' },
            lineHeight: 1.3,
            mb: { xs: 1.5, sm: 2 },
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3, // Increased from 2 to 3 lines
            WebkitBoxOrient: 'vertical',
            minHeight: { xs: '3.6rem', sm: '3.9rem' }, // Increased to accommodate 3 lines
            wordBreak: 'break-word',
            width: '100%', // Ensure full width
            maxWidth: '100%', // Prevent overflow
          }}
        >
          {blog.title}
        </Typography>
        
        <Button 
          component={Link} 
          to={`/blog/${blog.slug || blog.id}`} 
          color="secondary" 
          onClick={onClick}
          sx={{ 
            p: 0, 
            fontWeight: 600,
            textTransform: 'none',
            fontSize: { xs: '0.8rem', sm: '0.85rem' },
            mt: 'auto',
            alignSelf: 'flex-start',
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
              fontSize: { xs: '0.8rem', sm: '0.85rem' },
              transition: 'transform 0.2s ease'
            }} 
          />
        </Button>
      </CardContent>
    </Card>
  );
};

export default BlogCard;