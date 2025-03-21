import React, { useState, useEffect } from "react";
import { Container, Box, Typography, Divider, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import Loading from "../../components/Loading";
import { ArrowBack } from "@mui/icons-material";
import AIResponseDialog from "../aiResponseDialog";
import aiResponseStore from "../../stores/aiResponseStore";
import EmailFilter from "../emailFilter";
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
    // If no email is passed in location, redirect to inbox page
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
      {loading ? (
        <Loading />
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Back Button */}
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
            {/* <Typography variant="h4" color="primary" gutterBottom>
              Emails
            </Typography> */}
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
              {loading ? (
                <Loading />
              ) : email ? (
                <EmailCard
                  key={email.id}
                  email={email}
                  handleAIResponse={handleAIResponse}
                  handleReply={handleAIResponse}
                  handleSendEmail={handleSendEmail}
                />
              ) : (
                <Typography
                  variant="body1"
                  color="textSecondary"
                  align="center"
                >
                  No emails available.
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      )}

      {/* AI Response Dialog */}
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
