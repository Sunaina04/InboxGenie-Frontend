import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AutoReplyButton = ({ isEnabled, onClick }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpen = () => {
    if (isEnabled) setOpenDialog(true);
  };

  const handleClose = () => setOpenDialog(false);

  const handleConfirm = () => {
    onClick();
    handleClose();
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        disabled={!isEnabled}
        onClick={handleOpen}
        sx={{
          backgroundColor: "#007aff",
          borderRadius: "8px",
          marginLeft: "20px",
          padding: "4px 8px",
          minWidth: "150px",
          fontWeight: 600,
          fontSize: "14px",
          width: "100%",
          "&:hover": {
            backgroundColor: "#0062cc",
          },
        }}
      >
        Auto Reply
      </Button>

      <Dialog
        open={openDialog}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { padding: 2, position: "relative" }
        }}
      >
        {/* Close (X) icon in top-right */}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogTitle sx={{ pr: 6 }}>Send AI Replies?</DialogTitle>
        <DialogContent>
          <Typography>
            All selected emails will be sent an AI-generated response.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ padding: 2 }}>
          <Button
            onClick={handleClose}
            sx={{
              backgroundColor: "#e0e0e0",
              color: "#333",
              fontSize: "12px",
              padding: "4px 10px",
              "&:hover": {
                backgroundColor: "#d5d5d5",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            variant="contained"
            sx={{
              fontSize: "12px",
              padding: "4px 10px",
              textTransform: "none",
              backgroundColor: "#407BFF"
            }}
          >
            Reply Anyways
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AutoReplyButton;
