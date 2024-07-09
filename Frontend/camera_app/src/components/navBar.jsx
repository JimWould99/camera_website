import {
  AppBar,
  Toolbar,
  styled,
  Typography,
  Box,
  InputBase,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Button,
  ButtonGroup,
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

const NavBox = styled(Box)(({ theme }) => ({
  height: "45px",
  backgroundColor: "#525FE1",
  display: "flex",
  borderTop: "1px solid white",
  //justifyContent: "center",
}));

const NavButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  //height: "50px",
  backgroundColor: "white",
  borderRadius: 1,
  // border: "1px solid #525FE1",
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: "black",
  fontWeight: "700",
  "&:hover": {
    backgroundColor: "#D8D8D8",
  },
}));

const Navbar = ({ handleSubmit, setQueryCategory }) => {
  /*const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("category") || "");
  const navigate = useNavigate();
  console.log("first", query);

  const handleSubmit = (e) => {
    e.preventDefault();

    setSearchParams({ category: query });
    console.log("query here", encodeURIComponent(query));
    navigate(`/search/?q=${encodeURIComponent(query)}&category`);
    if (window.location.href.includes("search")) {
      window.location.reload();
    } 
  };*/
  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <NavBox>
          <NavButtonGroup variant="text" aria-label="Basic button group">
            <NavButton
              value="Mirrorless"
              onClick={(e) => setQueryCategory(e.target.value)}
              type="submit"
            >
              Mirrorless
            </NavButton>
            <NavButton
              value="DSLR"
              onClick={(e) => setQueryCategory(e.target.value)}
              type="submit"
            >
              DSLR
            </NavButton>
            <NavButton
              value="Instant"
              onClick={(e) => setQueryCategory(e.target.value)}
              type="submit"
            >
              Instant cameras
            </NavButton>
            <NavButton
              value="Compact"
              onClick={(e) => setQueryCategory(e.target.value)}
              type="submit"
            >
              Compact
            </NavButton>
            <NavButton
              value="Action"
              onClick={(e) => setQueryCategory(e.target.value)}
              type="submit"
            >
              Action cameras
            </NavButton>
            <NavButton
              value=""
              onClick={(e) => setQueryCategory(e.target.value)}
              type="submit"
            >
              All categories
            </NavButton>
          </NavButtonGroup>
        </NavBox>
      </form>
    </>
  );
};

export default Navbar;
