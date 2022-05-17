import { AppBar, Button, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Logout } from "@mui/icons-material";

export default function BlogAppBar() {
  const { pathname } = useLocation();
  const { currentUser, onLogout } = useContext(AuthContext);

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
          {currentUser && currentUser.username}
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
