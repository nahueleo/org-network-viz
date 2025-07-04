// @ts-ignore
import OrganizationalNetworkVisualization from './components/OrganizationalNetworkVisualization';
// import './App.css';
import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const theme = createTheme({
    palette: {
      mode,
      ...(mode === 'dark'
        ? {
            background: {
              default: '#181a20',
              paper: '#23272f',
            },
          }
        : {
            background: {
              default: '#f3f6fd',
              paper: '#fff',
            },
          }),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', width: '100vw', bgcolor: 'background.default', p: 0, m: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2 }}>
          <IconButton onClick={() => setMode(mode === 'light' ? 'dark' : 'light')} color="inherit">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
        <Box className="min-h-screen w-full flex items-center justify-center p-0 md:p-6">
          <Box className="w-full max-w-7xl rounded-2xl shadow-2xl bg-white/80 backdrop-blur-md border border-white/60 p-0 md:p-4" sx={{ bgcolor: 'background.paper' }}>
            <OrganizationalNetworkVisualization />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
