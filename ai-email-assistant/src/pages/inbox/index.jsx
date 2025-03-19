import React, { useState } from "react";
import {
  Box,
  Container,
  Divider,
  Typography,
  Button,
  List,
} from "@mui/material";
import { Delete, MarkEmailRead } from "@mui/icons-material";
import EmailItem from "../emailItem"; // Import EmailItem component
import { useNavigate } from "react-router-dom";

const emailsData = [
  {
    id: 1,
    subject: "Meeting Update",
    snippet: "We have a scheduled meeting at 3 PM tomorrow...",
    timestamp: "2 hours ago",
    body: "This is the full email body content for the Meeting Update.",
    sender: "john.doe@example.com",
    isSelected: false,
  },
  {
    id: 2,
    subject: "Project Status",
    snippet: "Here's the update on the project status...",
    timestamp: "5 hours ago",
    body: "This is the full email body content for Project Status.",
    sender: "alice.smith@example.com",
    isSelected: false,
  },
  {
    id: 3,
    subject: "Invoice #2345",
    snippet: "Your invoice for March has been generated...",
    timestamp: "1 day ago",
    body: "This is the full email body content for Invoice #2345.",
    sender: "accounting@example.com",
    isSelected: false,
  },
  {
    id: 4,
    subject: "Job Interview Confirmation",
    snippet: "Congratulations, your interview is scheduled for next week...",
    timestamp: "2 days ago",
    body: "This is the full email body content for Job Interview Confirmation.",
    sender: "hr@example.com",
    isSelected: false,
  },
];

const Inbox = () => {
  const [emails, setEmails] = useState(emailsData);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const navigate = useNavigate();

  const handleSelectEmail = (emailId) => {
    const updatedEmails = emails.map((email) =>
      email.id === emailId ? { ...email, isSelected: !email.isSelected } : email
    );
    setEmails(updatedEmails);
    setSelectedEmails(updatedEmails.filter((email) => email.isSelected));
  };

  const handleBulkAction = (action) => {
    if (selectedEmails.length > 0) {
      const updatedEmails = emails.map((email) =>
        selectedEmails.includes(email) ? { ...email, isSelected: false } : email
      );
      setEmails(updatedEmails);
      setSelectedEmails([]);
    }
  };

  const handleEmailClick = (emailId) => {
    const clickedEmail = emails.find((email) => email.id === emailId);
    navigate(`/email/${clickedEmail.id}`, { state: clickedEmail });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        backgroundColor: "#f5f5f5",
      }}
    >
      <Container sx={{ maxWidth: "800px", margin: "0 auto", padding: "16px" }}>
        <Typography
          variant="h5"
          sx={{ margin: "16px 0", fontWeight: 600, color: "#202124" }}
        >
          Inbox
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
            startIcon={<MarkEmailRead />}
            onClick={() => handleBulkAction("markAsRead")}
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
            Mark as Read
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<Delete />}
            onClick={() => handleBulkAction("delete")}
            disabled={selectedEmails.length === 0}
            sx={{
              fontWeight: 600,
              fontSize: "14px",
              paddingX: "16px",
              borderRadius: "24px",
              borderColor: "#d32f2f",
              color: "#d32f2f",
              "&:hover": {
                borderColor: "#c62828",
              },
            }}
          >
            Delete
          </Button>
        </Box>

        {/* Email List */}
        <List sx={{ padding: 0 }}>
          {emails.map((email) => (
            <EmailItem
              key={email.id}
              email={email}
              onSelect={handleSelectEmail}
              onClick={() => handleEmailClick(email.id)} // Pass email.id to handleEmailClick
            />
          ))}
        </List>
      </Container>
    </Box>
  );
};

export default Inbox;
