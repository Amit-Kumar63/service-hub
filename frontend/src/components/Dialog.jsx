import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({open, setOpen, cb, text, title}) {
  const handleClose = () => {
    setOpen(false);
  };
  const handleAgree = () => {
      cb();
  }
  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth
      >
        <DialogTitle sx={{padding: '10px 20px', borderBottom: '1px solid #e0e0e0'}}>{title}</DialogTitle>
        <DialogActions sx={{padding: '10px 20px', display: 'flex', justifyContent: 'space-evenly'}}>
          <Button onClick={handleClose}>{text.Disagree}</Button>
          <Button onClick={handleAgree}>{text.Agree}</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
