import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

// Configure React Router future flags to fix warnings
import { 
  createRoutesFromChildren, 
  matchRoutes, 
  UNSAFE_DataRouterContext, 
  UNSAFE_DataRouterStateContext, 
  UNSAFE_NavigationContext, 
  UNSAFE_LocationContext, 
  UNSAFE_RouteContext 
} from 'react-router-dom';

// Set the future flags to opt-in to React Router v7 behavior
if (typeof window !== 'undefined') {
  window.__reactRouterFutureFlags = {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  };
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
); 