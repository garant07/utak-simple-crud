import { createTheme } from '@mui/material/styles';
import '@fontsource-variable/inter';

const theme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        h4: {
          fontWeight: '720',
        },
        root: {
          letterSpacing: '-0.11px',
          color: '#1D1D1C',
          fontFamily: 'Inter Variable, sans-serif',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize',
          letterSpacing: '-0.08px',
          fontFamily: 'Inter Variable, sans-serif',
          fontSize: '15px',
          fontWeight: '400',
          borderRadius: '10px',
          padding: '9px',
          paddingInline: '18px',
        },
        outlinedError: {
          color: '#fc0324',
          borderColor: '#fc0324',
        },
        contained: {
          backgroundColor: 'rgb(0,113,227)',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: 'rgb(0,113,227)',
          fontFamily: 'Inter Variable, sans-serif',
          '&:hover': {
            cursor: 'pointer',
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize',
          letterSpacing: '-0.08px',
          fontFamily: 'Inter Variable, sans-serif',
          fontSize: '17px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          letterSpacing: '-0.08px',
          fontFamily: 'Inter Variable, sans-serif',
          color: '#1D1D1C',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          letterSpacing: '-0.08px',
          fontFamily: 'Inter Variable, sans-serif',
          color: '#1D1D1C',
        },
      },
    },
  },
});

export default theme;
