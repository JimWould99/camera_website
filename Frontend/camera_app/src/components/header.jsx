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
  Link,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
//import { Rowing } from "@mui/icons-material";
import Navbar from "./navBar";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [queryCategory, setQueryCategory] = useState(
    searchParams.get("category") || ""
  );
  const navigate = useNavigate();

  //console.log("query in header,", query);
  /*useEffect(() => {
    if (query) {
      console.log("a query", query);
      navigate(`/search/?q=${query}`);
    }
  }, [query]);*/

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ q: query, category: queryCategory });
    navigate(
      `/search/?q=${encodeURIComponent(query)}&category=${encodeURIComponent(
        queryCategory
      )}`
    );
    if (window.location.href.includes("search")) {
      window.location.reload();
    }
  };

  return (
    <>
      <AppBarStyled position="sticky">
        <HeaderToolBar sx={{ height: "67px" }}>
          <SideBox>
            <Link href={"/"} underline="none">
              <HeaderTypography variant="h6">Camera Site</HeaderTypography>
            </Link>
            <Link href={"/"} underline="none">
              <IconButton size="large">
                <PhotoCameraIcon sx={{ color: "#FFFDD0" }}></PhotoCameraIcon>
              </IconButton>
            </Link>
          </SideBox>
          <Search>
            <form onSubmit={handleSubmit}>
              <InputBase
                placeholder="Search for cameras..."
                sx={{ width: "100%" }}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              ></InputBase>
            </form>
          </Search>
          <RightBox>
            <Link href={"/"} underline="none">
              <IconButton size="large">
                <ShoppingCartIcon sx={{ color: "#FFFDD0" }}></ShoppingCartIcon>
              </IconButton>
            </Link>
            <Link href={"/"} underline="none">
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
            </Link>
            <Link href={"/"} underline="none">
              <HeaderButtons
                sx={{ backgroundColor: "#FFFDD0", color: "black" }}
                variant="contained"
              >
                Sign Up
              </HeaderButtons>
            </Link>
            <Link href={"/"} underline="none">
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
            </Link>
          </RightBox>
        </HeaderToolBar>
        <Navbar
          handleSubmit={handleSubmit}
          setQueryCategory={setQueryCategory}
        ></Navbar>
      </AppBarStyled>
    </>
  );
};
export default Header;
