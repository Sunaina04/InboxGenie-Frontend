import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
  Typography,
  Box,
  TextareaAutosize,
} from "@mui/material";
import { Close, Edit, Send } from "@mui/icons-material";
import emailStore from "../../stores/emailStore";
import toast from "react-hot-toast";

const AIResponseDialog = ({
  open,
  email,
  handleClose,
  aiResponse,
  handleApprove,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedResponse, setEditedResponse] = useState(aiResponse);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Reset editedResponse whenever aiResponse or open prop changes
    setEditedResponse(aiResponse);
    setLoading(false); // Reset loading when dialog opens
  }, [aiResponse, open]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    handleApprove(editedResponse); // Save the edited response
    setIsEditing(false); // Exit editing mode
  };

  const handleSendClick = () => {
    setLoading(true);

    if (!email) {
      toast.error("No email selected.");
      setLoading(false);
      return;
    }

    const responseToSend = isEditing ? editedResponse : aiResponse;

    emailStore
      .sendEmail({
        to: email.from,
        from: email.to,
        subject: email.subject,
        body: responseToSend,
      })
      .then(() => {
        toast.success("Email sent successfully!");
        setLoading(false);
        handleClose(); // Close dialog after email is sent
      })
      .catch((error) => {
        toast.error("Failed to send email. Please try again.");
        console.error("Error sending email:", error);
        setLoading(false);
      });
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
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
        AI Response
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

      <DialogContent
        sx={{
          backgroundColor: "#f9f9f9",
          padding: "24px",
          borderBottomLeftRadius: "8px",
          borderBottomRightRadius: "8px",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {/* Display AI response or text field for editing */}
        {!isEditing ? (
          <Box
            sx={{
              mt: 2,
              backgroundColor: "#ffffff",
              padding: "16px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              whiteSpace: "pre-line", // Preserves line breaks
              fontSize: "14px",
              lineHeight: 1.6,
              maxHeight: "300px", // Limit height to ensure scrollability
              overflowY: "auto", // Enable scrolling if content overflows
            }}
          >
            <Typography variant="body2" color="textSecondary">
              {aiResponse || "No AI response available."}
            </Typography>
          </Box>
        ) : (
          <TextareaAutosize
            multiline
            fullWidth
            value={editedResponse}
            onChange={(e) => setEditedResponse(e.target.value)} // Handle editing
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
      </DialogContent>

      <DialogActions
        sx={{
          padding: "16px 24px",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          borderBottomLeftRadius: "8px",
          borderBottomRightRadius: "8px",
        }}
      >
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
            onClick={handleSendClick} // Send the edited response if it's being edited
            disabled={loading} // Disable the Send button when loading
          >
            {loading ? "Sending..." : "Send"}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default AIResponseDialog;
