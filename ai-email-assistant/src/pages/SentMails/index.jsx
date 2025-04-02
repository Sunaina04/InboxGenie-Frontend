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

const SentMails = () => {
  const [sentEmails, setSentEmails] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [emailsPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
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
    const fetchedSentEmails =
      JSON.parse(localStorage.getItem("sentEmails")) || [];
    setSentEmails(fetchedSentEmails);
  }, []);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastEmail = currentPage * emailsPerPage;
  const indexOfFirstEmail = indexOfLastEmail - emailsPerPage;
  const currentSentEmails = sentEmails?.slice(indexOfFirstEmail, indexOfLastEmail);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#f4f5f7",
        height: "100vh",
        // minWidth: "1200px", // Increased minimum width
        width: "calc(100% - 2 0px)",
      }}
    >
      <Container sx={{ flex: 1, 
        marginLeft: "20px", 
        marginRight: "20px", 
        padding: "16px", 
        maxWidth: "100%",
        }}>
        <Box display="flex" alignItems="center" marginBottom={2}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: "#333", marginBottom: "16px", marginRight: "16px" }}
        >
          Sent Mails
        </Typography>
        {/* <Divider sx={{ marginBottom: "16px", borderColor: "#e0e0e0" }} /> */}

        {/* Bulk Action Buttons */}
        <Box
          display="flex" gap={1} sx={{ marginLeft: "50px", alignItems: "center" }}
        >
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
            >
            Delete
          </Button>
        </Box>
        </Box>
        {/* Sent Emails List */}
        <List sx={{ padding: 0 }}>
          {currentSentEmails?.map((email) => (
            <EmailItem
              key={email.id}
              email={email}
              onSelect={handleSelectEmail}
              onClick={() => handleEmailClick(email.id)}
              onDelete={handleDeleteEmail}
            />
          ))}
        </List>
        <CustomPagination
          count={Math.ceil(sentEmails.length / emailsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
        />
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Container>
    </Box>
  );
};

export default SentMails;
