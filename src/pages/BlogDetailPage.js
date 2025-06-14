import React from 'react';
import { Container, Typography, Box, TextField, Button, Divider, Grid, Card, Avatar, Paper } from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const blogs = [
  { 
    id: 1, 
    title: 'Safety First: The Importance of Background Checks for Professional Drivers', 
    date: 'Fri Dec 13 2024', 
    image: '/images/blog1.jpg',
    author: 'Adnan Shaikh',
    authorAvatar: '/images/avatar1.jpg',
    category: 'Safety',
    content: `
      <p>As a leading provider of professional driver services at Driveronhire.com, we recognize that one of the most critical steps in upholding this commitment is conducting thorough background checks on our professional drivers. In this blog post, we delve into the importance of background checks for professional drivers and how Driveronhire.com prioritizes safety through this essential practice.</p>
      
      <h2>The Significance of Background Checks</h2>
      
      <h3>1. Trust and Reliability</h3>
      <p>Background checks instill trust and confidence in passengers, ensuring them that they are entrusting their safety to qualified and trustworthy drivers.</p>
      
      <h3>2. Criminal History Screening</h3>
      <p>Conducting criminal background checks helps identify any past criminal convictions that might raise concerns about a driver's suitability for the role.</p>
      
      <h3>3. Verification of Driving Record</h3>
      <p>A driver's driving history ensures they have a clean record and are qualified to operate vehicles safely.</p>
      
      <h3>4. Identity Verification</h3>
      <p>Background checks confirm the identity of drivers, ensuring they are who they claim to be and minimizing the risk of fraudulent activity.</p>
      
      <h3>5. Screening for Substance Abuse</h3>
      <p>Drug and alcohol screenings are essential components of background checks, promoting a drug-free and safe working environment for drivers.</p>
      
      <h3>6. Protecting Vulnerable Passengers</h3>
      <p>Background checks are especially crucial when transporting vulnerable passengers such as children or the elderly, ensuring their safety and well-being.</p>
      
      <h3>7. Legal Requirements</h3>
      <p>Many jurisdictions require transportation companies to conduct background checks on their drivers as part of regulatory compliance efforts.</p>
      
      <h2>Driveronhire.com's Approach to Safety</h2>
      
      <h3>1. Comprehensive Screening Process</h3>
      <p>Driveronhire.com employs a rigorous screening process that includes criminal background checks, driving record verification, and drug screenings to ensure the highest standards of safety.</p>
      
      <h3>2. Regular Monitoring</h3>
      <p>We continuously monitor our drivers' performance and conduct regular re-evaluations to uphold safety standards and address any emerging concerns.</p>
      
      <h3>3. Investment in Technology</h3>
      <p>Driveronhire.com leverages advanced technology and data analytics to enhance our background check procedures, providing comprehensive risk assessment.</p>
      
      <h3>4. Commitment to Transparency</h3>
      <p>We are committed to transparency regarding our background check procedures, providing passengers peace of mind and confidence in our services.</p>
      
      <h2>Continuous Improvement</h2>
      <p>At Driveronhire.com, safety is not just a priority; it's a fundamental principle that guides every aspect of our operations. We are dedicated to continuously improving our safety protocols and staying current of best practices to ensure the ongoing safety of our passengers and drivers alike.</p>
      
      <p>In conclusion, at Driveronhire.com, safety is not just a priority; it's a fundamental principle that guides our every action. We believe that investing in safety today paves the way for a better tomorrow, fostering trust, confidence, and peace of mind for all our passengers.</p>
    `
  },
  { 
    id: 2, 
    title: 'Exploring the Nightlife of Your City with a Dedicated Night Driver from Driveronhire.com', 
    date: 'Fri Dec 13 2024', 
    image: '/images/blog2.jpg',
    author: 'Rahul Sharma',
    authorAvatar: '/images/avatar2.jpg',
    category: 'Nightlife',
    content: `
      <p>The city lights come alive, the possibilities for a vibrant and exciting night out are endless. Whether you want to catch a live music performance, enjoy a formal dinner, or attend a late-night event, your city's nightlife can be a thrilling experience. However, navigating the city at night comes with its own set of challenges. This is where a dedicated driver service from Driveronhire.com steps in, offering you a responsible and convenient solution to explore the city after dark.</p>
      
      <h2>The Benefits of a Night Driver</h2>
      
      <h3>1. Safety First</h3>
      <p>The most significant advantage of hiring a night driver is safety. After a night of celebration, you can rely on a professional driver to get you home safely, eliminating the risks associated with driving under the influence or when fatigued.</p>
      
      <h3>2. Local Knowledge</h3>
      <p>Our drivers at Driveronhire.com are well-acquainted with the city's layout, including the best routes to avoid traffic and the quickest ways to reach your destination. This local knowledge is invaluable, especially at night when certain areas might be less accessible or safe.</p>
      
      <h3>3. Convenience and Comfort</h3>
      <p>With a dedicated night driver, you can enjoy the convenience of door-to-door service. No need to worry about parking, navigating through unfamiliar streets, or waiting for a taxi. Your driver will be ready to pick you up and drop you off exactly where you need to be.</p>
      
      <h3>4. Stress-Free Experience</h3>
      <p>Nightlife is meant to be enjoyable, and having a driver allows you to fully immerse yourself in the experience without the stress of transportation logistics. You can focus on having a good time, knowing that your journey home is taken care of.</p>
      
      <h2>Exploring the Nightlife with Driveronhire.com</h2>
      
      <h3>1. Customized Itinerary</h3>
      <p>Our service allows you to plan a customized nightlife itinerary. Want to visit multiple venues in one night? No problem. Your driver can wait for you or pick you up at predetermined times, making your night out seamless and enjoyable.</p>
      
      <h3>2. Professional and Reliable Service</h3>
      <p>At Driveronhire.com, we pride ourselves on providing professional and reliable service. Our drivers are punctual, courteous, and committed to ensuring your satisfaction and safety.</p>
      
      <h3>3. Affordable Luxury</h3>
      <p>Hiring a night driver from Driveronhire.com is an affordable luxury that enhances your nightlife experience. It's a small investment for the convenience, safety, and peace of mind it brings.</p>
      
      <h2>Conclusion</h2>
      <p>The nightlife of your city is waiting to be explored, and with a dedicated night driver from Driveronhire.com, you can do so in style, comfort, and safety. Whether it's a special occasion, a night out with friends, or simply a desire to experience the city's vibrant after-dark scene, our service is designed to make your night memorable for all the right reasons.</p>
      
      <p>Book your night driver with Driveronhire.com today and transform your nightlife experience into something extraordinary.</p>
    `
  },
  { 
    id: 3, 
    title: 'Top Destinations from Mumbai for a Relaxing Driver-Driven Experience', 
    date: 'Fri Dec 13 2024', 
    image: '/images/blog3.jpg',
    author: 'Priya Patel',
    authorAvatar: '/images/avatar3.jpg',
    category: 'Travel',
    content: 'Detailed content for blog 3...' 
  },
];

