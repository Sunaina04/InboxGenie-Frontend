import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { FilterList } from "@mui/icons-material";

const EmailFilter = ({ filter, setFilter }) => {
  return (
    <FormControl
      variant="outlined"
      fullWidth
      sx={{ backgroundColor: "#fff", borderRadius: 1 }}
    >
      <InputLabel sx={{ color: "#4f5b62" }}>Filter</InputLabel>
      <Select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        label="Filter"
        sx={{
          backgroundColor: "#f5f7fa",
          borderRadius: 1,
          paddingRight: "36px",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#cfd8dc",
            },
            "&:hover fieldset": {
              borderColor: "#00796b",
            },
          },
        }}
        startAdornment={
          <InputAdornment position="start">
            <IconButton disabled>
              <FilterList sx={{ color: "#4f5b62" }} />
            </IconButton>
          </InputAdornment>
        }
      >
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="Support">Support</MenuItem>
        <MenuItem value="Inquiries">Inquiries</MenuItem>
        <MenuItem value="Grievances">Grievances</MenuItem>
      </Select>
    </FormControl>
  );
};

export default EmailFilter;
