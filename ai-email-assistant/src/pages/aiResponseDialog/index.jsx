import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
  Typography,
  Box,
  TextField,
} from "@mui/material";
import { Close, CheckCircle, Edit, Send } from "@mui/icons-material";

const AIResponseDialog = ({
  open,
  handleClose,
  aiResponse,
  handleApprove,
  handleSend,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedResponse, setEditedResponse] = useState(aiResponse);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    handleApprove(editedResponse);
    setIsEditing(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ backgroundColor: "#e8f0fe", color: "#1a73e8" }}>
        AI Response
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ backgroundColor: "#ffffff", padding: "24px" }}>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
          <strong>AI-generated Response:</strong>
        </Typography>

        {!isEditing ? (
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            {aiResponse || "No AI response available."}
          </Typography>
        ) : (
          <TextField
            multiline
            fullWidth
            value={editedResponse}
            onChange={(e) => setEditedResponse(e.target.value)}
            sx={{
              mb: 2,
              backgroundColor: "#f5f5f5",
              borderRadius: 1,
              padding: 1,
            }}
          />
        )}

        <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
          {!isEditing && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<CheckCircle />}
              sx={{
                fontWeight: 600,
                textTransform: "none",
                paddingX: 3,
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
            startIcon={<Edit />}
            sx={{
              fontWeight: 600,
              textTransform: "none",
              paddingX: 3,
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
            startIcon={<Send />}
            sx={{
              fontWeight: 600,
              textTransform: "none",
              paddingX: 3,
              "&:hover": {
                backgroundColor: "#1565c0",
              },
            }}
            onClick={handleSend}
          >
            Send
          </Button>
        </Box>
      </DialogContent>

      <DialogActions sx={{ backgroundColor: "#e8f0fe" }}>
        <Button
          onClick={handleClose}
          color="primary"
          sx={{ textTransform: "none" }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AIResponseDialog;
