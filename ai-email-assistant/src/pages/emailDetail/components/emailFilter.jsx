import React from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import { FilterList } from "@mui/icons-material";

const filterOptions = [
  { value: "All", label: "All" },
  { value: "Support", label: "Support" },
  { value: "Inquiries", label: "Inquiries" },
  { value: "Grievances", label: "Grievances" },
];

const EmailFilter = ({ filter, setFilter }) => {
  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <FormControl
      variant="outlined"
      sx={{
        backgroundColor: "#f5f7fa", // Light gray background
        borderRadius: "8px",
        marginLeft: "20px",
        minWidth: "180px",
      }}
    >
      {/* <Typography variant="body1" sx={{ padding: "8px" }}>
        Sort by:
      </Typography> */}
      <Select
        value={filter}
        onChange={handleChange}
        displayEmpty
        sx={{
          backgroundColor: "#fff", 
          borderRadius: "8px",
          height: "30px",
          "& .MuiSelect-select": {
            padding: "0 10px",
            height: "40px", 
          
            "&:hover fieldset": {
              borderColor: "#00796b",
            },
          },
        }}
        startAdornment={
          <InputAdornment position="start">
            <IconButton disabled={!filter}>
              <FilterList sx={{ color: "#4f5b62" }} />
            </IconButton>
          </InputAdornment>
        }
        aria-label="email filter"
      >
        <MenuItem value="" disabled>
          <em>Choose a filter</em>
        </MenuItem>
        {filterOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

EmailFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default EmailFilter;