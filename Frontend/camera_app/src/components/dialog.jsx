import * as React from "react";
import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate, useSearchParams, Navigate } from "react-router-dom";

// Dialog code from material ui
// https://mui.com/material-ui/react-dialog/

export default function AlertDialog({ id, setShowDialog }) {
  const navigate = useNavigate();

  const deleteCamera = async (e) => {
    await fetch(
      "https://camera-website-backend.onrender.com/api/product/delete",
      {
        method: "POST",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setShowDialog("");
    deleteCamera();
    handleClose();
  };

  useEffect(() => {
    handleClickOpen();
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        sx={{ display: "none" }}
        onClick={handleClickOpen}
      >
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete Camera listing?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Go back</Button>
          <Button onClick={deleteCamera} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
