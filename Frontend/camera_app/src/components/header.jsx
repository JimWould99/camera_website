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
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Rowing } from "@mui/icons-material";
import Navbar from "./navBar";

const HeaderToolBar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  borderRadius: 100,
  width: "40%",
  position: "relative",
  "&:hover": {
    backgroundColor: "#D8D8D8",
  },
  border: "3px solid #FFA41B",
  paddingLeft: "20px",
  [theme.breakpoints.down("sm")]: {
    width: "80%",
  },
}));

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#525FE1",
}));

const SideBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const RightBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "15px",
  marginRight: "10px",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
  textWrap: "nowrap",
}));

const HeaderButtons = styled(Button)(({ theme }) => ({
  height: 43,
  fontWeight: "700",
  fontSize: "0.9rem",
  "&:hover": {
    backgroundColor: "#D8D8D8",
  },
}));

const HeaderTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  color: "#FFFDD0",
  marginRight: 0.5,
  textWrap: "nowrap",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const Header = () => {
  return (
    <>
      <AppBarStyled position="sticky">
        <HeaderToolBar sx={{ height: "67px" }}>
          <SideBox>
            <HeaderTypography variant="h6">Camera Site</HeaderTypography>
            <IconButton size="large">
              <PhotoCameraIcon sx={{ color: "#FFFDD0" }}></PhotoCameraIcon>
            </IconButton>
          </SideBox>
          <Search>
            <InputBase placeholder="Search for cameras..." sx={{}}></InputBase>
          </Search>
          <RightBox>
            <IconButton size="large">
              <ShoppingCartIcon sx={{ color: "#FFFDD0" }}></ShoppingCartIcon>
            </IconButton>
            <HeaderButtons
              variant="contained"
              sx={{
                backgroundColor: "#FFA41B",
                color: "black",
                display: { lg: "block", sm: "none" },
              }}
            >
              Sell Now
            </HeaderButtons>
            <HeaderButtons
              sx={{ backgroundColor: "#FFFDD0", color: "black" }}
              variant="contained"
            >
              Sign Up
            </HeaderButtons>
            <HeaderButtons
              sx={{
                color: "#FFFDD0",
                "&:hover": {
                  backgroundColor: "#002244",
                },
              }}
            >
              Log In
            </HeaderButtons>
          </RightBox>
        </HeaderToolBar>
        <Navbar></Navbar>
      </AppBarStyled>
    </>
  );
};

export default Header;