// Related blogs (excluding the current one)
const getRelatedBlogs = (currentBlogId) => {
  return blogs
    .filter(blog => blog.id !== parseInt(currentBlogId))
    .slice(0, 3);
};

const BlogDetailPage = () => {
  const { id } = useParams();
  const blog = blogs.find(b => b.id === parseInt(id));
  const relatedBlogs = getRelatedBlogs(id);

  if (!blog) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" align="center">Blog not found</Typography>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button 
            component={Link} 
            to="/blogs" 
            variant="contained" 
            color="secondary"
            startIcon={<ArrowBackIcon />}
          >
            Back to Blogs
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Back to blogs link */}
      <Box sx={{ mb: 4 }}>
        <Button 
          component={Link} 
          to="/blogs" 
          startIcon={<ArrowBackIcon />}
          sx={{ 
            color: 'text.secondary',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'transparent',
              color: 'secondary.main',
            }
          }}
        >
          Back to Blogs
        </Button>
      </Box>

      {/* Blog header */}
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        {blog.title}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Avatar 
          src={blog.authorAvatar} 
          alt={blog.author}
          sx={{ width: 48, height: 48, mr: 2 }}
        />
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
            {blog.author}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {blog.date} • {blog.category}
          </Typography>
        </Box>
      </Box>

      {/* Featured image */}
      <Box 
        component="img" 
        src={blog.image} 
        alt={blog.title}
        sx={{ 
          width: '100%', 
          height: 'auto',
          borderRadius: '12px',
          mb: 4,
          maxHeight: '500px',
          objectFit: 'cover',
        }} 
      />

      {/* Blog content */}
      <Box 
        sx={{ 
          typography: 'body1',
          lineHeight: 1.7,
          '& h2': {
            mt: 4,
            mb: 2,
            fontWeight: 'bold',
            fontSize: '1.75rem',
          },
          '& h3': {
            mt: 3,
            mb: 1,
            fontWeight: 'bold',
            fontSize: '1.25rem',
          },
          '& p': {
            mb: 2,
          }
        }}
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      <Divider sx={{ my: 6 }} />

      {/* Related blogs */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
          Related Blogs
        </Typography>
        <Grid container spacing={4}>
          {relatedBlogs.map(relatedBlog => (
            <Grid item key={relatedBlog.id} xs={12} sm={6} md={4}>
              <Card 
                component={Link}
                to={`/blog/${relatedBlog.id}`}
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  p: 2,
                  textDecoration: 'none',
                  color: 'inherit',
                  borderRadius: '8px',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                  }
                }}
              >
                <Box 
                  component="img"
                  src={relatedBlog.image}
                  alt={relatedBlog.title}
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    borderRadius: '8px',
                    objectFit: 'cover',
                    mr: 2
                  }}
                />
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'medium' }}>
                    {relatedBlog.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {relatedBlog.date}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Comments section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
          Comments
        </Typography>
        
        <Paper elevation={0} sx={{ p: 3, bgcolor: '#f8f9fa', borderRadius: '12px', mb: 4 }}>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Leave a Comment
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Your Name" variant="outlined" size="small" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Your Email" variant="outlined" size="small" />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Your Comment" 
                multiline 
                rows={4} 
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="secondary">
                Submit Comment
              </Button>
            </Grid>
          </Grid>
        </Paper>
        
        {/* Sample comments */}
        <Box>
          <Box sx={{ mb: 3, pb: 3, borderBottom: '1px solid #eee' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Avatar sx={{ width: 40, height: 40, mr: 2 }}>M</Avatar>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                  Michael
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  26/04/2023, 07:27:42
                </Typography>
              </Box>
            </Box>
            <Typography variant="body2">
              https://xyz.hu/forums/index.php?/topic/5987-king-ring/
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Button 
                size="small" 
                sx={{ 
                  color: 'text.secondary', 
                  textTransform: 'none', 
                  p: 0,
                  minWidth: 'auto',
                  mr: 2
                }}
              >
                Reply
              </Button>
            </Box>
          </Box>
          
          <Box sx={{ mb: 3, pb: 3, borderBottom: '1px solid #eee' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Avatar sx={{ width: 40, height: 40, mr: 2 }}>A</Avatar>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                  Akshay
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  14/04/2023, 13:10:51
                </Typography>
              </Box>
            </Box>
            <Typography variant="body2">
              Hello Testing
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Button 
                size="small" 
                sx={{ 
                  color: 'text.secondary', 
                  textTransform: 'none', 
                  p: 0,
                  minWidth: 'auto',
                  mr: 2
                }}
              >
                Reply
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default BlogDetailPage;