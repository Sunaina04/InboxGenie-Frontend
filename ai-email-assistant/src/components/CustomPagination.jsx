import React from 'react';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function CustomPagination({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  itemsPerPage = 10,
  onPageChange
}) {
  const handlePageChange = (event, value) => {
    onPageChange(value);
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      mt={4}
    >
      {/* Left Section */}
      <Box flex={1}>
        <Typography variant="body2" color="#B7AEAE">
          {totalItems === 0
            ? "No entries to display"
            : `Showing ${((currentPage - 1) * itemsPerPage) + 1} to ${Math.min(currentPage * itemsPerPage, totalItems)} of ${totalItems} entries`}
        </Typography>
      </Box>

      {/* Center Section */}
      <Box flex={1} display="flex" justifyContent="center">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          variant="contained"
          shape="rounded"
          size="small"
          sx={{
            '& .MuiPaginationItem-root': {
              color: 'gray',
            },
            '& .MuiPaginationItem-root.Mui-selected': {
              backgroundColor: '#554FEB',
              color: 'white',
            },
            '& .MuiPaginationItem-root:hover': {
              backgroundColor: 'rgba(0, 123, 255, 0.1)',
            },
          }}
        />
      </Box>


      <Box flex={1} />
    </Box>
  );
}
