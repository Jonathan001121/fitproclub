import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import img from '../../assets/12.png';
import ErrorCard from '../ErrorCard/ErrorCard';
export default function ExerciseDialog(props) {
  const [open, setOpen] = React.useState(false);
  console.log(props.num)
  const handleClickOpen = (props) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen} style={{"margin-left":"30em","margin-right":"0", "z-index": "999"}}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth="xl"
        maxWidth="xl"
      >

        <DialogContent>
          <ErrorCard num={props.num}/>
          <DialogContentText id="alert-dialog-description">
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Got it!
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}