import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme, useMediaQuery } from "@mui/material";
import React from "react";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

export default function ToggleColorMode({ children }: { children: React.ReactNode }) {
  const systemPreference = useMediaQuery('(prefers-color-scheme: dark)') === true ? "dark" : "light";
  const storedMode = localStorage.getItem('color-mode');
  const initialMode = storedMode === null ? systemPreference : storedMode as 'light' | 'dark';

  const [mode, setMode] = React.useState<'light' | 'dark'>(initialMode);
  
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const mode = prevMode === 'light' ? 'dark' : 'light';
          localStorage.setItem('color-mode', mode);
          return mode;
        });
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () => 
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <div style={{color: theme.palette.text.primary}}>
          {children}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export function useColorMode() {
  const context = React.useContext(ColorModeContext);
  
  if (!context) {
    throw new Error('useColorMode must be used within a ColorModeProvider');
  }

  return context;
}