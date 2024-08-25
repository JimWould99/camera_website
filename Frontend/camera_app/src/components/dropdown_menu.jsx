import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled, Link } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../hooks/auth_context";
import { useNavigate, useSearchParams, Navigate } from "react-router-dom";

/* 
Code from Material UI dropdown Menu
https://mui.com/material-ui/react-menu/
*/

const MenuItemOne = styled(MenuItem)(({ theme }) => ({
  backgroundColor: "#FFA41B",
  color: "black",

  fontWeight: 700,
  "&:hover": {
    backgroundColor: "#FFC000",
  },
  height: 60,
  width: 200,
  border: "1px solid black",
  fontSize: "1.2rem",
}));

const MenuItemTwo = styled(MenuItem)(({ theme }) => ({
  backgroundColor: "#FFA41B",
  color: "black",
  fontWeight: 700,
  "&:hover": {
    backgroundColor: "#FFC000",
  },
  height: 60,
  width: 200,
  border: "1px solid black",
  fontSize: "1.2rem",
  display: "none",
  [theme.breakpoints.down("md")]: {
    display: "flex",
  },
}));

const CustomButton = styled(Button)(({ theme }) => ({
  /*[theme.breakpoints.down("sm")]: {
    textWrap: "wrap",
    fontSize: 14,
    width: 80,
    paddingTop: 10,
    paddingBottom: 10,
  },*/
}));

export default function BasicMenu() {
  const { user, login, logout } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();

  const logOutClick = () => {
    handleClose();
    logout();
    localStorage.removeItem("user");
    localStorage.removeItem("chatHistory");
    navigate("/");
  };

  return (
    <div>
      <CustomButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          backgroundColor: "#FFFDD0",
          color: "black",
          height: 43,
          fontWeight: "700",
          fontSize: "0.9rem",
          "&:hover": {
            backgroundColor: "#D8D8D8",
          },
        }}
      >
        {user.name}
      </CustomButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        disableScrollLock={true}
        sx={{ paddingTop: 0 }}
      >
        <Link href={"/profile"} underline="none">
          <MenuItemOne onClick={handleClose}>Profile</MenuItemOne>
        </Link>
        <Link href={"/list_camera"} underline="none">
          <MenuItemOne onClick={handleClose}>My selling hub</MenuItemOne>
        </Link>
        <Link href={"/cart"} underline="none">
          <MenuItemTwo classList="small_menu" onClick={handleClose}>
            My Cart
          </MenuItemTwo>
        </Link>
        <Link href={"/settings"} underline="none">
          <MenuItemOne onClick={handleClose}>Settings</MenuItemOne>
        </Link>
        <Link href={"/"} underline="none">
          <MenuItemTwo onClick={logOutClick}>Logout</MenuItemTwo>
        </Link>
      </Menu>
    </div>
  );
}
