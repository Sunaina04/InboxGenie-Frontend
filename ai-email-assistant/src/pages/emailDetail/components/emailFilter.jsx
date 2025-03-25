import React from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
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
      fullWidth
      sx={{
        backgroundColor: "#fff",
        borderRadius: 1,
        boxShadow: 1,
        "&:hover .MuiOutlinedInput-root": {
          borderColor: "#00796b",
        },
      }}
    >
      <InputLabel sx={{ color: "#4f5b62" }}>Filter</InputLabel>
      <Select
        value={filter}
        onChange={handleChange}
        label="Filter"
        displayEmpty
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
        {filterOptions?.map((option) => (
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
  filterOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default EmailFilter;
