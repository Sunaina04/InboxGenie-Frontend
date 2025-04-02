import React from "react";
import { Button } from "@mui/material";

const AutoReplyButton = ({ isEnabled, onClick }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      disabled={!isEnabled}
      onClick={onClick}
      sx={{
        backgroundColor: "#f5f7fa", // Light gray background
        borderRadius: "8px",
       
        marginLeft: "20px",
        padding: "4px 8px",
        minWidth: "150px",
        fontWeight: 600,
        fontSize: "14px",
        width: "100%",
        backgroundColor: "#007aff",
        "&:hover": {
          backgroundColor: "#0062cc",
        },
      }}
    >
      Auto Reply
    </Button>
  );
};

export default AutoReplyButton;
