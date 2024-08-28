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
import { useNavigate, useSearchParams, Navigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../hooks/shopping_cart_context";
import { AuthContext } from "../hooks/auth_context";
import BasicMenu from "./dropdown_menu";

const HeaderToolBar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  [theme.breakpoints.down("md")]: {
    display: "grid",
    gridTemplateColumns: "1fr 4fr 2fr",
  },
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
  [theme.breakpoints.down("md")]: {
    width: "100%",
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
  /*[theme.breakpoints.down("sm")]: {
    display: "none",
  },*/
  textWrap: "nowrap",
}));
const HeaderButtons = styled(Button)(({ theme }) => ({
  height: 43,
  fontWeight: "700",
  fontSize: "0.9rem",
  "&:hover": {
    backgroundColor: "#D8D8D8",
  },
  //display: { lg: "block", sm: "none" },
  /* [theme.breakpoints.down("md")]: {
    display: "none",
  },*/
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

const HeaderCamera = styled(PhotoCameraIcon)(({ theme }) => ({
  color: "#FFFDD0",
  /*[theme.breakpoints.down("md")]: {
    display: "none",
  },*/
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
      `https://camera-website-frontend.onrender.com/search/?q=${encodeURIComponent(
        query
      )}&category=${encodeURIComponent(queryCategory)}`
    );
    if (window.location.href.includes("search")) {
      window.location.reload();
    }
  };

  let cartColor;
  const { cartCameraList } = useContext(CartContext);
  if (cartCameraList.length > 0) {
    cartColor = "error";
  } else {
    cartColor = "none";
  }

  const { user, login, logout } = useContext(AuthContext);

  const logOutClick = () => {
    logout();
    localStorage.removeItem("user");
    localStorage.removeItem("chatHistory");
    navigate("https://camera-website-frontend.onrender.com");
  };

  return (
    <>
      <AppBarStyled position="sticky">
        <HeaderToolBar
          sx={{
            height: "67px",
            paddingLeft: { xs: 0, sm: 3, md: 3, lg: 3 },
            paddingRight: { xs: 0, sm: 3, md: 3, lg: 3 },
          }}
        >
          <SideBox>
            <Link href={"/"} underline="none">
              <HeaderTypography sx={{ fontSize: { xs: 15, sm: 20, lg: 20 } }}>
                Camera Site
              </HeaderTypography>
            </Link>
            <Link href={"/"} underline="none">
              <IconButton size="large">
                <HeaderCamera></HeaderCamera>
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
            <Link href={"/cart"} underline="none">
              <IconButton
                size="large"
                sx={{
                  display: { xs: "none", sm: "none", md: "block", lg: "block" },
                }}
              >
                <Badge badgeContent={cartCameraList.length} color={cartColor}>
                  <ShoppingCartIcon
                    sx={{
                      color: "#FFFDD0",
                      transform: "scale(1.4)",
                    }}
                  ></ShoppingCartIcon>
                </Badge>
              </IconButton>
            </Link>
            <Link href={"/list_camera"} underline="none">
              <HeaderButtons
                variant="contained"
                sx={{
                  backgroundColor: "#FFA41B",
                  color: "black",
                  display: {
                    xs: "none",
                    sm: "none",
                    md: "block",
                    lg: "block",
                  },
                }}
              >
                Sell Now
              </HeaderButtons>
            </Link>
            {!user && (
              <Link href={"/sign_up"} underline="none">
                <HeaderButtons
                  sx={{
                    backgroundColor: "#FFFDD0",
                    color: "black",
                    display: { sm: "block", xm: "block" },
                  }}
                  variant="contained"
                >
                  Sign Up
                </HeaderButtons>
              </Link>
            )}
            {!user && (
              <Link href={"/login"} underline="none">
                <HeaderButtons
                  sx={{
                    color: "#FFFDD0",
                    "&:hover": {
                      backgroundColor: "#002244",
                    },
                    display: {
                      xs: "none",
                      sm: "none",
                      md: "block",
                      lg: "block",
                    },
                  }}
                >
                  Log In
                </HeaderButtons>
              </Link>
            )}
            {user && <BasicMenu>{user.name}</BasicMenu>}
            {user && (
              <HeaderButtons
                onClick={logOutClick}
                sx={{
                  color: "#FFFDD0",
                  "&:hover": {
                    backgroundColor: "#002244",
                  },
                  display: {
                    xs: "none",
                    sm: "none",
                    md: "block",
                    lg: "block",
                  },
                }}
              >
                Log out
              </HeaderButtons>
            )}
          </RightBox>
        </HeaderToolBar>
        <Navbar
          handleSubmit={handleSubmit}
          setQueryCategory={setQueryCategory}
          queryCategory={queryCategory}
        ></Navbar>
      </AppBarStyled>
    </>
  );
};
export default Header;
