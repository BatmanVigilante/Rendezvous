import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

const client = axios.create({
  baseURL: "http://localhost:3001/api/v1/users",
});

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (name, username, password) => {
    try {
      const response = await client.post("/register", {
        name,
        username,
        password,
      });
      return response.data.message;
    } catch (err) {
      return err.response?.data?.message || "Registration failed";
    }
  };

  const handleLogin = async (username, password) => {
    try {
      const response = await client.post("/login", { username, password });
      localStorage.setItem("token", response.data.token);
      setUserData({ token: response.data.token });
      navigate("/home");
    } catch (err) {
      throw new Error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <AuthContext.Provider
      value={{ userData, setUserData, handleRegister, handleLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};
