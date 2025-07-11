# API Integration Documentation

This document describes how to integrate with the Blog CMS API.

## API Base URL

- **Production**: `https://backend-production-92ae.up.railway.app/api`
- **Development**: `http://localhost:8000/api`

## Testing API Connectivity

A test script is provided to verify API connectivity. To run the test:

1. Make sure you have Node.js installed
2. Install axios if not already installed:
   ```
   npm install axios
   ```
3. Run the test script:
   ```
   node test-api.js
   ```
4. To test against your local API instead of production:
   ```
   node test-api.js --local
   ```

The test script will check:
- Getting all posts
- Getting a specific post by slug
- Getting comments for a post

## Authentication

Some API endpoints require authentication. To authenticate, include a Bearer token in the Authorization header:

```
Authorization: Bearer your_access_token
```

## API Endpoints

### Blog Posts

#### Get All Posts

```
GET /posts/
```

Query parameters:
- `title`: Filter by title (partial match)
- `slug`: Filter by slug (partial match)
- `published`: Filter by published status (true/false)
- `page`: Page number for pagination
- `limit`: Number of items per page

Example:
```
GET /posts/?published=true&page=1&limit=10
```

#### Get Post by Slug

```
GET /posts/{slug}/
```

Example:
```
GET /posts/top-10-healthy-road-trip-snacks-for-outstation-driving/
```

#### Get Post by ID

```
GET /posts/{id}/
```

Example:
```
GET /posts/123/
```

#### Create Post (requires authentication)

```
POST /posts/
```

Request body:
```json
{
  "title": "New Blog Post",
  "content": "<p>This is the content of the blog post.</p>",
  "slug": "new-blog-post",
  "published": true
}
```

#### Update Post (requires authentication)

```
PUT /posts/{id}/
```

Request body:
```json
{
  "title": "Updated Blog Post",
  "content": "<p>This is the updated content.</p>",
  "slug": "updated-blog-post",
  "published": true
}
```

#### Partially Update Post (requires authentication)

```
PATCH /posts/{id}/
```

Request body:
```json
{
  "published": false
}
```

#### Delete Post (requires authentication)

```
DELETE /posts/{id}/
```

### Comments

#### Get Comments for a Post

```
GET /comments/?post={post_id}&approved=true&is_trash=false
```

Example:
```
GET /comments/?post=123&approved=true&is_trash=false
```

#### Submit a Comment

```
POST /comments/
```

Request body:
```json
{
  "post": 123,
  "name": "John Doe",
  "email": "john@example.com",
  "content": "Great article!"
}
```

#### Check Approved Comments

```
GET /comments/check-approved/{post_id}/
```

Example:
```
GET /comments/check-approved/123/
```

#### Get Comment Counts

```
GET /comments/counts/
```

#### Perform Action on Comment (requires authentication)

```
POST /comments/{action}/{comment_id}/
```

Available actions:
- `approve`: Approve a comment
- `unapprove`: Unapprove a comment
- `trash`: Move comment to trash
- `restore`: Restore comment from trash
- `delete`: Permanently delete comment

Example:
```
POST /comments/approve/456/
```

### Authentication

#### Login

```
POST /auth/login/
```

Request body:
```json
{
  "username": "admin",
  "password": "password"
}
```

Response:
```json
{
  "access": "access_token",
  "refresh": "refresh_token"
}
```

#### Register

```
POST /auth/register/
```

Request body:
```json
{
  "username": "newuser",
  "email": "newuser@example.com",
  "password": "password"
}
```

#### Get User Profile

```
GET /profile/
```

## Using the API in React Components

### Example: Fetching Blog Posts

```jsx
import React, { useEffect, useState } from 'react';
import { postsApi } from '../services/api';

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await postsApi.getAllPosts({ published: true });
        setPosts(response.data.results || response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
```

### Example: Submitting a Comment

```jsx
import React, { useState } from 'react';
import { commentsApi } from '../services/api';

const CommentForm = ({ postId }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    content: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      await commentsApi.submitComment({
        ...formData,
        post: postId
      });
      
      setSuccess(true);
      setError(null);
      setFormData({ name: '', email: '', content: '' });
    } catch (err) {
      console.error('Error submitting comment:', err);
      setError('Failed to submit comment');
      setSuccess(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit" disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit Comment'}
      </button>
      {error && <div>{error}</div>}
      {success && <div>Comment submitted successfully!</div>}
    </form>
  );
};

export default CommentForm;
```

## Error Handling

The API returns standard HTTP status codes:

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

When an error occurs, the response body will contain error details:

```json
{
  "detail": "Error message"
}
```

## CORS Configuration

The API is configured to allow cross-origin requests from:

- `https://blog-website-sigma-one.vercel.app`
- `https://dohblog.vercel.app`
- `https://vacation-bna.vercel.app`
- `http://localhost:3000`
- `http://localhost:3001`

If you need to add additional origins, please contact the API administrator.
