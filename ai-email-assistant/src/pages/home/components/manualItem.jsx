import React, { useState } from "react";
import {
  ListItem,
  ListItemText,
  IconButton,
  Box,
  TextField,
  Tooltip,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@mui/material";
import { Delete, Edit, Save, Close } from "@mui/icons-material";
import manualStore from "../../../stores/mannualStore";

const ManualItem = ({ file }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newFilename, setNewFilename] = useState(file.filename || "Unnamed manual");
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleRename = async () => {
    if (newFilename.trim() && newFilename !== file.filename) {
      await manualStore.renameManual(file.id, newFilename.trim());
    }
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    setConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await manualStore.deleteManual(file.id);
      setConfirmOpen(false);
    } catch (error) {
      console.error("Error deleting manual:", error);
      setConfirmOpen(false);
    }
  };

  const renderStatus = () => {
    if (file.embedding_status === "pending") {
      return <Typography variant="body2" color="orange">Pending</Typography>;
    }
    if (file.embedding_status === "processing") {
      return <CircularProgress size={16} color="primary" />;
    }
    if (file.embedding_status === "success") {
      return <Typography variant="body2" color="green">Completed</Typography>;
    }
    if (file.embedding_status === "failed") {
      return <Typography variant="body2" color="red">Failed</Typography>;
    }
    return null;
  };

  return (
    <>
      <ListItem
        sx={{
          border: "1px solid #e0e0e0",
          borderRadius: 1,
          mb: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          "&:hover": {
            backgroundColor: "#f9f9f9",
          },
        }}
      >
        <Box sx={{ flex: 1 }}>
          {isEditing ? (
            <TextField
              value={newFilename}
              onChange={(e) => setNewFilename(e.target.value)}
              size="small"
              variant="outlined"
              autoFocus
              fullWidth
              sx={{ maxWidth: 400 }}
            />
          ) : (
            <Box>
              <a
                href={file.file}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "#407BFF" }}
              >
                {file.filename || "Unnamed manual"}
              </a>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
                Uploaded at: {new Date(file.uploaded_at).toLocaleString()}
              </Typography>
            </Box>
          )}

          <Box sx={{ mt: 1 }}>
            {renderStatus()}
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          {isEditing ? (
            <>
              <IconButton onClick={handleRename}>
                <Save />
              </IconButton>
              <IconButton onClick={() => setIsEditing(false)}>
                <Close />
              </IconButton>
            </>
          ) : (
            <>
              <Tooltip title="Rename">
                <IconButton onClick={() => setIsEditing(true)}>
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton color="error" onClick={handleDeleteClick}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Box>
      </ListItem>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)} fullWidth maxWidth="xs">
      <IconButton
          onClick={() => setConfirmOpen(false)}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "#999",
          }}
        >
          ×
        </IconButton>
        <DialogTitle sx={{ fontWeight: 600, fontSize: "18px" }}>
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <Typography fontSize="14px" marginBottom={2}>
            Are you sure you want to delete this manual?
            <br />
            <strong>This action cannot be undone and will delete its associated embeddings.</strong>
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "flex-end", gap: 1, px: 3, pb: 2 }}>
          <Button
            onClick={() => setConfirmOpen(false)}
            sx={{
              fontSize: "12px",
              padding: "4px 10px",
              backgroundColor: "#e0e0e0",
              color: "#333",
              "&:hover": {
                backgroundColor: "#d5d5d5",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
            sx={{
              fontSize: "12px",
              padding: "4px 12px",
              "&:hover": {
                backgroundColor: "#b71c1c",
              },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ManualItem;
