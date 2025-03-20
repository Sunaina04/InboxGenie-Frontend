import React, { useState } from "react";
import {
  Box,
  Container,
  Divider,
  Typography,
  Button,
  List,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import SentMailItem from "../sentMailItem";

const sentEmailsData = [
  {
    id: 1,
    sender: "business@example.com",
    recipients: ["john.doe@example.com"],
    subject: "Meeting Scheduled",
    snippet: "We have a meeting scheduled for tomorrow at 2 PM.",
    timestamp: "1 hour ago",
    isSelected: false,
  },
  {
    id: 2,
    sender: "business@example.com",
    recipients: ["alice.smith@example.com"],
    subject: "Project Update",
    snippet: "Here's an update on the current project progress.",
    timestamp: "3 hours ago",
    isSelected: false,
  },
  {
    id: 3,
    sender: "business@example.com",
    recipients: ["bob.jones@example.com"],
    subject: "Invoice #12345",
    snippet: "Attached is your invoice for this month's services.",
    timestamp: "1 day ago",
    isSelected: false,
  },
];

const SentMails = () => {
  const [sentEmails, setSentEmails] = useState(sentEmailsData);
  const [selectedEmails, setSelectedEmails] = useState([]);

  const handleSelectEmail = (emailId) => {
    const updatedEmails = sentEmails.map((email) =>
      email.id === emailId ? { ...email, isSelected: !email.isSelected } : email
    );
    setSentEmails(updatedEmails);
    setSelectedEmails(updatedEmails.filter((email) => email.isSelected));
  };

  const handleDeleteEmail = (emailId) => {
    const updatedEmails = sentEmails.filter((email) => email.id !== emailId);
    setSentEmails(updatedEmails);
  };

  const handleBulkDelete = () => {
    const updatedEmails = sentEmails.filter((email) => !email.isSelected);
    setSentEmails(updatedEmails);
    setSelectedEmails([]);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f5f5f5",
        padding: "16px",
      }}
    >
      <Container sx={{ maxWidth: "800px", margin: "0 auto", padding: "16px" }}>
        <Typography
          variant="h5"
          sx={{ margin: "16px 0", fontWeight: 600, color: "#202124" }}
        >
          Sent Mails
        </Typography>
        <Divider sx={{ marginBottom: "16px", borderColor: "#e0e0e0" }} />

        {/* Bulk Action Buttons */}
        <Box
          display="flex"
          justifyContent="flex-start"
          sx={{ marginBottom: "16px", gap: "8px" }}
        >
          <Button
            variant="outlined"
            color="primary"
            startIcon={<Delete />}
            onClick={handleBulkDelete}
            disabled={selectedEmails.length === 0}
            sx={{
              fontWeight: 600,
              fontSize: "14px",
              paddingX: "16px",
              borderRadius: "24px",
              borderColor: "#007aff",
              color: "#007aff",
              "&:hover": {
                borderColor: "#0062cc",
              },
            }}
          >
            Delete Selected
          </Button>
        </Box>

        {/* Sent Emails List */}
        <List sx={{ padding: 0 }}>
          {sentEmails.map((email) => (
            <SentMailItem
              key={email.id}
              email={email}
              onSelect={handleSelectEmail}
              onDelete={handleDeleteEmail}
            />
          ))}
        </List>
      </Container>
    </Box>
  );
};

export default SentMails;
