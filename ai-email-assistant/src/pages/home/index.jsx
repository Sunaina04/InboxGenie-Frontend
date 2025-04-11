import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  CircularProgress,
} from '@mui/material';
import { Delete, Upload } from '@mui/icons-material';
import { toast } from 'react-hot-toast';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import  authStore  from '../../stores/authStore';

// import { privatePaths } from '../config/routes';

const HomePage = observer(() => {
  const [pdfFiles, setPdfFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   // Fetch manuals when component mounts
  //   authStore.fetchManuals();
  // }, []);

  useEffect(() => {
    // Load existing PDFs from localStorage
    const storedFiles = JSON.parse(localStorage.getItem('pdfFiles')) || [];
    setPdfFiles(storedFiles);
  }, []);


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      toast.error('Please select a valid PDF file');
      event.target.value = null;
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file to upload');
      return;
    }

    setIsLoading(true);
    try {
      await authStore.uploadManual(selectedFile);
      setSelectedFile(null);
    } catch (error) {
      // Error is already handled by authStore
    } finally {
      setIsLoading(false);
    }
      // Simulate API call delay
      // await new Promise(resolve => setTimeout(resolve, 1000));

      // const newFiles = [...pdfFiles, {
      //   id: Date.now(),
      //   name: selectedFile.name,
      //   size: selectedFile.size,
      //   lastModified: selectedFile.lastModified,
      // }];

    //   setPdfFiles(newFiles);
    //   localStorage.setItem('pdfFiles', JSON.stringify(newFiles));
    //   setSelectedFile(null);
    //   toast.success('PDF uploaded successfully!');
    // } catch (error) {
    //   console.error('Error uploading file:', error);
    //   toast.error('Failed to upload PDF');
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const handleDelete = (id) => {
    const updatedFiles = pdfFiles.filter(file => file.id !== id);
    setPdfFiles(updatedFiles);
    localStorage.setItem('pdfFiles', JSON.stringify(updatedFiles));
    toast.success('PDF deleted successfully!');
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#f4f5f7',
      }}
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            backgroundColor: 'white',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Manuals Management
          </Typography>

          <Box sx={{ mb: 4 }}>
            <input
              accept="application/pdf"
              style={{ display: 'none' }}
              id="raised-button-file"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="raised-button-file">
              <Button
                variant="contained"
                component="span"
                color="primary"
                startIcon={<Upload />}
                sx={{
                  mr: 2,
                  py: 0.5,
                  px: 2,
                  fontSize: '0.875rem',
                  minWidth: 'auto',
                  height: '38px',
                }}
              >
                Select PDF
              </Button>
            </label>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpload}
              disabled={!selectedFile || isLoading}
              startIcon={isLoading ? <CircularProgress size={16} /> : null}
              sx={{
                py: 0.5,
                px: 2,
                fontSize: '0.875rem',
                minWidth: 'auto',
                height: '38px',
              }}
            >
              {isLoading ? 'Uploading...' : 'Upload'}
            </Button>
            {selectedFile && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Selected file: {selectedFile.name}
              </Typography>
            )}
          </Box>

          <List>
            {pdfFiles.map((file) => (
              <ListItem
                key={file.id}
                sx={{
                  border: '1px solid #e0e0e0',
                  borderRadius: 1,
                  mb: 1,
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
              >
                <ListItemText
                  primary={file.name}
                  secondary={`Size: ${formatFileSize(file.size)} | Last Modified: ${new Date(file.lastModified).toLocaleDateString()}`}
                />
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(file.id)}
                  sx={{
                    color: 'error.main',
                    p: 0.5,
                  }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </ListItem>
            ))}
            {pdfFiles.length === 0 && (
              <Typography variant="body1" color="textSecondary" align="center">
                No PDFs uploaded yet
              </Typography>
            )}
          </List>
        </Paper>
      </Container>
    </Box>
  );
});

export default HomePage;
