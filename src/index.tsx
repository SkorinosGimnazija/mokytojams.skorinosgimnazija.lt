import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import ReactDOM from 'react-dom';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { App } from './App';
import { AuthProvider } from './contexts/authContext';
import { store } from './store/store';
import theme from './theme';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <PersistGate persistor={persistStore(store)}>
        <BrowserRouter>
          <AuthProvider>
            <CssBaseline />
            <App />
            <Toaster position="bottom-center" reverseOrder={false} />
          </AuthProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </ThemeProvider>,
  document.querySelector('#root')
);
