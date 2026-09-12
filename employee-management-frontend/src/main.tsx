import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { store } from './stores/store';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import keycloak from './config/keycloak';

import './index.css';

const queryClient = new QueryClient();

keycloak
  .init({
    onLoad: 'login-required',
    pkceMethod: 'S256',
    checkLoginIframe: false,
  })
  .then((authenticated) => {
    if (!authenticated) {
      console.log('User is not authenticated');
      return;
    }

    console.log('User is authenticated');

    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider>
              <BrowserRouter>
                <AuthProvider>
                  <App />
                </AuthProvider>
              </BrowserRouter>
            </ThemeProvider>
          </QueryClientProvider>
        </Provider>
      </StrictMode>
    );
  })
  .catch((error) => {
    console.error('Keycloak initialization failed:', error);
  });
