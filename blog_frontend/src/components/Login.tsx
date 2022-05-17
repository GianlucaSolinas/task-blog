import { Box, Button, Stack, Paper, TextField, Typography } from "@mui/material";
import React, { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { onLogin, token, currentUser } = useContext(AuthContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm();

  const onSubmit = async (data: any) => {
    await onLogin(data);
  };

  if (window.localStorage.getItem("blog_auth_token")) {
    window.localStorage.removeItem("blog_auth_token");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper
        elevation={2}
        sx={{
          margin: "0 auto",
          textAlign: "center",
          width: "auto",
        }}
      >
        <Stack height="100%" gap={2} direction="column" justifyContent="center" alignItems="center" padding={4}>
          <Typography variant="h3">BLOGIN</Typography>
          <Box width={{ md: "50%" }}>
            <Controller
              name="username"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <TextField error={!!errors.username} fullWidth label="Username" {...field} />}
              defaultValue=""
            />
          </Box>
          <Box width={{ md: "50%" }}>
            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField type="password" error={!!errors.password} fullWidth label="Password" {...field} />
              )}
              defaultValue=""
            />
          </Box>
          <Box width={{ md: "50%" }}>
            <Button variant="contained" type="submit">
              login
            </Button>
          </Box>
        </Stack>
      </Paper>
    </form>
  );
};

export default Login;
