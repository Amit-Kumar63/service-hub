import { Button, Snackbar, Alert } from '@mui/material';

export default function Toast({message, severity, isOpen}) {

  return (
    <div>
      <Snackbar open={isOpen} autoHideDuration={6000}>
        <Alert
          severity={severity}
          variant="filled"
          direction="center bottom"
          sx={{ width: 'fit-content', display: 'flex', justifyContent: 'center', mx: 'auto', mb: 16 }}
        >
            {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
