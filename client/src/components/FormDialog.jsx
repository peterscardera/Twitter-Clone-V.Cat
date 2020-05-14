import React from "react";
import { COLORS } from "../constants";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { FeedContext } from "./FeedContext";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [typing, setTyping] = React.useState("");
  const { postHandler } = React.useContext(FeedContext);
  // console.log(typing)
  const handleClickOpen = () => {
    setOpen(true);
    setTyping("")
  };

  const handleClose = () => {
    setOpen(false);
  };

  const postTweet = async () => {
    try {
      let data = await fetch(`/api/tweet`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ status: typing }),
      });
      //if success fecth the new feed and bring it to the FE State to cause a re-render
      if (data.status === 200) {
        let dataWithPost = await fetch("https://bootcamptwitterclone.herokuapp.com/api/me/home-feed", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        });
        let updatedFeed = await dataWithPost.json();
        // console.log(updatedFeed)
        postHandler(updatedFeed);
      } else {
        throw Error("not 200");
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        QUICK MEOW
      </Button>
      <Dialog
        style={{background:"RGBA(37,51,65,.8)"}}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Quick Meow</DialogTitle>
        <DialogContent>
          <TextField
          
            required
            autoFocus
            margin="dense"
            id="name"
            label="Whats up?"
            type="text"
            fullWidth
            onChange={(e) => setTyping(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleClose();
             {typing != "" && postTweet() } ;
            }}
            color="primary"
          >
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
