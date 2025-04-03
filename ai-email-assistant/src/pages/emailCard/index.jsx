import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Avatar,
  Divider,
} from "@mui/material";
import { Reply } from "@mui/icons-material";
import ReplySection from "../replySection";
import aiResponseStore from "../../stores/aiResponseStore";
import { useLocation } from "react-router-dom";

const EmailCard = ({
  email,
  handleAIResponse,
  handleReply,
  handleSendEmail,
}) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [aiResponse, setAIResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const isSentMail = location.pathname === "/sent" || location.pathname.includes("/sent_email");

  const generateAIResponse = () => {
    setLoading(true);
    aiResponseStore
      .fetchAIResponse(email.to, email.from, email.subject, email.body)
      .then(() => {
        setAIResponse(aiResponseStore.aiResponse);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching AI response:", error);
      });
  };

  // Updated function to extract name and email
  const getSenderInfo = (emailString) => {
    if (!emailString) return { name: '', email: '' };

    // Remove angular brackets if present
    const cleanEmail = emailString.replace(/[<>]/g, '');

    // Check if the email contains a name in the format "Name <email@example.com>"
    const nameMatch = emailString.match(/"([^"]+)"\s*<(.+)>/);
    if (nameMatch) {
      return {
        name: nameMatch[1],
        email: nameMatch[2]
      };
    }

    // Check for format "Name email@example.com"
    const spaceMatch = cleanEmail.match(/^([^@\s]+)\s+([^@\s]+@[^@\s]+\.[^@\s]+)$/);
    if (spaceMatch) {
      return {
        name: spaceMatch[1],
        email: spaceMatch[2]
      };
    }

    // If no name found, return the email as both name and email
    return {
      name: cleanEmail,
      email: cleanEmail
    };
  };

  // Get sender info based on path
  const senderInfo = isSentMail ? getSenderInfo(email.to) : getSenderInfo(email.from);

  return (
    <Paper
      sx={{
        padding: "24px",
        borderRadius: "8px",
        backgroundColor: "#ffffff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        mb: 3,
        width: "100%",
        maxWidth: "1200px",
        mx: "auto",
        borderTop: "3px solid #554FEB",
      }}
    >
      {/* Header Section */}
      <Box display="flex" alignItems="center" mb={2}>
        <Avatar
          sx={{
            width: 40,
            height: 40,
            bgcolor: "#554FEB",
            marginRight: "16px",
          }}
        >
          {senderInfo.name.charAt(0)}
        </Avatar>
        <Box flex={1}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography
              variant="h6"
              sx={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#333",
              }}
            >
              {senderInfo.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#666",
                fontSize: "14px",
              }}
            >
              {new Date(email.date).toLocaleString()}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{
              color: "#666",
              fontSize: "14px",
            }}
          >
            {senderInfo.email}
          </Typography>
        </Box>
      </Box>

      {/* Subject */}
      <Typography
        variant="h5"
        sx={{
          fontSize: "16px",
          fontWeight: 600,
          color: "#333",
          mb: 4,
        }}
      >
        {email.subject || "No Subject"}
      </Typography>

      {/* Email Body */}
      <Typography
        variant="body1"
        sx={{
          color: "#444",
          lineHeight: 1.6,
          fontSize: "14px",
          ml: 2,
          mt: 4,
          mb: 6,
          whiteSpace: "pre-line",
        }}
      >
        {email.body}
      </Typography>

      <Divider sx={{ my: 2 }} />

      {/* Action Buttons - Only show for inbox emails */}
      {!isSentMail && (
        <Box display="flex" gap={2}>
          <Button
            variant="contained"
            onClick={() => {
              generateAIResponse();
              setShowReplyBox(!showReplyBox);
            }}
            sx={{
              backgroundColor: "#f5f5f5",
              color: "#666",
              textTransform: "none",
              borderRadius: "8px",
              padding: "4px 12px",
              minWidth: "auto",
              fontSize: "14px",
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}
            startIcon={<Reply sx={{ color: "#666", fontSize: "18px" }} />}
          >
            Reply
          </Button>
          <Button
            variant="contained"
            onClick={() => handleAIResponse(email)}
            sx={{
              backgroundColor: "#f5f5f5",
              color: "#666",
              textTransform: "none",
              borderRadius: "8px",
              border: "none",
              padding: "4px 12px",
              minWidth: "auto",
              fontSize: "14px",
              "&:hover": {
                backgroundColor: "#e0e0e0",
                border: "none",
              },
            }}
          >
            Generate AI Response
          </Button>
        </Box>
      )}

      {loading && (
        <CircularProgress
          size={24}
          sx={{ position: "absolute", top: "50%", left: "50%" }}
        />
      )}

      {showReplyBox && (
        <ReplySection
          email={email}
          handleCancel={() => setShowReplyBox(false)}
          aiResponse={aiResponse}
          handleSendEmail={handleSendEmail}
        />
      )}
    </Paper>
  );
};

export default EmailCard;
