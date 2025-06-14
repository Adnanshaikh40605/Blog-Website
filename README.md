# Blog Website

A modern blog website built with React, Material-UI, and Vite.

## Features

- Modern and responsive UI
- Blog listing with filtering and sorting
- Detailed blog view with comments
- Related blog suggestions
- Mobile-friendly design
- API integration with backend
- Cross-origin resource sharing (CORS) support
- Multi-environment configuration (development, production)

## Screenshots

The UI is based on the provided design images, featuring a clean and modern layout with:

- Header with navigation
- Blog listing page with filter and sort options
- Blog detail page with comments
- Footer with useful links

## Tech Stack

- React 18
- Material UI 5
- Vite
- React Router v6
- Axios for API requests

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Adnanshaikh40605/Blog-Website.git
cd Blog-Website
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Environment Configuration

The application supports multiple environments:

1. **Production** (Vercel deployment):
   - Hostname: `blog-website-sigma-one.vercel.app`
   - Hostname: `dohblog.vercel.app`
   - Hostname: `vacation-bna.vercel.app`

2. **Development** (default):
   - Hostname: `localhost` (default port)

3. **Alternative Development Port**:
   - Hostname: `localhost` with port `3001`

To configure the API URLs for different environments, update the values in `src/config.js` or use environment variables in `.env` file:

```
VITE_API_BASE_URL=https://backend-production-92ae.up.railway.app/api
VITE_DEV_API_BASE_URL=http://localhost:8000/api
```

## API Integration

The application integrates with a backend API for fetching blog posts and comments. See `API_INTEGRATION.md` for detailed documentation on the API endpoints and implementation.

### Key API Endpoints

- **Get all blog posts**: `GET /api/posts/`
- **Get post by slug**: `GET /api/posts/{slug}/`
- **Get comments for a post**: `GET /api/comments/?post={post_id}&approved=true&is_trash=false`
- **Submit a comment**: `POST /api/comments/`

### Testing API Connectivity

A test script is provided to verify API connectivity:

```bash
# Install axios if not already installed
npm install axios

# Run the test script
node test-api.js

# To test against your local API instead of production
node test-api.js --local
```

The test script checks:
- Getting all posts
- Getting a specific post by slug
- Getting comments for a post

## CORS Configuration

To allow cross-origin requests between the frontend and backend:

1. **Frontend Configuration**:
   - The API client is configured to include credentials in cross-origin requests
   - See `src/services/api.js` for implementation details

2. **Backend Configuration**:
   - The backend needs to allow requests from:
     - `https://blog-website-sigma-one.vercel.app` (Vercel deployment)
     - `https://dohblog.vercel.app` (Vercel deployment)
     - `https://vacation-bna.vercel.app` (Vercel deployment)
     - `http://localhost:3000` (default development port)
     - `http://localhost:3001` (alternative development port)
   - See `cors-config.md` for detailed backend CORS setup instructions

## Project Structure

```
blog-ui/
├── public/
│   └── images/         # Images used in the blog
├── src/
│   ├── components/     # Reusable components
│   ├── pages/          # Page components
│   ├── services/       # API services
│   │   └── api.js      # API client and endpoints
│   ├── config.js       # Environment configuration
│   ├── App.jsx         # Main App component
│   ├── main.jsx        # Entry point
│   └── theme.js        # MUI theme configuration
├── index.html          # HTML template
├── vite.config.js      # Vite configuration
├── package.json        # Project dependencies
├── API_INTEGRATION.md  # API documentation
└── cors-config.md      # CORS setup instructions
```

## Deployment

To build the project for production:

```bash
npm run build
# or
yarn build
```

The build output will be in the `dist` directory.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Design inspiration from modern blog websites
- Material-UI for the component library
- Vite for the fast development experience

adnan shaikh manzoor
test.com