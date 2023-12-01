import { Button, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import Paper from '@mui/material/Paper';
import React, { createContext } from 'react'

interface ConfirmationContextProps {
  askConfirmation: (confirmationFor: string, description?: string) => Promise<boolean>;
}

const Context = createContext<ConfirmationContextProps | null>(null);

interface ConfirmationDialogProviderProps {
    children: React.ReactNode
}

const ConfirmationDialogProvider = ({ children }: ConfirmationDialogProviderProps ) => {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [dialogProps, setDialogProps] = React.useState<any>({open: false});

    function askConfirmation(confirmationFor: string, description?: string): Promise<boolean> {
        
        function onAction() {
            setDialogProps({confirmationFor, description, open: false});
        }

        return new Promise((resolve) => {
            setDialogProps({confirmationFor, description, open: true, onConfirm:() => {resolve(true); onAction()}, onDeny: () => {resolve(false); onAction()}});
        });
    }

    return (
        <Context.Provider value={{askConfirmation}}>
            {
               <ConfirmationDialog {...dialogProps} />
            }
            { children }
        </Context.Provider>
    )
}

interface ConfirmationDialogProps {
    open: boolean;
    confirmationFor: string;
    description?: string;
    onConfirm: () => void;
    onDeny: () => void;
    onConfirmText?: string;
    onDenyText?: string;
}

const ConfirmationDialog = ({ open, confirmationFor, description, onConfirm, onDeny, onConfirmText = "Continuar", onDenyText = "Cancelar" }: ConfirmationDialogProps) => {
  return (
    <Dialog open={open} onClose={() => onDeny()}>
        <Paper sx={{padding: "16px", display: "flex", flexDirection: "column", gap: "12px"}}>
            <Typography variant="h6">{confirmationFor}</Typography>
            {
              description &&
              <Typography>{description}</Typography>
            }
            <div style={{display: "flex", justifyContent: "flex-end", gap: "12px"}}>
                <Button variant='contained' onClick={() => onDeny()}> {onDenyText} </Button>
                <Button variant='text' onClick={() => onConfirm()}> {onConfirmText} </Button>
            </div>
        </Paper>
    </Dialog>
  )
}

export const useConfirmationDialog = () => {
    const context = React.useContext(Context);
    if (!context) {
        throw new Error('useConfirmationDialog must be used within a ConfirmationDialogProvider');
    }

    return context;
}

export default ConfirmationDialogProvider