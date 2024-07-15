import { useContext, useState } from "react";
import { AuthContext } from "./hooks/auth_context";
import { ExecuteLogin } from "./hooks/login_hook";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "./components/header";
import { Button, CardMedia } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { sign_up_request, loading, error } = ExecuteLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sign_up_request(email, password);
    await localStorage.removeItem("chatHistory");
    await navigate("/");
  };

  function handleSubmissionButton() {
    sign_up_request(email, password);
    localStorage.removeItem("chatHistory");
    navigate("/");
  }

  return (
    <>
      <Header></Header>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          maxHeight: "100vh",
        }}
      >
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignSelf: "center",
            justifySelf: "center",
            gap: "20px",
            width: "55%",
          }}
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
            style={{ height: "60px", fontSize: "1.2em", paddingLeft: "20px" }}
          />

          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
            style={{ height: "60px", fontSize: "1.2em", paddingLeft: "20px" }}
          />
          {!loading && (
            <Button
              sx={{
                height: "50px",
                fontSize: "1.2em",
                backgroundColor: "#525FE1",
                fontWeight: "bold",
                color: "#FFFDD0",
              }}
              variant="contained"
              onClick={handleSubmissionButton}
            >
              Login
            </Button>
          )}
          <button style={{ display: "none" }}></button>
          {error}
        </form>
        <CardMedia
          component="img"
          image="/conor-luddy-IVaKksEZmZA-unsplash.jpg"
          alt="sony camera"
          style={{ height: "100vh" }}
        ></CardMedia>
      </div>
    </>
  );
};

export default Login;
