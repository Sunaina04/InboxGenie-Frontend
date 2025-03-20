import React from "react";
import { Box, Typography, Checkbox, ListItem, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const SentMailItem = ({ email, onSelect, onDelete, onClick }) => {
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
      {/* Left Section (Checkbox + Sender and Recipient) */}
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
              backgroundColor: "transparent", // No background color change on hover
            },
          }}
        />

        {/* Sender and Recipient Info */}
        <Box>
          <Typography
            variant="body1"
            sx={{ fontWeight: 600, color: "#202124", fontSize: "15px" }}
          >
            {email.sender}
          </Typography>

          {/* Recipients */}
          <Typography
            variant="body2"
            sx={{ color: "#5f6368", fontSize: "14px" }}
          >
            To: {email.recipients.join(", ")}
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

export default SentMailItem;
