import React, { useRef } from "react";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import Paper from "@mui/material/Paper";

const Search = styled(Paper)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: "100%",
  padding: "0 0px",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: "8px",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  flex: 1,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1rem)`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

const SearchBar = ({
  value,
  onChange,
  onRequestSearch,
  onCancelSearch,
  style,
  placeholder,
}) => {
  const inputRef = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
      if (value) onRequestSearch();
    }
  };

  const handleClick = (event) => {
    event.currentTarget.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const handleClear = () => {
    onCancelSearch("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <Search style={style}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          handleKeyDown(e);
        }}
        onClick={(e) => {
          handleClick(e);
        }}
        placeholder={placeholder || "Search…"}
        inputProps={{ "aria-label": "search" }}
        inputRef={inputRef} // Referencia al input
      />

      {value && (
        <IconButton onClick={handleClear}>
          <ClearIcon />
        </IconButton>
      )}
    </Search>
  );
};

export default SearchBar;
