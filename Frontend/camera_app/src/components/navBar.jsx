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
  [theme.breakpoints.down("md")]: {
    height: "120px",
  },
}));

const NavButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  //height: "50px",
  backgroundColor: "white",
  borderRadius: 1,
  // border: "1px solid #525FE1",
  [theme.breakpoints.down("md")]: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    fontSize: 1,
    width: `100%`,
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: "black",
  fontWeight: "700",
  "&:hover": {
    backgroundColor: "#D8D8D8",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: 12,
    textWrap: "wrap",
    border: "1px solid blue",
  },
}));

const Navbar = ({ handleSubmit, setQueryCategory, queryCategory }) => {
  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <NavBox sx={{ textWrap: "nowrap" }}>
          <NavButtonGroup variant="text" aria-label="Basic button group">
            <NavButton
              value="Mirrorless"
              onClick={(e) => setQueryCategory(e.target.value)}
              type="submit"
              sx={{
                backgroundColor:
                  queryCategory === "Mirrorless" ? "#FFA41B" : "",
              }}
            >
              Mirrorless
            </NavButton>
            <NavButton
              value="DSLR"
              onClick={(e) => setQueryCategory(e.target.value)}
              type="submit"
              sx={{
                backgroundColor: queryCategory === "DSLR" ? "#FFA41B" : "",
              }}
            >
              DSLR
            </NavButton>
            <NavButton
              value="Instant"
              onClick={(e) => setQueryCategory(e.target.value)}
              type="submit"
              sx={{
                backgroundColor: queryCategory === "Instant" ? "#FFA41B" : "",
              }}
            >
              Instant cameras
            </NavButton>
            <NavButton
              value="Compact"
              onClick={(e) => setQueryCategory(e.target.value)}
              type="submit"
              sx={{
                backgroundColor: queryCategory === "Compact" ? "#FFA41B" : "",
              }}
            >
              Compact
            </NavButton>
            <NavButton
              value="Action"
              onClick={(e) => setQueryCategory(e.target.value)}
              type="submit"
              sx={{
                backgroundColor: queryCategory === "Action" ? "#FFA41B" : "",
              }}
            >
              Action cameras
            </NavButton>
            <NavButton
              value=""
              onClick={(e) => setQueryCategory(e.target.value)}
              type="submit"
              sx={{
                backgroundColor: queryCategory === "" ? "" : "",
              }}
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
