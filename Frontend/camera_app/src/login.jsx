import { useContext, useState } from "react";
import { AuthContext } from "./hooks/auth_context";
import { ExecuteLogin } from "./hooks/login_hook";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { sign_up_request, loading, error } = ExecuteLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sign_up_request(email, password);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
