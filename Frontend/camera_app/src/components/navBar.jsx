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

const Navbar = () => {
  return (
    <>
      <NavBox>
        <NavButtonGroup variant="text" aria-label="Basic button group">
          <NavButton>Mirrorless</NavButton>
          <NavButton>DSLR</NavButton>
          <NavButton>Instant cameras</NavButton>
          <NavButton>Compact</NavButton>
          <NavButton>Bridge cameras</NavButton>
          <NavButton>Action cameras</NavButton>
          <NavButton>Underwater cameras</NavButton>
        </NavButtonGroup>
      </NavBox>
    </>
  );
};

export default Navbar;
