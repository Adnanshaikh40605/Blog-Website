// Test script to verify API connectivity
import axios from 'axios';

// Configuration
const API_BASE_URL = 'https://backend-production-92ae.up.railway.app/api';
const LOCAL_API_BASE_URL = 'http://localhost:8000/api';

// Choose which API to test
const useLocalApi = process.argv.includes('--local');
const baseUrl = useLocalApi ? LOCAL_API_BASE_URL : API_BASE_URL;

console.log(`Testing API at: ${baseUrl}`);

// Create axios instance
const api = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, // Set to false for testing
  timeout: 30000, // Increased timeout to 30 seconds
});

// Test functions
async function testGetAllPosts() {
  try {
    console.log('\n--- Testing GET /posts/ ---');
    console.log('Sending request...');
    const response = await api.get('/posts/');
    console.log(`Status: ${response.status}`);
    
    if (response.data && Array.isArray(response.data.results)) {
      console.log(`Found ${response.data.results.length} posts`);
      if (response.data.results.length > 0) {
        console.log(`First post title: ${response.data.results[0].title}`);
      }
    } else if (response.data && Array.isArray(response.data)) {
      console.log(`Found ${response.data.length} posts`);
      if (response.data.length > 0) {
        console.log(`First post title: ${response.data[0].title}`);
      }
    }
    return true;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    if (error.code === 'ECONNABORTED') {
      console.error('The request timed out. The server might be down or slow to respond.');
    } else if (error.response) {
      console.error(`Status: ${error.response.status}`);
      console.error(`Data: ${JSON.stringify(error.response.data)}`);
    } else if (error.request) {
      console.error('No response received from the server.');
    }
    return false;
  }
}

async function testGetPostBySlug(slug) {
  try {
    console.log(`\n--- Testing GET /posts/${slug}/ ---`);
    console.log('Sending request...');
    const response = await api.get(`/posts/${slug}/`);
    console.log(`Status: ${response.status}`);
    console.log(`Post title: ${response.data.title}`);
    return true;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    if (error.code === 'ECONNABORTED') {
      console.error('The request timed out. The server might be down or slow to respond.');
    } else if (error.response) {
      console.error(`Status: ${error.response.status}`);
      console.error(`Data: ${JSON.stringify(error.response.data)}`);
    } else if (error.request) {
      console.error('No response received from the server.');
    }
    return false;
  }
}

async function testGetComments(postId) {
  try {
    console.log(`\n--- Testing GET /comments/?post=${postId}&approved=true&is_trash=false ---`);
    console.log('Sending request...');
    const response = await api.get(`/comments/?post=${postId}&approved=true&is_trash=false`);
    console.log(`Status: ${response.status}`);
    
    if (response.data && Array.isArray(response.data.results)) {
      console.log(`Found ${response.data.results.length} comments`);
    } else if (response.data && Array.isArray(response.data)) {
      console.log(`Found ${response.data.length} comments`);
    }
    return true;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    if (error.code === 'ECONNABORTED') {
      console.error('The request timed out. The server might be down or slow to respond.');
    } else if (error.response) {
      console.error(`Status: ${error.response.status}`);
      console.error(`Data: ${JSON.stringify(error.response.data)}`);
    } else if (error.request) {
      console.error('No response received from the server.');
    }
    return false;
  }
}

// Run all tests
async function runTests() {
  console.log('Starting API tests...');
  
  // Test 1: Get all posts
  const postsSuccess = await testGetAllPosts();
  
  // Test 2: Get post by slug (only if Test 1 succeeded)
  let postBySlugSuccess = false;
  if (postsSuccess) {
    postBySlugSuccess = await testGetPostBySlug('top-10-healthy-road-trip-snacks-for-outstation-driving');
  } else {
    console.log('\nSkipping post by slug test due to previous failure.');
  }
  
  // Test 3: Get comments (only if Test 2 succeeded)
  let commentsSuccess = false;
  if (postBySlugSuccess) {
    commentsSuccess = await testGetComments(2);
  } else {
    console.log('\nSkipping comments test due to previous failure.');
  }
  
  // Summary
  console.log('\n--- Test Summary ---');
  console.log(`Get all posts: ${postsSuccess ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Get post by slug: ${postBySlugSuccess ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Get comments: ${commentsSuccess ? '✅ PASS' : '❌ FAIL'}`);
  
  if (postsSuccess && postBySlugSuccess && commentsSuccess) {
    console.log('\n✅ All tests passed! API connection is working correctly.');
  } else {
    console.log('\n❌ Some tests failed. Please check the errors above.');
    console.log('\nTroubleshooting tips:');
    console.log('1. Check if the API server is running and accessible');
    console.log('2. Verify that the API base URL is correct');
    console.log('3. Check network connectivity');
    console.log('4. Ensure CORS is properly configured on the server');
  }
}

// Run the tests
runTests(); 