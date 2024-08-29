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

const Delete = () => {
  const { user, login, logout } = useContext(AuthContext);

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  let [error, setError] = useState("");
  const navigate = useNavigate();

  const logOutClick = () => {
    console.log("doing logout");
    logout();
    localStorage.removeItem("user");
    localStorage.removeItem("chatHistory");
    navigate("/");
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

    let response = await fetch(
      `${import.meta.env.VITE_REACT_APP_URL}/api/users/delete`,
      {
        method: "POST",
        body: { password: password },
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (!response.ok) {
      console.log("response not okay");
      setError(json.error);
      return;
    }

    console.log("done part");
    logOutClick();

    //await sign_up_request(email, password);
    //await localStorage.removeItem("chatHistory");
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
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
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
            placeholder="Confirm Password"
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
              backgroundColor: "#d32f2f",
              fontSize: "1.2em",
              fontWeight: "bold",
              color: "white",
              "&:hover": {
                backgroundColor: "#FFA41B",
                color: "black",
              },
            }}
            variant="contained"
            onClick={handleSubmit}
          >
            Delete Account
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

export default Delete;
