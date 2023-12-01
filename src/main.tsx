import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ToggleColorMode from './hooks/theme/toggle-color-mode.tsx';
import { Box } from '@mui/material';
import ConfirmationDialogProvider from './components/dialogs/confirm-action.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ToggleColorMode>
    <React.StrictMode>
      <ConfirmationDialogProvider>
        <Box
          sx={{
            width: '100vw',
            minHeight: '100vh',
            bgcolor: 'background.default',
            color: 'text.primary',
          }}
          >
          <App />
        </Box>
      </ConfirmationDialogProvider>
    </React.StrictMode>
  </ToggleColorMode>
)
