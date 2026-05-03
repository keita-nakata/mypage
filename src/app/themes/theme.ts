import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00ffff',
    },
    secondary: {
      main: '#6c757d',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: { fontFamily: 'Fredoka, sans-serif', fontWeight: 500 },
    h2: { fontFamily: 'Fredoka, sans-serif', fontWeight: 500 },
    h3: { fontFamily: 'Fredoka, sans-serif', fontWeight: 500 },
    h4: { fontFamily: 'Fredoka, sans-serif', fontWeight: 500 },
    h5: { fontFamily: 'Fredoka, sans-serif', fontWeight: 500 },
    h6: { fontFamily: 'Fredoka, sans-serif', fontWeight: 500 },
  },
  components: {
    MuiDialog: {
      defaultProps: { scroll: 'paper' },
    },
  },
});

export default theme;
