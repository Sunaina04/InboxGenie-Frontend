import React from "react";
import { Box, Typography, Checkbox, ListItem, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const EmailItem = ({ email, onSelect, onClick, onDelete }) => {
  // Function to clean up the sender's name and email address
  const getSenderName = (sender) => {
    const match = sender.match(/(.*)<(.*)>/); // Matches "Name <email>"
    return match ? match[1].trim() : sender; // Extracts the name if available
  };

  const getSenderEmail = (sender) => {
    const match = sender.match(/(.*)<(.*)>/); // Matches "Name <email>"
    return match ? match[2].trim() : ""; // Extracts the email address if available
  };

  return (
    <ListItem
      button
      onClick={onClick}
      sx={{
        padding: "12px 16px",
        borderBottom: "1px solid #e0e0e0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        "&:hover": {
          backgroundColor: "#f5f5f5", // Highlight on hover
        },
      }}
    >
      {/* Left Section (Checkbox + Sender) */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {/* Checkbox */}
        <Checkbox
          checked={email.isSelected}
          onChange={() => onSelect(email.id)}
          sx={{
            color: "#007aff",
            "&.Mui-checked": {
              color: "#007aff",
            },
            "&:hover": {
              backgroundColor: "transparent", // Avoid background color change on hover
            },
          }}
        />

        {/* Sender Info */}
        <Box>
          <Typography
            variant="body1"
            sx={{ fontWeight: 600, color: "#202124", fontSize: "15px" }}
          >
            {getSenderName(email.from)}{" "}
            {getSenderEmail(email.from) && (
              <Typography
                variant="caption"
                sx={{
                  color: "#5f6368",
                  fontSize: "12px",
                  fontWeight: 400,
                  marginLeft: 1,
                }}
              >
                &lt;{getSenderEmail(email.from)}&gt;
              </Typography>
            )}
          </Typography>

          {/* Email Snippet */}
          <Typography
            variant="body2"
            sx={{ color: "#5f6368", fontSize: "14px" }}
          >
            {email.snippet}
          </Typography>
        </Box>
      </Box>

      {/* Right Section (Timestamp + Delete Icon) */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {/* Timestamp */}
        <Typography variant="caption" sx={{ color: "#5f6368" }}>
          {email.timestamp}
        </Typography>

        {/* Delete Icon */}
        <IconButton
          edge="end"
          color="error"
          onClick={() => onDelete(email.id)}
          sx={{
            "&:hover": {
              backgroundColor: "transparent", // No background color change on hover
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
