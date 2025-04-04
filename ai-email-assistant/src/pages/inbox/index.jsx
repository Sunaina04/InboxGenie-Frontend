import React, { useEffect, useState } from "react";
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

const Inbox = () => {
  const [emails, setEmails] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("All");
  const [emailsPerPage] = useState(8);
  const [isAutoReplyEnabled, setIsAutoReplyEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmails = async () => {
      setIsLoading(true);
      try {
        await authStore.fetchEmails({ inquire: isAutoReplyEnabled });
        const fetchedEmails = JSON.parse(localStorage.getItem("email")) || [];
        setEmails(fetchedEmails);
      } catch (error) {
        console.error("Error fetching emails:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmails();
  }, [isAutoReplyEnabled]);

  const handleSelectEmail = (emailId) => {
    const updatedEmails = emails.map((email) =>
      email.id === emailId ? { ...email, isSelected: !email.isSelected } : email
    );
    setEmails(updatedEmails);
    setSelectedEmails(updatedEmails.filter((email) => email.isSelected));
  };

  const handleEmailClick = (emailId) => {
    const clickedEmail = emails.find((email) => email.id === emailId);
    navigate(`/email/${clickedEmail.id}`, { state: clickedEmail });
  };

  const indexOfLastEmail = currentPage * emailsPerPage;
  const indexOfFirstEmail = indexOfLastEmail - emailsPerPage;
  const currentEmails = emails?.slice(indexOfFirstEmail, indexOfLastEmail);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const handleFilterChange = (value) => {
    setFilter(value);
    setIsAutoReplyEnabled(value === "Inquiries");
  };
  const handleAutoReply = async () => {
    setIsLoading(true);
    try {
      await aiResponseStore.triggerAutoReply();
      setIsLoading(false);
      setFilter("All");
      setIsAutoReplyEnabled(false);
    } catch (error) {
      console.error("Error sending auto-reply:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#f4f5f7",
        height: "100vh",
        // minWidth: "1200px", // Increased minimum width
        width: "calc(100% - 2 0px)", // Adjusted width to account for sidebar
      }}
    >
      <Container sx={{ 
        flex: 1, 
        marginLeft: "20px", 
        marginRight: "20px", 
        padding: "16px", 
        maxWidth: "100%", // Increase this value to make the container wider
      }}>
        <Box display="flex" alignItems="center" marginBottom={2}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: "#333", marginBottom: "16px", marginRight: "16px" }}
          >
            INBOX
          </Typography>
          <Box display="flex" gap={1} sx={{ marginLeft: "50px", alignItems: "center" }}>
            <Button
              variant="text"
              startIcon={<MarkEmailRead sx={{ color: "#9e9b9b" }} />}
              sx={{ 
                color: "#9e9b9b",
                padding: "4px 8px",
                marginLeft: "20px",
                minWidth: "150px",
                fontSize: "14px",
                backgroundColor: "#e8e6e6",
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
            <EmailFilter filter={filter} setFilter={handleFilterChange}  />
            <AutoReplyButton isEnabled={isAutoReplyEnabled} onClick={() => {handleAutoReply()}} />
          </Box>
        </Box>
        <Typography
          variant="h6"
          color="primary"
          sx={{ fontWeight: 500, marginBottom: "16px",color:"#0848d1"}}
        >
          Primary Mails
        </Typography>
        <List
          sx={{
            background: "white",
            borderRadius: "12px",
            padding: "16px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",           
          }}
        >
          {currentEmails?.map((email) => (
            <EmailItem
              key={email.id}
              email={email}
              onSelect={handleSelectEmail}
              onClick={() => handleEmailClick(email.id)}
            />
          ))}
        </List>
        <CustomPagination
          count={Math.ceil(emails.length / emailsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Container>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default Inbox;
