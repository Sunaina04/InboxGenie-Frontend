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
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import EmailItem from "../emailItem";
import CustomPagination from "../../components/CustomPagination";
import authStore from "../../stores/authStore";
import { observer } from "mobx-react-lite";

const SentMails = observer(() => {
  const [sentEmails, setSentEmails] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [emailsPerPage] = useState(8);
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
    if (clickedEmail) {
      navigate(`/sent_email/${clickedEmail.id}`, {
        state: { email: clickedEmail },
        replace: true
      });
    }
  };

  useEffect(() => {
    authStore.fetchSentEmails();
    const fetchedSentEmails =
      JSON.parse(localStorage.getItem("sentEmails")) || [];
    setSentEmails(fetchedSentEmails);
  }, []);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const totalItems = sentEmails.length;
  const totalPages = Math.ceil(totalItems / emailsPerPage); // Calculate total pages

  const indexOfLastEmail = currentPage * emailsPerPage;
  const indexOfFirstEmail = indexOfLastEmail - emailsPerPage;
  const currentSentEmails = sentEmails.slice(indexOfFirstEmail, indexOfLastEmail);

  return (
    <>
      <Box display="flex" alignItems="center" marginBottom={2}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: "#333", marginBottom: "16px", marginRight: "16px" }}
        >
          Sent Mails
        </Typography>
        <Box display="flex" gap={1} sx={{ marginLeft: "50px", alignItems: "center" }}>
          <Button
            variant="text"
            startIcon={<Delete sx={{ color: "#9e9b9b" }} />}
            sx={{
              color: "#9e9b9b",
              padding: "4px 8px",
              marginLeft: "20px",
              fontSize: "14px",
              minWidth: "150px",
              backgroundColor: "#e8e6e6",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.2)",
              }
            }}
            onClick={handleBulkDelete} // Add bulk delete functionality
          >
            Delete
          </Button>
        </Box>
      </Box>
      <List sx={{ padding: 0 }}>
        {currentSentEmails.map((email) => (
          <EmailItem
            key={email.id}
            email={email}
            onSelect={handleSelectEmail}
            onClick={handleEmailClick}
            onDelete={handleDeleteEmail}
          />
        ))}
      </List>
      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={emailsPerPage}
        onPageChange={handlePageChange}
      />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={authStore.isLoadingEmails}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
});

export default SentMails;
