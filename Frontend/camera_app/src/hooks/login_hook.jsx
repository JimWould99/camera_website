import { useContext, useState } from "react";
import { AuthContext } from "./auth_context";

export const ExecuteLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const { user, login, logout } = useContext(AuthContext);

  const sign_up_request = async (email, password) => {
    setLoading(true);
    setError(null);

    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
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

export default ExecuteLogin;
