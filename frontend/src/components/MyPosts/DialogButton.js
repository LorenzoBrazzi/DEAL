import React from "react";
import { Button } from "reactstrap";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function DialogButton({
  name,
  title,
  text,
  handleYes,
  outline,
  color,
  size,
  disabled,
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickYes = () => {
    setOpen(false);
    handleYes();
  };

  return (
    <div>
      <Button
        outline={outline}
        color={color}
        size={size}
        disabled={disabled}
        onClick={handleClickOpen}
      >
        {name}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{text}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleClickYes}
            variant="contained"
            color="primary"
          >
            Yes
          </Button>
          <Button outline onClick={handleClose} color="primary">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
