import { useContext, useState } from "react";
import { AuthContext } from "./auth_context";

export const ExecuteSignup = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const { user, login, logout } = useContext(AuthContext);

  const sign_up_request = async (email, name, password) => {
    setLoading(true);
    setError(null);

    const response = await fetch("/api/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      login(json);
      setLoading(false);
    }
  };
  return { sign_up_request, loading, error };
};

export default ExecuteSignup;
