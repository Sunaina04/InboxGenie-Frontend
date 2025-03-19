import React, { useState, useEffect } from "react";
import { Container, Box, Typography, Divider, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import Loading from "../../components/Loading";
import { ArrowBack } from "@mui/icons-material";
import AIResponseDialog from "../aiResponseDialog";
import aiResponseStore from "../../stores/aiResponseStore";

const EmailDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState(location.state || {});
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [aiResponse, setAIResponse] = useState("");

  useEffect(() => {
    // If no email is passed in location, redirect to inbox page
    if (!email) {
      navigate("/inbox");
    }
  }, [email, navigate]);

  const handleAIResponse = () => {
    setLoading(true);
    aiResponseStore.fetchAIResponse(email.body).then(() => {
      setAIResponse(aiResponseStore.aiResponse);
      setOpenDialog(true);
      setLoading(false);
    });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setAIResponse("");
  };

  return (
    <Container sx={{ maxWidth: "900px", padding: 4 }}>
      {loading ? (
        <Loading />
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Back Button */}
          <Button
            variant="text"
            color="primary"
            startIcon={<ArrowBack />}
            onClick={() => navigate("/inbox")}
          >
            Back to Inbox
          </Button>

          {/* Email Header */}
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            {email.subject}
          </Typography>

          <Typography variant="body1" color="textSecondary">
            From: {email.sender} <br />
            Sent: {email.timestamp} <br />
            To: {email.receiver}
          </Typography>

          <Divider sx={{ marginY: 2 }} />

          {/* Email Body */}
          <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
            {email.body}
          </Typography>

          <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
            {/* Action Buttons */}
            <Button
              variant="outlined"
              color="primary"
              onClick={handleAIResponse}
              sx={{ fontWeight: 600 }}
            >
              Generate AI Response
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => alert("Delete email")}
              sx={{ fontWeight: 600 }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      )}

      {/* AI Response Dialog */}
      <AIResponseDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        aiResponse={aiResponse}
        handleApprove={() => alert("Approved")}
        handleEdit={() => alert("Edit")}
        handleSend={() => alert("Sent")}
      />
    </Container>
  );
};

export default EmailDetail;
