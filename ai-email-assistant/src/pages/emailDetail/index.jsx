import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import AIResponseDialog from "../aiResponseDialog";
import aiResponseStore from "../../stores/aiResponseStore";
import EmailFilter from "./components/emailFilter";
import EmailCard from "../emailCard";
import emailStore from "../../stores/emailStore";
import toast from "react-hot-toast";

const EmailDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState(location.state || {});
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [aiResponse, setAIResponse] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    if (!email) {
      navigate("/inbox");
    }
  }, [email, navigate]);

  const handleAIResponse = () => {
    setLoading(true);
    aiResponseStore
      .fetchAIResponse(email.to, email.from, email.subject, email.body)
      .then(() => {
        setAIResponse(aiResponseStore.aiResponse);
        setOpenDialog(true);
        setLoading(false);
      });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setAIResponse("");
  };

  const handleSendEmail = () => {
    setLoading(true);
    if (!email) {
      toast.error("No email selected.");
      setLoading(false);
      return;
    }

    emailStore.sendEmail({
      to: email.from,
      from: email.to,
      subject: `Re: ${email.subject}`,
      body: aiResponse,
    });
    setLoading(false);
  };

  return (
    <Container sx={{ maxWidth: "900px", padding: 4 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<ArrowBack />}
          onClick={() => navigate("/inbox")}
        >
          Back to Inbox
        </Button>
        <EmailFilter filter={filter} setFilter={setFilter} />

        <Box sx={{ flexGrow: 1, padding: 4 }}>
          <Box
            sx={{
              display: "grid",
              gap: 3,
              gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
              padding: 2,
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            {email ? (
              <EmailCard
                key={email.id}
                email={email}
                handleAIResponse={handleAIResponse}
                handleReply={handleAIResponse}
                handleSendEmail={handleSendEmail}
              />
            ) : (
              <Typography variant="body1" color="textSecondary" align="center">
                No emails available.
              </Typography>
            )}
          </Box>
        </Box>
      </Box>

      {loading && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          <CircularProgress size={50} />
        </Box>
      )}

      <AIResponseDialog
        open={openDialog}
        email={email}
        handleClose={handleCloseDialog}
        aiResponse={aiResponse}
        handleApprove={() => alert("Approved")}
        handleEdit={() => alert("Edit")}
        handleSend={handleSendEmail}
      />
    </Container>
  );
};

export default EmailDetail;
