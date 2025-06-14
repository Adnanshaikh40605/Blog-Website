import React from 'react';
import { Container, Typography, Box, Grid, Paper, Avatar, Divider } from '@mui/material';

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'John Doe',
      role: 'Founder & CEO',
      bio: 'Travel enthusiast with over 15 years of experience in the tourism industry.',
      avatar: 'https://source.unsplash.com/random/100x100/?portrait,man,1'
    },
    {
      name: 'Jane Smith',
      role: 'Content Manager',
      bio: 'Professional writer and editor with a passion for discovering hidden gems around the world.',
      avatar: 'https://source.unsplash.com/random/100x100/?portrait,woman,1'
    },
    {
      name: 'Michael Johnson',
      role: 'Travel Photographer',
      bio: 'Award-winning photographer who has captured breathtaking moments in over 50 countries.',
      avatar: 'https://source.unsplash.com/random/100x100/?portrait,man,2'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h2" component="h1" align="center" gutterBottom sx={{ mb: 6 }}>
        About Us
      </Typography>
      
      {/* Mission Statement */}
      <Paper elevation={0} sx={{ p: 4, mb: 6, borderRadius: 2 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Our Mission
        </Typography>
        <Typography variant="body1" paragraph>
          At Vacation BNA, our mission is to inspire and guide travelers to discover the world's most amazing destinations. 
          We believe that travel has the power to transform lives, broaden perspectives, and create lasting memories.
        </Typography>
        <Typography variant="body1">
          Through our blog, we aim to provide authentic travel stories, practical tips, and comprehensive guides 
          to help you plan your perfect vacation. Whether you're a seasoned traveler or planning your first trip, 
          we're here to make your journey more enjoyable and meaningful.
        </Typography>
      </Paper>
      
      {/* Our Story */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Our Story
        </Typography>
        <Typography variant="body1" paragraph>
          Vacation BNA was founded in 2018 by a group of passionate travelers who wanted to share their experiences 
          and knowledge with the world. What started as a small personal blog has grown into a trusted resource for 
          travelers seeking authentic experiences and practical advice.
        </Typography>
        <Typography variant="body1" paragraph>
          Over the years, we've built a community of like-minded travelers who share our love for exploration and discovery. 
          Our team has grown to include professional writers, photographers, and travel experts who are dedicated to 
          bringing you the most accurate and inspiring content.
        </Typography>
        <Typography variant="body1">
          Today, Vacation BNA reaches thousands of readers each month, helping them plan unforgettable trips and 
          discover new destinations. We're proud to be part of your travel journey and committed to continuing our 
          mission of inspiring wanderlust and facilitating meaningful travel experiences.
        </Typography>
      </Box>
      
      <Divider sx={{ mb: 8 }} />
      
      {/* Team Section */}
      <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4 }}>
        Meet Our Team
      </Typography>
      
      <Grid container spacing={4}>
        {teamMembers.map((member, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                textAlign: 'center',
                borderRadius: 2
              }}
            >
              <Avatar 
                src={member.avatar} 
                alt={member.name}
                sx={{ width: 120, height: 120, mb: 2 }}
              />
              <Typography variant="h6" component="h3">
                {member.name}
              </Typography>
              <Typography variant="subtitle1" color="secondary" sx={{ mb: 2 }}>
                {member.role}
              </Typography>
              <Typography variant="body2">
                {member.bio}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AboutPage; 