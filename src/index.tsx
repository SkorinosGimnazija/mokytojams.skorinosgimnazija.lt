import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { App } from './App';
import { AuthProvider } from './contexts/authContext';
import { store } from './store/store';
import theme from './theme';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <PersistGate persistor={persistStore(store)}>
        <BrowserRouter>
          <AuthProvider>
            <CssBaseline />
            <App />
            <Toaster position="bottom-center" reverseOrder={false} />
          </AuthProvider>
        </BrowserRouter>
      </PersistGate>
    </ThemeProvider>
  </Provider>
);
