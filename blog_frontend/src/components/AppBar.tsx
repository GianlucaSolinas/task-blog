import { AppBar, Avatar, Chip, Skeleton, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import useCurrentUser from "../hooks/useCurrentUser";
import useAuth from "../hooks/useAuth";
import { getAuthorShownName } from "../utils";

export default function BlogAppBar() {
  const { pathname } = useLocation();
  const { onLogout } = useAuth();
  const { currentUser, isLoading } = useCurrentUser();

  if (["login", "register"].includes(pathname.split("/")[1])) {
    return (
      <React.Fragment>
        <AppBar position="sticky" sx={{ textAlign: "center" }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Blog Task Greencast
            </Typography>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    );
  }

  const authorShownName = getAuthorShownName(currentUser);

  return (
    <React.Fragment>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Blog Task Greencast
          </Typography>
          {isLoading ? (
            <Skeleton variant="rectangular" width={100} />
          ) : (
            <Chip avatar={<Avatar>{authorShownName.charAt(0)}</Avatar>} color="primary" label={authorShownName} />
          )}
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
