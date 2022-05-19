import React from "react";
import { Box, Button, Stack, Paper, TextField, Typography, Grid } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { onLogin } = useAuth();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm();

  const onSubmit = async (data: any) => {
    await onLogin(data);
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100%" }}
    >
      <Grid item xs={3}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Paper
            elevation={2}
            sx={{
              textAlign: "center",
            }}
          >
            <Stack height="100%" gap={2} direction="column" justifyContent="center" alignItems="center" padding={4}>
              <Typography variant="h3" fontFamily="Raleway">
                LOGIN
              </Typography>
              <Stack direction="column" alignItems="center" gap={1}>
                <Box width={{ md: "100%" }}>
                  <Controller
                    name="username"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField required error={!!errors.username} fullWidth label="Username" {...field} />
                    )}
                    defaultValue=""
                  />
                </Box>
                <Box width={{ md: "100%" }}>
                  <Controller
                    name="password"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField
                        required
                        type="password"
                        error={!!errors.password}
                        fullWidth
                        label="Password"
                        {...field}
                      />
                    )}
                    defaultValue=""
                  />
                </Box>
              </Stack>
              <Box width={{ md: "100%" }}>
                <Button variant="contained" type="submit">
                  login
                </Button>
              </Box>
              <Box width={{ md: "100%" }}>
                <Button variant="text" onClick={() => navigate("../register", { replace: true })}>
                  register new user
                </Button>
              </Box>
            </Stack>
          </Paper>
        </form>
      </Grid>
    </Grid>
  );
};

export default Login;
