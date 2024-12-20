// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './utils/store';
import { ThemeProvider } from './context/ThemeContext';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const LoadingComponent = () => <div className="flex min-h-screen items-center justify-center">Loading...</div>;

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <PersistGate loading={<LoadingComponent />} persistor={persistor}>
          <BrowserRouter>
            <ThemeProvider>
              <LanguageProvider>
                <App />
              </LanguageProvider>
            </ThemeProvider>
          </BrowserRouter>
        </PersistGate>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
