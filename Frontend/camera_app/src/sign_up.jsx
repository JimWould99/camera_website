import { useContext, useState } from "react";
import { AuthContext } from "./hooks/auth_context";
import { ExecuteSignup } from "./hooks/sign_up_hook";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "./components/header";
import { Button, CardMedia } from "@mui/material";
const Sign_up = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { sign_up_request, loading, error } = ExecuteSignup();
  const handleSubmission = async (e) => {
    e.preventDefault();
    console.log("handlesub");
    await sign_up_request(email, name, password);
    await localStorage.removeItem("chatHistory");
    await navigate("/");
  };

  function handleSubmitButton() {
    console.log("handlesub");
    sign_up_request(email, name, password);
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
        <CardMedia
          component="img"
          image="/conor-luddy-IVaKksEZmZA-unsplash.jpg"
          alt="sony camera"
          style={{ height: "100vh" }}
        ></CardMedia>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignSelf: "center",
            justifySelf: "center",
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
              onClick={handleSubmitButton}
            >
              Sign up
            </Button>
          )}
          <button style={{ display: "none" }}></button>
          {error}
        </form>
      </div>
    </>
  );
};
export default Sign_up;
