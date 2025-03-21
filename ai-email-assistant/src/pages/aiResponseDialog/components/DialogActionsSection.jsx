import React from "react";
import { Button, Box } from "@mui/material";

const DialogActionsSection = ({
  isEditing,
  handleEdit,
  handleSave,
  handleSendClick,
  loading,
  handleApprove,
}) => {
  return (
    <Box display="flex" gap={2} justifyContent="center">
      {!isEditing && (
        <Button
          variant="contained"
          color="primary"
          sx={{
            fontWeight: 600,
            textTransform: "none",
            paddingX: 2,
            paddingY: 1.5,
            fontSize: "16px",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "#1565c0",
            },
          }}
          onClick={handleApprove}
        >
          Approve
        </Button>
      )}

      <Button
        variant="outlined"
        color="primary"
        sx={{
          fontWeight: 600,
          textTransform: "none",
          paddingX: 3,
          paddingY: 1.5,
          fontSize: "16px",
          borderRadius: "8px",
          "&:hover": {
            backgroundColor: "#e3f2fd",
          },
        }}
        onClick={handleEdit}
        disabled={isEditing}
      >
        Edit
      </Button>

      {isEditing && (
        <Button
          variant="contained"
          color="primary"
          sx={{
            fontWeight: 600,
            textTransform: "none",
            paddingX: 3,
            paddingY: 1.5,
            fontSize: "16px",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "#1565c0",
            },
          }}
          onClick={handleSave}
        >
          Save
        </Button>
      )}

      <Button
        variant="contained"
        color="primary"
        sx={{
          fontWeight: 600,
          textTransform: "none",
          paddingX: 3,
          paddingY: 1.5,
          fontSize: "16px",
          borderRadius: "8px",
          "&:hover": {
            backgroundColor: "#1565c0",
          },
        }}
        onClick={handleSendClick}
        disabled={loading}
      >
        {loading ? "Sending..." : "Send"}
      </Button>
    </Box>
  );
};

export default DialogActionsSection;
