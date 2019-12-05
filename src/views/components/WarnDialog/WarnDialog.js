import React from "react";
import {
  DialogTitle,
  Dialog,
  DialogContent,
  DialogActions,
  Button
} from "@material-ui/core";

const WarnDialog = props => {
  const { open, onClose, onAgree, onDissagree } = props;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Warn!</DialogTitle>
      <DialogContent>
        Are you sure delete? No rollback if item delete.
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => {
            onAgree && onAgree();
          }}
        >
          ok
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            onDissagree && onDissagree();
          }}
        >
          cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default WarnDialog;
