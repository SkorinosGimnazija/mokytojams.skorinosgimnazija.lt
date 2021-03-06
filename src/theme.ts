import { createTheme } from '@mui/material/styles';
// import { ltLT } from '@mui/material/locale';

const theme = createTheme(
  {
    palette: {
      primary: {
        main: '#3f51b5',
        light: '#eef4f9',
        dark: '#2c387e',
      },
      secondary: {
        main: '#2979ff',
        light: '#5393ff',
        dark: '#1c54b2',
      },
    },
  }
  // ltLT
);

export default theme;
