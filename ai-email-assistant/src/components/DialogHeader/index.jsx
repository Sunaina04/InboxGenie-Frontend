import React from "react";
import { DialogTitle, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

const DialogHeader = ({ header, handleClose }) => {
  return (
    <DialogTitle
      sx={{
        backgroundColor: "#41a0d2",
        color: "#ffffff",
        position: "relative",
        padding: "16px 24px",
        borderTopLeftRadius: "8px",
        borderTopRightRadius: "8px",
      }}
    >
      {header ? header : "AI Response"}
      <IconButton
        edge="end"
        color="inherit"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 16,
          top: 16,
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
      >
        <Close />
      </IconButton>
    </DialogTitle>
  );
};

export default DialogHeader;
