import App from './App.jsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { LoaderProvider } from './context/LoaderContext.jsx';
import { CurrencyProvider } from './context/CurrencyContext.jsx';
import './i18n/i18n.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <LoaderProvider>
        <CurrencyProvider>
          <App />
        </CurrencyProvider>
      </LoaderProvider>
    </BrowserRouter>
  </StrictMode>
);
