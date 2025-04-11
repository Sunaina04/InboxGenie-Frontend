import React from "react";
import { Box, Typography, Checkbox, ListItem, IconButton, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLocation } from "react-router-dom";
import authStore from "../../stores/authStore";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();

  if (isToday) {
    // For today's emails, show time (e.g., "2:30 PM")
    return date.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  } else {
    // For older emails, show date format (e.g., "Mar 25")
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  }
};

const EmailItem = ({ email, onSelect, onClick }) => {
  const location = useLocation();
  const isSentMail = location.pathname === "/sent";

  const getSenderName = (sender) => {
    const match = sender.match(/(.*)<(.*)>/);
    return match ? match[1].trim() : sender;
  };

  const getSenderEmail = (sender) => {
    const match = sender.match(/(.*)<(.*)>/);
    return match ? match[2].trim() : "";
  };

  const displayEmail = isSentMail ? email.to : email.from;

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      await authStore.deleteEmail(email.id);
    } catch (error) {
      console.error("Error deleting email:", error);
    }
  };

  const handleClick = (e) => {
    if (onClick) {
      onClick(email.id);
    }
  };

  return (
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
            color: "#202124",
            "&.Mui-checked": {
              color: "#007aff",
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
                  fontSize: "15px",
                  minWidth: "180px",
                }}
              >
                {getSenderName(displayEmail)}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                variant="caption"
                sx={{
                  color: "#5f6368",
                  fontSize: "14px",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}
              >
                {email.subject}
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

        <Typography variant="caption" sx={{ color: "#5f6368", minWidth: "100px" }}>
          {formatDate(email.date)}
        </Typography>

        <IconButton
          edge="end"
          color="error"
          onClick={handleDelete}
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
  );
};

export default EmailItem;
