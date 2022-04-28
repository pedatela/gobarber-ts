import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// Global Styles
import GlobalStyle from './styles/global';

// Routes
import Routes from './routes';

// Hooks
import AppProvider from './hooks';


const App: React.FC = () => {
  return (
    <BrowserRouter >
      <AppProvider>
          <Routes />
      </AppProvider>
      <GlobalStyle />
    </BrowserRouter>
  )
};

export default App;
