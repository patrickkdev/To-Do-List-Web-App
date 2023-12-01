import { useTheme } from '@mui/material';
import React from 'react'

const StyledTextInput = ({...props}: React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>) => {

  const theme = useTheme();

  return (
    <textarea {...props} style={{color: theme.palette.text.primary, border: "0", outline: "none", fontWeight: "bold", backgroundColor: "transparent", width: "100%", height: "100%", ...props.style}}/>
  )
}

export default StyledTextInput