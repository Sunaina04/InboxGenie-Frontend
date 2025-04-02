import React from "react";
import { Box, Typography, TextField, TextareaAutosize } from "@mui/material";

const DialogContentSection = ({
  isEditing,
  editedSender,
  editedResponse,
  aiResponse,
  setEditedSender,
  setEditedResponse,
}) => {
  return (
    <Box
      sx={{
        backgroundColor: "#f9f9f9",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      {isEditing ? (
        <TextField
          label="Sender's Name"
          value={editedSender}
          onChange={(e) => setEditedSender(e.target.value)}
          fullWidth
          sx={{
            backgroundColor: "",
            marginBottom: "16px",
            borderRadius: "8px",
          }}
        />
      ) : (
        <Box
          sx={{
            mt: 2,
            backgroundColor: "#ffffff",
            padding: "16px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            whiteSpace: "pre-line",
            fontSize: "14px",
            lineHeight: 1.6,
            maxHeight: "300px",
            overflowY: "auto",
          }}
        >
          <Typography variant="body2" color="textSecondary">
            {aiResponse || "No AI response available."}
          </Typography>
        </Box>
      )}

      {isEditing && (
        <TextareaAutosize
          multiline
          fullWidth
          value={editedResponse}
          onChange={(e) => setEditedResponse(e.target.value)}
          sx={{
            mb: 2,
            mt: 2,
            backgroundColor: "#ffffff",
            borderRadius: 1,
            padding: "12px",
            fontSize: "14px",
            lineHeight: 1.6,
            minHeight: "360px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            overflowY: "auto",
          }}
        />
      )}
    </Box>
  );
};

export default DialogContentSection;
