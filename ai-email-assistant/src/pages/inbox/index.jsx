// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Container,
//   Divider,
//   Typography,
//   Button,
//   List,
//   Pagination,
//   Grid,
//   Backdrop,
//   CircularProgress,
// } from "@mui/material";
// import { Delete, MarkEmailRead } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import authStore from "../../stores/authStore";
// import aiResponseStore from "../../stores/aiResponseStore";
// import EmailItem from "../emailItem";
// import EmailFilter from "../emailDetail/components/emailFilter";
// import AutoReplyButton from "./components/AutoReplyButton";

// const Inbox = () => {
//   const [emails, setEmails] = useState([]);
//   const [selectedEmails, setSelectedEmails] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [filter, setFilter] = useState("All");
//   const [emailsPerPage] = useState(5);
//   const [isAutoReplyEnabled, setIsAutoReplyEnabled] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     setIsLoading(true);
//     authStore.fetchEmails({ inquire: isAutoReplyEnabled });
//     const fetchedEmails = JSON.parse(localStorage.getItem("email")) || [];
//     setEmails(fetchedEmails);
//     setIsLoading(false);
//   }, [isAutoReplyEnabled]);

//   const handleSelectEmail = (emailId) => {
//     const updatedEmails = emails.map((email) =>
//       email.id === emailId ? { ...email, isSelected: !email.isSelected } : email
//     );
//     setEmails(updatedEmails);
//     setSelectedEmails(updatedEmails.filter((email) => email.isSelected));
//   };

//   const handleBulkAction = (action) => {
//     if (selectedEmails.length > 0) {
//       const updatedEmails = emails.map((email) =>
//         selectedEmails.includes(email) ? { ...email, isSelected: false } : email
//       );
//       setEmails(updatedEmails);
//       setSelectedEmails([]);
//     }
//   };

//   const handleEmailClick = (emailId) => {
//     const clickedEmail = emails.find((email) => email.id === emailId);
//     navigate(`/email/${clickedEmail.id}`, { state: clickedEmail });
//   };

//   const indexOfLastEmail = currentPage * emailsPerPage;
//   const indexOfFirstEmail = indexOfLastEmail - emailsPerPage;
//   const currentEmails = emails?.slice(indexOfFirstEmail, indexOfLastEmail);

//   const handlePageChange = (event, value) => {
//     setCurrentPage(value);
//   };

//   const handleFilterChange = (value) => {
//     setFilter(value);
//     if (value === "Inquiries") {
//       setIsAutoReplyEnabled(true);
//     } else {
//       setIsAutoReplyEnabled(false);
//     }
//   };

//   const handleAutoReply = async () => {
//     setIsLoading(true);
//     try {
//       await aiResponseStore.triggerAutoReply();
//       setIsLoading(false);
//       setFilter("All");
//       setIsAutoReplyEnabled(false);
//     } catch (error) {
//       console.error("Error sending auto-reply:", error);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "row",
//         backgroundColor: "#fafafa",
//         height: "100vh",
//       }}
//     >
//       <Container sx={{ maxWidth: "1200px", margin: "0 auto", padding: "16px" }}>
//         <Grid container spacing={2}>
//           <Grid item xs={12} md={9}>
//             <Typography
//               variant="h5"
//               sx={{
//                 margin: "16px 0",
//                 fontWeight: 700,
//                 color: "#333",
//                 fontSize: "24px",
//               }}
//             >
//               Inbox
//             </Typography>
//             <Divider sx={{ marginBottom: "16px", borderColor: "#e0e0e0" }} />
//             <Box
//               display="flex"
//               justifyContent="flex-start"
//               sx={{ marginBottom: "16px", gap: "8px" }}
//             >
//               <Button
//                 variant="outlined"
//                 color="primary"
//                 startIcon={<MarkEmailRead />}
//                 onClick={() => handleBulkAction("markAsRead")}
//                 disabled={selectedEmails.length === 0}
//                 sx={{
//                   fontWeight: 600,
//                   fontSize: "14px",
//                   paddingX: "16px",
//                   borderRadius: "24px",
//                   borderColor: "#007aff",
//                   color: "#007aff",
//                   "&:hover": { borderColor: "#0062cc" },
//                 }}
//               >
//                 Mark as Read
//               </Button>
//               <Button
//                 variant="outlined"
//                 color="error"
//                 startIcon={<Delete />}
//                 onClick={() => handleBulkAction("delete")}
//                 disabled={selectedEmails.length === 0}
//                 sx={{
//                   fontWeight: 600,
//                   fontSize: "14px",
//                   paddingX: "16px",
//                   borderRadius: "24px",
//                   borderColor: "#d32f2f",
//                   color: "#d32f2f",
//                   "&:hover": { borderColor: "#c62828" },
//                 }}
//               >
//                 Delete
//               </Button>
//             </Box>
//             <List sx={{ padding: 0 }}>
//               {currentEmails?.map((email) => (
//                 <EmailItem
//                   key={email.id}
//                   email={email}
//                   onSelect={handleSelectEmail}
//                   onClick={() => handleEmailClick(email.id)}
//                 />
//               ))}
//             </List>
//             <Pagination
//               count={Math.ceil(emails.length / emailsPerPage)}
//               page={currentPage}
//               onChange={handlePageChange}
//               color="primary"
//               sx={{
//                 marginTop: "16px",
//                 display: "flex",
//                 justifyContent: "center",
//               }}
//             />
//           </Grid>
//           <Grid item xs={12} md={3}>
//             <EmailFilter filter={filter} setFilter={handleFilterChange} />
//             <AutoReplyButton
//               isEnabled={isAutoReplyEnabled}
//               onClick={handleAutoReply}
//             />
//           </Grid>
//         </Grid>
//       </Container>
//       <Backdrop
//         sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
//         open={isLoading}
//       >
//         <CircularProgress color="inherit" />
//       </Backdrop>
//     </Box>
//   );
// };

// export default Inbox;
import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  List,
  Pagination,
  Grid,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { Delete, MarkEmailRead } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import authStore from "../../stores/authStore";
import EmailItem from "../emailItem";
import EmailFilter from "../emailDetail/components/emailFilter";
import AutoReplyButton from "./components/AutoReplyButton";

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
    setIsLoading(true);
    authStore.fetchEmails({ inquire: isAutoReplyEnabled });
    const fetchedEmails = JSON.parse(localStorage.getItem("email")) || [];
    setEmails(fetchedEmails);
    setIsLoading(false);
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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#f4f5f7",
        height: "100vh",
      }}
    >
      <Container sx={{ flex: 1, marginLeft: "260px", padding: "16px" }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: "#333", marginBottom: "16px" }}
        >
          INBOX
        </Typography>
        <Typography
          variant="h6"
          color="primary"
          sx={{ fontWeight: 600, marginBottom: "16px" }}
        >
          Primary Mails
        </Typography>
        <Box display="flex" gap={2} marginBottom={2}>
          <Button
            variant="outlined"
            startIcon={<MarkEmailRead />}
            sx={{ borderRadius: "24px" }}
          >
            Mark as Read
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<Delete />}
            sx={{ borderRadius: "24px" }}
          >
            Delete
          </Button>
        </Box>
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
        <Pagination
          count={Math.ceil(emails.length / emailsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          sx={{ marginTop: "16px", display: "flex", justifyContent: "center" }}
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
