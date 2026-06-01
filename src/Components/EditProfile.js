import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { db } from "../Firebase/Firebase";

function EditProfile({ userDetails, toggler, alert }) {
  const [open, setOpen] = useState(true);
  const [userName, setUserName] = useState(userDetails?.name || "");
  const [displayName, setDisplayName] = useState(userDetails?.displayName || "");
  const [email, setEmail] = useState(userDetails?.email || "");
  const [uid, setUid] = useState(userDetails?.uid || "");

  const handleClose = () => {
    setOpen(false);
    toggler();
  };

  const updateProfile = (e) => {
    e.preventDefault();

    if (!uid || !displayName.trim()) {
      return;
    }

    db.collection("users")
      .doc(uid)
      .update({
        displayName: displayName.trim(),
      })
      .then((res) => {
        alert();
      })
      .catch((err) => {
        console.log(err);
      });

    setOpen(false);
    toggler();
  };

  useEffect(() => {
    if (!userDetails) {
      return;
    }

    setUserName(userDetails.name || "");
    setDisplayName(userDetails.displayName || "");
    setEmail(userDetails.email || "");
    setUid(userDetails.uid || "");
  }, [userDetails]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit User Profile</DialogTitle>
        <DialogContent>
          <form autoComplete="off">
            <TextField
              id="outlined-basic"
              label="Name"
              fullWidth
              margin="normal"
              variant="outlined"
              disabled
              value={userName}
              style={{
                backgroundColor: "rgb(45, 45, 73)",
                borderRadius: "5px",
                color: "#a6a6a6",
              }}
            />
            <TextField
              id="outlined-basic"
              label="Email"
              fullWidth
              margin="normal"
              variant="outlined"
              disabled
              value={email}
              style={{
                backgroundColor: "rgb(45, 45, 73)",
                borderRadius: "5px",
                color: "#a6a6a6",
              }}
            />

            <TextField
              id="outlined-basic"
              label="Display Name"
              fullWidth
              margin="normal"
              variant="outlined"
              value={displayName}
              style={{
                backgroundColor: "rgb(45, 45, 73)",
                borderRadius: "5px",
              }}
              onChange={(e) => {
                setDisplayName(e.target.value);
              }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: "white" }}>
            Cancel
          </Button>
          <Button
            onClick={(e) => updateProfile(e)}
            color="primary"
            variant="contained"
            disabled={!uid || !displayName.trim()}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditProfile;
