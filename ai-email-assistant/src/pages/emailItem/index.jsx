import React from "react";
import {
  Box,
  Typography,
  Checkbox,
  ListItem,
  ListItemText,
} from "@mui/material";

const EmailItem = ({ email, onSelect, onClick }) => {
  return (
    <ListItem
      button
      onClick={onClick}
      sx={{ padding: "12px 16px", borderBottom: "1px solid #e0e0e0" }}
    >
      <Checkbox
        checked={email.isSelected}
        onChange={() => onSelect(email.id)}
        sx={{ marginRight: 2, color: "#007aff" }}
      />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Typography
          variant="body1"
          sx={{ fontWeight: 600, color: "#202124", fontSize: "15px" }}
        >
          {email.subject}
        </Typography>
        <Typography variant="body2" sx={{ color: "#5f6368", fontSize: "14px" }}>
          {email.snippet}
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: "#5f6368", display: "block" }}
        >
          {email.timestamp}
        </Typography>
      </Box>
    </ListItem>
  );
};

export default EmailItem;
