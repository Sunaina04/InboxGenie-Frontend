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
import { useLocation, useNavigate } from "react-router-dom";
import { observer } from 'mobx-react-lite';
import ForwardIcon from '@mui/icons-material/Forward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { toast } from "react-hot-toast";

const EmailCard = observer(({
  email,
  handleAIResponse,
  handleReply,
  handleSendEmail,
  openInEditMode,
}) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [aiResponse, setAIResponse] = useState("");
  const [loading, setLoading] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
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

  // const handleAutoReply = async () => {
  //   try {
  //     await aiResponseStore.sendAutoReply([email.id]);
  //     console.log("Auto reply sent to:", email.id);
  //   } catch (error) {
  //     console.error("Error sending auto reply:", error);
  //   }
  // };
  const handleAutoReply = async () => {
    setLoading(true);
    try {
      const accessToken = localStorage.getItem("gmail_access_token");
      if (!accessToken) {
        toast.error("Access token not found. Please log in again.");
        return;
      }
      await aiResponseStore.triggerAutoReply(accessToken, email);
      // setIsAutoReplyEnabled(!isAutoReplyEnabled);
    } catch (error) {
      console.error("Error triggering auto-reply:", error);
      toast.error("Failed to trigger auto-reply");
    } finally {
      setLoading(false);
    }
  };

  const handleBlankReply = () => {
    if (!email) return;
    // const signature = "--\nYour Name";
    // setAIResponse(`\n\n${signature}`);
    // setOpenDialog(true);
  };
  
  // Updated function to extract name and email
  const getSenderInfo = (emailString) => {
    // Use a regular expression to extract the name and email
    const regex = /^(.*) <(.*)>$/;
    const match = emailString.match(regex);

    if (match) {
      return {
        name: match[1].trim(), // Extracted name
        email: match[2].trim(), // Extracted email
      };
    }

    // Fallback if the format is not as expected
    return {
      name: "Unknown Sender",
      email: "unknown@example.com",
    };
  };

  // Get sender info based on path
  const senderInfo = isSentMail ? getSenderInfo(email.to) : getSenderInfo(email.from);
  console.log(senderInfo)

  return (
    <>
      {/* Back Button */}
      <Button
        onClick={() => navigate('/inbox')}
        sx={{
          marginBottom: 4,
          color: "#666",
          textTransform: "none",
          "&:hover": {
                backgroundColor: "#e0e0e0",
              },
        }}
        startIcon={<ArrowBackIcon sx={{ color: "#666", fontSize: "18px", marginRight: "5px"}}  />}
      >
       Back 
      </Button>

      {/* Header Section */}
      <Box display="flex" alignItems="center" mb={4}>
        <Avatar
          sx={{
            width: 40,
            height: 40,
            color: "#1C1F26",
            bgcolor: "#EFEFEF",
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
              handleBlankReply();
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
            startIcon={<ForwardIcon sx={{ color: "#666", fontSize: "18px" }} />}
          >
            Generate AI Response
          </Button>
          <Button
            variant="contained"
            onClick={handleAutoReply}
            sx={{
              backgroundColor: "#007aff",
              color: "#fff",
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
            Auto Reply
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
          editMode={true}
        />
      )}
    </>
  );
});

export default EmailCard;
