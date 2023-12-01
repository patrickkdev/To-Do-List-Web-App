import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import { useTheme } from '@mui/material/styles';
import { useColorMode } from '../../hooks/theme/toggle-color-mode';

export default function ToggleTheme() {
  const theme = useTheme();
  const colorMode = useColorMode();

  return (
    <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
      {/* Tema {theme.palette.mode == 'dark' ? 'escuro' : 'claro'} */}
      <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </div>
  );
}