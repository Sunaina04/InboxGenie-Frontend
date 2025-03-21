import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { ArrowForward, Reply, Forward } from "@mui/icons-material";
import ReplySection from "../replySection";
import aiResponseStore from "../../stores/aiResponseStore";

const EmailCard = ({
  email,
  handleAIResponse,
  handleReply,
  handleForward,
  handleSendEmail,
}) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [aiResponse, setAIResponse] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleSendReply = (message) => {
    console.log("Reply sent:", message);
    setShowReplyBox(false);
  };

  return (
    <Paper
      sx={{
        padding: 3,
        borderRadius: 2,
        backgroundColor: "#ffffff",
        boxShadow: 4,
        mb: 3,
        "&:hover": { boxShadow: 8 },
      }}
    >
      <Typography variant="h5" color="primary" fontWeight={700}>
        Subject: {email.subject || "No Subject"}
      </Typography>
      <Box display="flex" justifyContent="space-between" my={1}>
        <Typography variant="body2" color="textSecondary">
          <strong>From:</strong> {email.from}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {new Date(email.date).toLocaleString()}
        </Typography>
      </Box>
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{
          whiteSpace: "pre-line",
          color: "#333",
          mb: 3,
          lineHeight: 1.6,
          maxHeight: "200px",
          overflowY: "auto",
        }}
      >
        {email.body}
      </Typography>

      <Box display="flex" justifyContent="space-between">
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleAIResponse(email)}
          sx={{ textTransform: "none", fontWeight: 600, borderRadius: 2 }}
          endIcon={<ArrowForward />}
        >
          Generate Response
        </Button>
        <Box display="flex" alignItems="center">
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              generateAIResponse();
              setShowReplyBox(!showReplyBox);
            }}
            sx={{
              textTransform: "none",
              marginLeft: 1,
              fontWeight: 600,
              borderRadius: 2,
            }}
            startIcon={<Reply />}
          >
            Reply
          </Button>
          {/* <Button
            variant="outlined"
            color="primary"
            onClick={() => handleForward(email)}
            sx={{
              textTransform: "none",
              marginLeft: 1,
              fontWeight: 600,
              borderRadius: 2,
            }}
            startIcon={<Forward />}
          >
            Forward
          </Button> */}
        </Box>
      </Box>

      {loading && (
        <CircularProgress
          size={24}
          sx={{ position: "absolute", top: "50%", left: "50%" }}
        />
      )}

      {showReplyBox && (
        <ReplySection
          email={email}
          handleSendReply={handleSendReply}
          handleCancel={() => setShowReplyBox(false)}
          aiResponse={aiResponse}
          handleSendEmail={handleSendEmail}
        />
      )}
    </Paper>
  );
};

export default EmailCard;
