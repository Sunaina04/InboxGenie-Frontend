import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  List,
  Paper,
  CircularProgress,
  TextField,
  Pagination,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { toast } from "react-hot-toast";
import { observer } from "mobx-react-lite";
import manualStore from "../../stores/mannualStore";
import { useDropzone } from "react-dropzone";
import ManualItem from "./components/manualItem";

const HomePage = observer(() => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredManuals, setFilteredManuals] = useState(manualStore.manuals);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    manualStore.fetchManuals();
  }, []);

  useEffect(() => {
    const filtered = manualStore.manuals.filter((manual) =>
      manual?.filename?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredManuals(filtered);
  }, [searchQuery, manualStore.manuals]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastManual = currentPage * itemsPerPage;
  const indexOfFirstManual = indexOfLastManual - itemsPerPage;
  const currentManuals = filteredManuals.slice(
    indexOfFirstManual,
    indexOfLastManual
  );

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file to upload");
      return;
    }

    setIsLoading(true);
    try {
      await manualStore.uploadManual(selectedFile);
      setSelectedFile(null);
    } catch (error) {
      // Handled in the store
    } finally {
      setIsLoading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setSelectedFile(file);
    },
    accept: ".pdf",
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f4f5f7",
      }}
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            backgroundColor: "white",
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Manuals Management
          </Typography>

          {/* Search Bar */}
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Search Manuals"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                endAdornment: <Search sx={{ color: "#1976d2" }} />,
              }}
            />
          </Box>

          {/* Drag and Drop Upload */}
          <Box
            {...getRootProps()}
            sx={{
              border: "2px dashed #1976d2",
              borderRadius: 2,
              padding: 2,
              textAlign: "center",
              cursor: "pointer",
              mb: 3,
            }}
          >
            <input {...getInputProps()} />
            {selectedFile ? (
              <Typography variant="body1">
                Selected file: {selectedFile.name}
              </Typography>
            ) : (
              <Typography variant="body2">
                Drag & drop a PDF here, or click to select
              </Typography>
            )}
          </Box>

          {/* Upload Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            disabled={!selectedFile || isLoading}
            startIcon={isLoading ? <CircularProgress size={16} /> : null}
            sx={{
              py: 0.5,
              px: 2,
              fontSize: "0.875rem",
              minWidth: "auto",
              height: "38px",
            }}
          >
            {isLoading ? "Uploading..." : "Upload"}
          </Button>

          {/* Manuals List */}
          <List>
            {currentManuals.length > 0 ? (
              currentManuals.map((file) => {
                if (!file || !file.filename) return null;
                return <ManualItem key={file.id} file={file} />;
              })
            ) : (
              <Typography variant="body1" color="textSecondary" align="center">
                No manuals uploaded yet
              </Typography>
            )}
          </List>

          {/* Pagination */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Pagination
              count={Math.ceil(filteredManuals.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </Paper>
      </Container>
    </Box>
  );
});

export default HomePage;
