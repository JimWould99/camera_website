import { useContext, useState } from "react";
import { AuthContext } from "./hooks/auth_context";
import { ExecuteSignup } from "./hooks/sign_up_hook";
import { Navigate, useNavigate } from "react-router-dom";
import AutorenewTwoToneIcon from "@mui/icons-material/AutorenewTwoTone";

import Header from "./components/header";
import { Button, CardMedia, Typography, Box, styled } from "@mui/material";
const DisplayBox = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  maxHeight: "100vh",
  [theme.breakpoints.down("md")]: {
    display: "flex",
    justifyContent: "center",
    marginTop: 50,
  },
}));
const CardMediaC = styled(CardMedia)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));
const Sign_up = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { sign_up_request, loading, error } = ExecuteSignup();
  const { user, login, logout } = useContext(AuthContext);
  if (user) {
    navigate("/");
  }
  const handleSubmission = async (e) => {
    e.preventDefault();
    console.log("handlesub");
    await sign_up_request(email, name, password);
    await localStorage.removeItem("chatHistory");
  };

  function handleSubmitButton() {
    console.log("handlesub");
    sign_up_request(email, name, password);
    localStorage.removeItem("chatHistory");
    console.log("error", error);
  }
  return (
    <>
      <Header></Header>
      <DisplayBox>
        <CardMediaC
          component="img"
          image="/conor-luddy-IVaKksEZmZA-unsplash.jpg"
          alt="sony camera"
          style={{
            height: "100vh",
          }}
        ></CardMediaC>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignSelf: "center",
            justifySelf: "center",
            justifyContent: "center",
            gap: "20px",
            width: "55%",
          }}
          onSubmit={handleSubmission}
        >
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
            style={{ height: "60px", fontSize: "1.2em", paddingLeft: "20px" }}
          />
          <input
            type="string"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Name"
            style={{ height: "60px", fontSize: "1.2em", paddingLeft: "20px" }}
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
            style={{ height: "60px", fontSize: "1.2em", paddingLeft: "20px" }}
          />
          {loading ? (
            <AutorenewTwoToneIcon
              sx={{ margin: "0 auto", transform: "scale(1.5)" }}
            ></AutorenewTwoToneIcon>
          ) : (
            <Button
              sx={{
                height: "50px",
                fontSize: "1.2em",
                backgroundColor: "#525FE1",
                fontWeight: "bold",
                color: "#FFFDD0",
              }}
              variant="contained"
              onClick={handleSubmitButton}
            >
              Sign up
            </Button>
          )}
          <button style={{ display: "none" }}></button>
          {error && (
            <Typography variant="h6" sx={{ color: "#d32f2f" }}>
              {error}
            </Typography>
          )}
        </form>
      </DisplayBox>
    </>
  );
};
export default Sign_up;
