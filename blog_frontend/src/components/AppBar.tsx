import { AppBar, CircularProgress, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import useCurrentUser from "../hooks/useCurrentUser";
import useAuth from "../hooks/useAuth";

export default function BlogAppBar() {
  const { pathname } = useLocation();
  const { onLogout } = useAuth();
  const { currentUser, isLoading } = useCurrentUser();

  if (pathname.split("/")[1] === "login") {
    return <></>;
  }

  return (
    <React.Fragment>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Blog
          </Typography>
          {isLoading ? <CircularProgress /> : currentUser ? currentUser.username : "Anonymous user"}
          <Tooltip title="Logout">
            <IconButton size="large" edge="end" color="inherit" aria-label="logout">
              <Logout onClick={onLogout} />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
