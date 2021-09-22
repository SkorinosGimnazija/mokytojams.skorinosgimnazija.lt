import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import ReactDOM from 'react-dom';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './App';
import { store } from './store/store';
import theme from './theme';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <Router>
        <App />
        <Toaster position="bottom-center" reverseOrder={false} />
      </Router>
    </Provider>
  </ThemeProvider>,
  document.querySelector('#root')
);
