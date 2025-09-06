import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { store } from './store';
import Home from './pages/Home';
import './styles/global.scss';

// Create a custom MUI theme that matches the wedding invitation design
const theme = createTheme({
  palette: {
    primary: {
      main: '#B8860B', // Gold color from the wedding theme
      light: '#D4AF37',
      dark: '#8B6914',
    },
    secondary: {
      main: '#2C3E50', // Dark blue-gray
      light: '#34495E',
      dark: '#1A252F',
    },
    background: {
      default: '#FAFAFA',
      paper: 'rgba(255, 255, 255, 0.9)',
    },
    text: {
      primary: '#2C3E50',
      secondary: '#7F8C8D',
    },
  },
  typography: {
    fontFamily: '"Borel", cursive, "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Borel", cursive',
      fontWeight: 600,
    },
    h2: {
      fontFamily: '"Borel", cursive',
      fontWeight: 600,
    },
    h3: {
      fontFamily: '"Borel", cursive',
      fontWeight: 600,
    },
    h4: {
      fontFamily: '"Borel", cursive',
      fontWeight: 600,
    },
    h5: {
      fontFamily: '"Borel", cursive',
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"Borel", cursive',
      fontWeight: 600,
    },
    button: {
      fontFamily: '"Borel", cursive',
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 16,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
            },
            '&.Mui-focused': {
              backgroundColor: 'rgba(255, 255, 255, 0.98)',
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          textTransform: 'none',
          fontWeight: 600,
          padding: '12px 24px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #B8860B 0%, #D4AF37 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #8B6914 0%, #B8860B 100%)',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 16,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: '#B8860B',
          '&.Mui-checked': {
            color: '#B8860B',
          },
        },
      },
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
