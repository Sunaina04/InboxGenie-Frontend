import React, { useState, useEffect } from "react";
import { Container, Box, Typography } from "@mui/material";
import EmailCard from "../emailCard";
import Loading from "../../components/Loading";
import AIResponseDialog from "../aiResponseDialog";
import EmailFilter from "../emailFilter";
import aiResponseStore from "../../stores/aiResponseStore";

const Dashboard = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [aiResponse, setAIResponse] = useState("");

  useEffect(() => {
    const fetchedEmails = JSON.parse(localStorage.getItem("email")) || [];
    setEmails(fetchedEmails);
    setLoading(false);
  }, []);

  const handleAIResponse = (email) => {
    aiResponseStore.fetchAIResponse(email.body).then(() => {
      setSelectedEmail(email);
      setAIResponse(aiResponseStore.aiResponse);
      setOpenDialog(true);
    });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedEmail(null);
    setAIResponse("");
  };

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <EmailFilter filter={filter} setFilter={setFilter} />
      <Box sx={{ flexGrow: 1, padding: 4 }}>
        <Typography variant="h4" color="primary" gutterBottom>
          Emails
        </Typography>
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
          ) : emails.length > 0 ? (
            emails.map((email) => (
              <EmailCard
                key={email.id}
                email={email}
                handleAIResponse={handleAIResponse}
              />
            ))
          ) : (
            <Typography variant="body1" color="textSecondary" align="center">
              No emails available.
            </Typography>
          )}
        </Box>
      </Box>

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

export default Dashboard;
