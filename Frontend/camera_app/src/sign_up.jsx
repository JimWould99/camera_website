import { useContext, useState } from "react";
import { AuthContext } from "./hooks/auth_context";
import { ExecuteSignup } from "./hooks/sign_up_hook";
const Sign_up = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { sign_up_request, loading, error } = ExecuteSignup();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await sign_up_request(email, name, password);
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
        <label>Name:</label>
        <input
          type="string"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        {!loading && <button>Sign up</button>}
        {error}
      </form>
    </>
  );
};
export default Sign_up;
