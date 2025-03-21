import React from "react";
import { Box, Typography, Checkbox, ListItem, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const EmailItem = ({ email, onSelect, onClick, onDelete }) => {
  const getSenderName = (sender) => {
    const match = sender.match(/(.*)<(.*)>/);
    return match ? match[1].trim() : sender;
  };

  const getSenderEmail = (sender) => {
    const match = sender.match(/(.*)<(.*)>/);
    return match ? match[2].trim() : "";
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
          backgroundColor: "#f5f5f5",
        },
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
          {email.timestamp}
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
