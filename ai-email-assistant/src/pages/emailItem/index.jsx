import React, { useState } from "react";
import {
  Box,
  Typography,
  Checkbox,
  ListItem,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLocation } from "react-router-dom";
import authStore from "../../stores/authStore";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();

  if (isToday) {
    return date.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  } else {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  }
};

const EmailItem = ({ email, onSelect, onClick }) => {
  const location = useLocation();
  const isSentMail = location.pathname === "/sent";
  const displayEmail = isSentMail ? email.to : email.from;

  const [confirmOpen, setConfirmOpen] = useState(false);

  const getSenderName = (sender) => {
    const match = sender.match(/(.*)<(.*)>/);
    return match ? match[1].trim() : sender;
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await authStore.deleteEmail(email.id);
      setConfirmOpen(false);
    } catch (error) {
      console.error("Error deleting email:", error);
      setConfirmOpen(false);
    }
  };

  const handleClick = (e) => {
    if (e.target.type !== "checkbox") {
      if (onClick) {
        onClick(email.id);
      }
    }
  };

  return (
    <>
      <ListItem
        button
        onClick={handleClick}
        sx={{
          borderBottom: "1px solid #e0e0e0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: email.is_read ? "#f8f9fa" : "#ffffff",
          "&:hover": {
            backgroundColor: email.is_read ? "#f1f3f4" : "#f5f5f5",
          },
          cursor: "pointer",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Checkbox
            checked={email.isSelected}
            onChange={(e) => {
              e.stopPropagation();
              onSelect(email.id);
            }}
            sx={{
              color: "#D9D9D9",
              "&.Mui-checked": {
                color: "#D9D9D9",
              },
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          />

          <Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ flex: 1, paddingRight: "16px" }}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: email.is_read ? 400 : 600,
                    color: "#202124",
                    fontSize: "14px",
                    minWidth: "180px",
                  }}
                >
                  {getSenderName(displayEmail)}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "row", gap: 4, alignItems: "baseline" }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#5f6368",
                    fontSize: "15px",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "350px",
                  }}
                >
                  {email.subject} -
                </Typography>

                <Typography
                  variant="caption"
                  sx={{
                    color: "#5f6368",
                    paddingLeft: 2,
                    fontSize: "14px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "500px",
                  }}
                >
                  {email.body || "No content available."}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, paddingLeft: 2 }}>
          <Button
            variant="outlined"
            sx={{
              borderRadius: "8px",
              borderColor: email.is_read ? "blue" : "red",
              color: email.is_read ? "white" : "red",
              backgroundColor: email.is_read ? "#007bff" : "rgba(255, 0, 0, 0.1)",
              padding: "4px 8px",
              fontSize: "12px",
              minWidth: "80px",
              "&:hover": {
                backgroundColor: email.is_read ? "#007bff" : "rgba(255, 0, 0, 0.1)",
                borderColor: email.is_read ? "blue" : "red",
              },
            }}
          >
            {email.is_read ? "Active" : "Inactive"}
          </Button>

          <Typography variant="caption" sx={{ color: "#5f6368", minWidth: "50px" }}>
            {formatDate(email.date)}
          </Typography>

          <IconButton
            edge="end"
            color="error"
            onClick={handleDeleteClick}
            sx={{
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </ListItem>

      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        fullWidth
        maxWidth="xs"

      >
        {/* Close X Button */}
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
          Confirm Email Deletion
        </DialogTitle>

        <DialogContent>
          <Typography fontSize="14px" marginBottom={2}>
            Are you sure you want to delete this email?
            <br />
            <strong>This will also remove it from your original Gmail inbox.</strong>
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

export default EmailItem;
