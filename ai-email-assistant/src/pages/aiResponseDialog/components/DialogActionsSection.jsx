import React from "react";
import { Box, Button, CircularProgress } from "@mui/material";

const DialogActionsSection = ({
  isEditing,
  handleEdit,
  handleSave,
  handleSendClick,
  loading,
  handleApprove,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        gap: 2,
        padding: "16px 24px",
        borderTop: "1px solid #eee",
      }}
    >
      <Button
        variant="contained"
        onClick={handleApprove}
        sx={{          
          backgroundColor: "#f5f5f5",
          color: "#666",
          textTransform: "none",
          borderRadius: "8px",
          padding: "6px 16px",
          minWidth: "auto",
          fontSize: "13px",
          fontWeight: 500,
          boxShadow: "none",
          "&:hover": {
            backgroundColor: "#e0e0e0",
            boxShadow: "none",
          },
        }}
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        onClick={isEditing ? handleSave : handleEdit}
        sx={{
          backgroundColor: "#f5f5f5",
          color: "#666",
          textTransform: "none",
          borderRadius: "8px",
          padding: "6px 16px",
          minWidth: "auto",
          fontSize: "13px",
          fontWeight: 500,
          boxShadow: "none",
          "&:hover": {
            backgroundColor: "#e0e0e0",
            boxShadow: "none",
          },
        }}
      >
        {isEditing ? "Save" : "Edit"}
      </Button>
      <Button
        variant="contained"
        onClick={handleSendClick}
        disabled={loading}
        sx={{
          backgroundColor: "#f5f5f5",
          color: "#666",
          textTransform: "none",
          borderRadius: "8px",
          padding: "6px 16px",
          minWidth: "auto",
          fontSize: "13px",
          fontWeight: 500,
          boxShadow: "none",
          "&:hover": {
            backgroundColor: "#e0e0e0",
            boxShadow: "none",
          },
        }}
      >
        {loading ? <CircularProgress color="inherit" size={20} /> : "Send"}
      </Button>
    </Box>
  );
};

export default DialogActionsSection;
