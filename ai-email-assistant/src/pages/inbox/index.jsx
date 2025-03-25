import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Divider,
  Typography,
  Button,
  List,
  Pagination,
  Grid,
} from "@mui/material";
import { Delete, MarkEmailRead } from "@mui/icons-material";
import EmailItem from "../emailItem";
import { useNavigate } from "react-router-dom";
import authStore from "../../stores/authStore";
import EmailFilter from "../emailDetail/components/emailFilter";

const Inbox = () => {
  const [emails, setEmails] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("All");
  const [emailsPerPage] = useState(5);
  const [isAutoReplyEnabled, setIsAutoReplyEnabled] = useState(false);
  const navigate = useNavigate();

  const handleSelectEmail = (emailId) => {
    const updatedEmails = emails.map((email) =>
      email.id === emailId ? { ...email, isSelected: !email.isSelected } : email
    );
    setEmails(updatedEmails);
    setSelectedEmails(updatedEmails.filter((email) => email.isSelected));
  };

  const handleBulkAction = (action) => {
    if (selectedEmails.length > 0) {
      const updatedEmails = emails.map((email) =>
        selectedEmails.includes(email) ? { ...email, isSelected: false } : email
      );
      setEmails(updatedEmails);
      setSelectedEmails([]);
    }
  };

  const handleEmailClick = (emailId) => {
    const clickedEmail = emails.find((email) => email.id === emailId);
    navigate(`/email/${clickedEmail.id}`, { state: clickedEmail });
  };

  useEffect(() => {
    authStore.fetchEmails();
    const fetchedEmails = JSON.parse(localStorage.getItem("email")) || [];
    setEmails(fetchedEmails);
  }, []);

  const indexOfLastEmail = currentPage * emailsPerPage;
  const indexOfFirstEmail = indexOfLastEmail - emailsPerPage;
  const currentEmails = emails.slice(indexOfFirstEmail, indexOfLastEmail);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleFilterChange = (value) => {
    setFilter(value);
    if (value === "Inquiries") {
      setIsAutoReplyEnabled(true);
    } else {
      setIsAutoReplyEnabled(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#fafafa",
        height: "100vh",
      }}
    >
      <Container sx={{ maxWidth: "1200px", margin: "0 auto", padding: "16px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={9}>
            <Typography
              variant="h5"
              sx={{
                margin: "16px 0",
                fontWeight: 700,
                color: "#333",
                fontSize: "24px",
              }}
            >
              Inbox
            </Typography>

            <Divider sx={{ marginBottom: "16px", borderColor: "#e0e0e0" }} />

            <Box
              display="flex"
              justifyContent="flex-start"
              sx={{ marginBottom: "16px", gap: "8px" }}
            >
              <Button
                variant="outlined"
                color="primary"
                startIcon={<MarkEmailRead />}
                onClick={() => handleBulkAction("markAsRead")}
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
                Mark as Read
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<Delete />}
                onClick={() => handleBulkAction("delete")}
                disabled={selectedEmails.length === 0}
                sx={{
                  fontWeight: 600,
                  fontSize: "14px",
                  paddingX: "16px",
                  borderRadius: "24px",
                  borderColor: "#d32f2f",
                  color: "#d32f2f",
                  "&:hover": {
                    borderColor: "#c62828",
                  },
                }}
              >
                Delete
              </Button>
            </Box>

            <List sx={{ padding: 0 }}>
              {currentEmails.map((email) => (
                <EmailItem
                  key={email.id}
                  email={email}
                  onSelect={handleSelectEmail}
                  onClick={() => handleEmailClick(email.id)}
                />
              ))}
            </List>

            <Pagination
              count={Math.ceil(emails.length / emailsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              sx={{
                marginTop: "16px",
                display: "flex",
                justifyContent: "center",
              }}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <EmailFilter filter={filter} setFilter={handleFilterChange} />

            <Button
              variant="contained"
              color="primary"
              sx={{
                marginTop: "16px",
                borderRadius: "24px",
                fontWeight: 600,
                fontSize: "14px",
                width: "100%",
                backgroundColor: "#007aff",
                "&:hover": {
                  backgroundColor: "#0062cc",
                },
              }}
              disabled={!isAutoReplyEnabled}
            >
              Auto Reply
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Inbox;
