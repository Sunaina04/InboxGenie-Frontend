import React from "react";
import { Box, Typography, Checkbox, ListItem, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLocation } from "react-router-dom";

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

const EmailItem = ({ email, onSelect, onClick, onDelete }) => {
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

  return (
    <ListItem
      button
      onClick={() => onClick(email.id)}
      sx={{
        padding: "12px 16px",
        borderBottom: "1px solid #e0e0e0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: email.is_read ? "#f8f9fa" : "#ffffff",
        "&:hover": {
          backgroundColor: email.is_read ? "#f1f3f4" : "#f5f5f5",
        },
        borderLeft: email.is_read ? "none" : "4px solid #007aff",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Checkbox
          checked={email.isSelected}
          onChange={() => onSelect(email.id)}
          sx={{
            color: "#007aff",
            "&.Mui-checked": {
              color: "#007aff",
            },
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        />

        <Box>
          <Typography
            variant="body1"
            sx={{ 
              fontWeight: email.is_read ? 400 : 600, 
              color: "#202124", 
              fontSize: "15px" 
            }}
          >
            {getSenderName(displayEmail)}{" "}
            {getSenderEmail(displayEmail) && (
              <Typography
                variant="caption"
                sx={{
                  color: "#5f6368",
                  fontSize: "12px",
                  fontWeight: 400,
                  marginLeft: 1,
                }}
              >
                &lt;{getSenderEmail(displayEmail)}&gt;
              </Typography>
            )}
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: "#5f6368", fontSize: "14px" }}
          >
            {email.snippet}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography variant="caption" sx={{ color: "#5f6368" }}>
          {formatDate(email.date)}
        </Typography>

        <IconButton
          edge="end"
          color="error"
          onClick={() => onDelete(email.id)}
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
