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
  const isInbox = location.pathname.includes("sent_email");
  const backPath = isInbox ? "/sent" : "/inbox";

  useEffect(() => {
    if (!email) {
      navigate(backPath);
    }
  }, [email, navigate, backPath]);

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
    <Container
      sx={{
        maxWidth: "100%",
        padding: "24px 0",
        width: "100%",
        margin: 0,
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Box sx={{
          flex: 1,
          width: "100%",
          padding: "24px 0",
          maxWidth: "100%",
          margin: 0,
        }}>
          {email ? (
            <EmailCard
              key={email.id}
              email={email}
              handleAIResponse={!isInbox ? handleAIResponse : null}
              handleReply={!isInbox ? handleAIResponse : null}
              handleSendEmail={handleSendEmail}
            />
          ) : (
            <Typography variant="body1" color="textSecondary" align="center">
              No emails available.
            </Typography>
          )}
        </Box>
      </Box>

      {loading && (
        <Box
          sx={{
            position: "absolute",
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
