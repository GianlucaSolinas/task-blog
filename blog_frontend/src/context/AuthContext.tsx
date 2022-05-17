import { useSnackbar } from "notistack";
import React from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { User } from "../types";

const AuthContext = React.createContext<any>(null);

const AuthProvider = ({ children }: any) => {
  const [token, setToken] = React.useState<string | null>(null);
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = async (data: any) => {
    try {
      const { token, user } = await login(data);

      setToken(token);
      setCurrentUser(user);
      window.localStorage.setItem("blog_auth_token", token);
      navigate("../posts/", { replace: true });
      enqueueSnackbar("Logged in successfully!", { autoHideDuration: 1500 });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    setToken(null);
    window.localStorage.removeItem("blog_auth_token");
    navigate("../login", { replace: true });
    enqueueSnackbar("Logged out successfully!", { autoHideDuration: 1500 });
  };

  const contextValue: any = {
    token,
    currentUser,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
