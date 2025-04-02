import React from "react";
import { Pagination as MuiPagination } from "@mui/material";

const CustomPagination = ({ count, page, onChange }) => {
  return (
    <MuiPagination
      count={count}
      page={page}
      onChange={onChange}
      showFirstButton
      showLastButton
      sx={{
        marginTop: "16px",
        display: "flex",
        justifyContent: "center",
        "& .MuiPaginationItem-root": {
          backgroundColor: "transparent", // Default background
          color: "#fff", // Text color
        },
        "& .MuiPaginationItem-root.Mui-selected": {
          backgroundColor: "#554FEB", // Highlighted page number background
          color: "#fff", // Highlighted page number text color
        },
        "& .MuiPaginationItem-previousNext": {
          backgroundColor: "transparent", // Keep previous/next buttons unchanged
          color: "#fff", // Text color for previous/next buttons
        },
      }}
    />
  );
};

export default CustomPagination;