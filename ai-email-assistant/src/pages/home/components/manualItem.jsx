import React, { useState } from "react";
import {
  ListItem,
  ListItemText,
  IconButton,
  Box,
  TextField,
  Tooltip,
  Typography,
  CircularProgress
} from "@mui/material";
import { Delete, Edit, Save, Close } from "@mui/icons-material";
import manualStore from "../../../stores/mannualStore";

const ManualItem = ({ file }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newFilename, setNewFilename] = useState(file.filename || "Unnamed manual");

  const handleRename = async () => {
    if (newFilename.trim() && newFilename !== file.filename) {
      await manualStore.renameManual(file.id, newFilename.trim());
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this manual?\n\nThis action will also delete its associated embeddings and cannot be undone."
    );
    if (confirmed) {
      manualStore.deleteManual(file.id);
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
        
        {/* Display Embedding Status */}
        <Box sx={{ mt: 1 }}>
          {renderStatus()}
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 1, ml: 2 }}>
        {isEditing ? (
          <>
            <Tooltip title="Save">
              <IconButton onClick={handleRename} color="primary">
                <Save />
              </IconButton>
            </Tooltip>
            <Tooltip title="Cancel">
              <IconButton
                onClick={() => {
                  setIsEditing(false);
                  setNewFilename(file.filename || "Unnamed manual");
                }}
              >
                <Close />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <>
            <Tooltip title="Rename">
              <IconButton onClick={() => setIsEditing(true)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton onClick={handleDelete} sx={{ color: "error.main" }}>
                <Delete />
              </IconButton>
            </Tooltip>
          </>
        )}
      </Box>
    </ListItem>
  );
};

export default ManualItem;
