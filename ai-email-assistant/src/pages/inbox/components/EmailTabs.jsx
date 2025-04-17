import React, { useState } from "react";
import { Box, Typography } from "@mui/material";

const tabs = [
  { label: "Primary Mails", value: "primary" },
  { label: "Support", value: "support" },
  { label: "Grievances", value: "grievance" },
  { label: "Inquiry", value: "inquiry" },
];

const EmailTabs = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState("primary");

  const handleTabClick = (value) => {
    setActiveTab(value);
    onTabChange(value);
  };

  return (
    <Box display="flex" gap={10} mb={2}>
      {tabs.map((tab) => (
        <Typography
          key={tab.value}
          variant="h6"
          onClick={() => handleTabClick(tab.value)}
          sx={{
            cursor: "pointer",
            fontWeight: 500,
            color: activeTab === tab.value ? "#407BFF" : "#9e9b9b",            
            paddingBottom: "4px",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              color: "#0848d1",
            },
          }}
        >
          {tab.label}
        </Typography>
      ))}
    </Box>
  );
};

export default EmailTabs;
