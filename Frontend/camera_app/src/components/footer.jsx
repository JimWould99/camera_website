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

const FooterBox = styled(Box)(({ theme }) => ({
  backgroundColor: `#FFA41B`,
  height: 80,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 30,
}));

const Footer = () => {
  return (
    <>
      <FooterBox>
        <a href="/">
          <Typography>Terms and Conditions</Typography>
        </a>
        <a href="/">
          <Typography>Privacy</Typography>
        </a>
        <a href="/">
          <Typography>Cookies</Typography>
        </a>
      </FooterBox>
    </>
  );
};

export default Footer;
