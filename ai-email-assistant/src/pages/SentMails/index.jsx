import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Divider,
  Typography,
  Button,
  Pagination,
  List,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import EmailItem from "../emailItem";
import authStore from "../../stores/authStore";

const SentMails = () => {
  const [sentEmails, setSentEmails] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [emailsPerPage] = useState(5);
  const navigate = useNavigate();

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

  const handleEmailClick = (emailId) => {
    const clickedEmail = sentEmails.find((email) => email.id === emailId);
    console.log("clicked email", clickedEmail);
    navigate(`/sent_email/${clickedEmail.id}`, { state: clickedEmail });
  };

   useEffect(() => {
      authStore.fetchSentEmails();
      const fetchedSentEmails = JSON.parse(localStorage.getItem("sentEmails")) || [];
      setSentEmails(fetchedSentEmails);
    }, [])
    
  const indexOfLastEmail = currentPage * emailsPerPage;
  const indexOfFirstEmail = indexOfLastEmail - emailsPerPage;
  const currentEmails = sentEmails.slice(indexOfFirstEmail, indexOfLastEmail);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
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
          {currentEmails.map((email) => (
            <EmailItem
              key={email.id}
              email={email}
              onSelect={handleSelectEmail}
              onClick={() => handleEmailClick(email.id)}
              onDelete={handleDeleteEmail}
            />
          ))}
        </List>
        <Pagination
          count={Math.ceil(sentEmails.length / emailsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          sx={{ marginTop: "16px", display: "flex", justifyContent: "center" }}
        />
      </Container>
    </Box>
  );
};

export default SentMails;
