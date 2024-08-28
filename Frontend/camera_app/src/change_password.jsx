import { useEffect, useState, useContext } from "react";
import Header from "./components/header";
import ChatPopper from "./components/chatbot_comps/popper";
import { AuthContext } from "./hooks/auth_context";
import { useNavigate, useSearchParams, Navigate } from "react-router-dom";

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
  marginTop: 0,
  minHeight: "80vh",
}));

const ChangePassword = () => {
  const { user, login, logout } = useContext(AuthContext);

  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  let [error, setError] = useState("");
  const navigate = useNavigate();

  const logOutClick = () => {
    console.log("doing logout");
    logout();
    localStorage.removeItem("user");
    localStorage.removeItem("chatHistory");
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === "" || confirm === "") {
      setError("Fill in all fields");
      return;
    }
    if (password !== confirm) {
      setError("Passwords must match");
      return;
    }

    console.log("done part one");
    console.log("old", oldPassword);

    let response = await fetch(
      "https://camera-website-backend.onrender.com/api/users/changePassword",
      {
        method: "POST",
        body: JSON.stringify({ oldPassword, password }),
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();

    if (!response.ok) {
      console.log("response not okay");
      setError(json.error);
      return;
    }

    logOutClick();
  };

  return (
    <>
      <Header></Header>
      <ChatPopper></ChatPopper>
      <DisplayBox>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignSelf: "center",
            justifySelf: "center",
            gap: "20px",
            width: "40%",
          }}
        >
          <input
            type="password"
            onChange={(e) => setOldPassword(e.target.value)}
            value={oldPassword}
            placeholder="Old password"
            style={{
              height: "60px",
              fontSize: "1.2em",
              paddingLeft: "20px",
              borderColor:
                error === "Fill in all fields" && password === "" && "red",
            }}
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="New password"
            style={{
              height: "60px",
              fontSize: "1.2em",
              paddingLeft: "20px",
              borderColor:
                error === "Fill in all fields" && password === "" && "red",
            }}
          />
          <input
            type="password"
            onChange={(e) => setConfirm(e.target.value)}
            value={confirm}
            placeholder="Confirm new Password"
            style={{
              height: "60px",
              fontSize: "1.2em",
              paddingLeft: "20px",
              borderColor:
                error === "Fill in all fields" && confirm === "" && "red",
            }}
          />
          <Button
            sx={{
              height: "60px",
              width: "50%",
              backgroundColor: "#525FE1",
              fontSize: "1.2em",
              fontWeight: "bold",
              color: "white",
              /*"&:hover": {
                backgroundColor: "#525FE1",
                //color: "black",
              },*/
            }}
            variant="contained"
            onClick={handleSubmit}
          >
            Change Password
          </Button>
          {error ? (
            <Typography variant="h6" sx={{ color: "#d32f2f" }}>
              {error}
            </Typography>
          ) : (
            <Typography sx={{ color: "white" }}>Filler </Typography>
          )}
        </form>
      </DisplayBox>

      <Footer></Footer>
    </>
  );
};

export default ChangePassword;
