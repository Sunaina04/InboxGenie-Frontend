import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  List,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { Delete, MarkEmailRead } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import authStore from "../../stores/authStore";
import aiResponseStore from "../../stores/aiResponseStore";
import EmailItem from "../emailItem";
import EmailFilter from "../emailDetail/components/emailFilter";
import AutoReplyButton from "./components/AutoReplyButton";
import CustomPagination from "../../components/CustomPagination";
import { observer } from "mobx-react-lite";
import { toast } from "react-hot-toast";
import EmailTabs from './components/EmailTabs';

const Inbox = observer(() => {
  const [emails, setEmails] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [emailsPerPage] = useState(8);
  const [isAutoReplyEnabled, setIsAutoReplyEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Function to fetch emails
  const fetchEmails = useCallback(async (params = {}) => {
    setIsLoading(true);
    try {
      const accessToken = localStorage.getItem("gmail_access_token");
      if (!accessToken) {
        toast.error("Access token not found. Please log in again.");
        return;
      }
      await authStore.fetchEmails(params);
    } catch (error) {
      console.error("Error fetching emails:", error);
      toast.error("Failed to fetch emails");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleTabChange = (tab) => {
    const params = {
      primary: tab === 'primary',
      inquiry: tab === 'inquiry',
      support: tab === 'support',
      grievance: tab === 'grievance'
    };
    fetchEmails(params);
  };

  useEffect(() => {
    fetchEmails();
  }, [isAutoReplyEnabled]);

  // Update emails when authStore.emails changes
  useEffect(() => {
    const storedEmails = JSON.parse(localStorage.getItem("email")) || [];
    setEmails(storedEmails);
  }, [authStore.emails]);

  const handleSelectEmail = (emailId) => {
    const updatedEmails = emails.map((email) =>
      email.id === emailId ? { ...email, isSelected: !email.isSelected } : email
    );
    setEmails(updatedEmails);

    const selected = updatedEmails.filter((email) => email.isSelected);
    setSelectedEmails(selected);
    setIsAutoReplyEnabled(selected.length > 0);    
  };

  const handleEmailClick = (emailId) => {
    const clickedEmail = emails.find((email) => email.id === emailId);
    if (clickedEmail) {
      navigate(`/email/${clickedEmail.id}`, {
        state: { email: clickedEmail },
        replace: true
      });
    }
  };

  const handleAutoReply = async () => {
    setIsLoading(true);
    try {
      const accessToken = localStorage.getItem("gmail_access_token");
      if (!accessToken) {
        toast.error("Access token not found. Please log in again.");
        return;
      }
      await aiResponseStore.triggerAutoReply(accessToken, selectedEmails);
      setIsAutoReplyEnabled(!isAutoReplyEnabled);
    } catch (error) {
      console.error("Error triggering auto-reply:", error);
      toast.error("Failed to trigger auto-reply");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (value) => {
    setCurrentPage(value);
  };

  const indexOfLastEmail = currentPage * emailsPerPage;
  const indexOfFirstEmail = indexOfLastEmail - emailsPerPage;
  const currentEmails = emails?.slice(indexOfFirstEmail, indexOfLastEmail);
  const totalItems = (emails || []).length;
  const totalPages = Math.ceil(totalItems / emailsPerPage);
  console.log("emails", emails);
  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between" gap={2} mb={2}>
        <Box display="flex" alignItems="center" gap={2}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: "#333" }}
          >
            INBOX
          </Typography>
          <Button
            variant="text"
            startIcon={<MarkEmailRead sx={{ color: "#9e9b9b" }} />}
            sx={{
              color: "#9e9b9b",
              padding: "4px 8px",
              minWidth: "150px",
              fontSize: "14px",
              marginLeft: "80px",
              backgroundColor: "#F9FBFF",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.2)",
              }
            }}
          >
            Mark as Read
          </Button>
          <Button
            variant="text"
            startIcon={<Delete sx={{ color: "#9e9b9b" }} />}
            sx={{
              color: "#9e9b9b",
              padding: "4px 8px",
              fontSize: "16px",
              minWidth: "150px",
              backgroundColor: "#F9FBFF",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.2)",
              }
            }}
          >
            Delete
          </Button>
        </Box>

        <Box
          sx={{
            marginRight: "20px"
          }}
        >
          <AutoReplyButton isEnabled={isAutoReplyEnabled} onClick={handleAutoReply} />
        </Box>
      </Box>
      <EmailTabs onTabChange={handleTabChange} />
    
      <List>
        {currentEmails?.map((email) => (
          <EmailItem
            key={email.id}
            email={email}
            onSelect={handleSelectEmail}
            onClick={handleEmailClick}
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
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
});

export default Inbox;
