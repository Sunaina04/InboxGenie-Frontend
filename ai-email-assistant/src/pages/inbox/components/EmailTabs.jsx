import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import ContactPageIcon from "@mui/icons-material/ContactPage";

const tabs = [
  { label: "All", value: "primary", icon: <MailIcon /> },
  { label: "Support", value: "support", icon: <SupportAgentIcon /> },
  { label: "Grievances", value: "grievance", icon: <ReportProblemIcon /> },
  { label: "Inquiry", value: "inquiry", icon: <ContactPageIcon /> },
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
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            padding: "10px 16px",
            borderRadius:"8px",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              color: "#0848d1",
              backgroundColor: "#f0f0f0",
            },
          }}
        >
          {tab.icon}
          {tab.label}
        </Typography>
      ))}
    </Box>
  );
};

export default EmailTabs;
