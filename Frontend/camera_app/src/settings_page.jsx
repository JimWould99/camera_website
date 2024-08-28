import { useEffect, useState } from "react";
import Header from "./components/header";
import ChatPopper from "./components/chatbot_comps/popper";
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
  Container,
  Popper,
  Link,
  CardMedia,
} from "@mui/material";
import Footer from "./components/footer";

const DisplayBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: "10%",
  margin: `70px 0px 0px 0px`,
  minHeight: "100vh",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    minHeight: "50vh",
    gap: 70,
    margin: `70px 20px 70px 20px`,
  },
}));
const Personal = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 15,
}));
const Account = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 15,
}));

const Settings = () => {
  return (
    <>
      <Header></Header>
      <ChatPopper></ChatPopper>
      <Box>
        <DisplayBox>
          <Personal>
            <Typography variant="h5">Personal Infomation</Typography>
            <Link
              href={`https://camera-website-frontend.onrender.com`}
              underline="none"
            >
              <Typography variant="h6">Address (Not implemented)</Typography>
            </Link>
            <Link
              href={`https://camera-website-frontend.onrender.com`}
              underline="none"
            >
              <Typography variant="h6">Sign in (Not implemented)</Typography>
            </Link>
            <Link
              href={`https://camera-website-frontend.onrender.com`}
              underline="none"
            >
              <Typography variant="h6">Details (Not implemented)</Typography>
            </Link>
          </Personal>
          <Account>
            <Typography variant="h5">Account Preferences</Typography>
            <Link
              href={`https://camera-website-frontend.onrender.com/delete`}
              underline="none"
            >
              <Typography variant="h6">Delete Account</Typography>
            </Link>
            <Link
              href={`https://camera-website-frontend.onrender.com/change_password`}
              underline="none"
            >
              <Typography variant="h6">Change password</Typography>
            </Link>
          </Account>
        </DisplayBox>
      </Box>

      <Footer></Footer>
    </>
  );
};

export default Settings;
