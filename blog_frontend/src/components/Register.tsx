import { ArrowBack, Logout } from "@mui/icons-material";
import {
  Button,
  Box,
  Paper,
  Stack,
  Typography,
  TextField,
  Switch,
  FormHelperText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";
import useAuth from "../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { currentUser, onLogout } = useAuth();
  const theme = useTheme();
  const matchMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      first_name: "",
      last_name: "",
      is_staff: false,
    },
  });

  const handleError = (resData: any) => {
    const arr = Object.values(resData);
    arr.forEach((el: any) => {
      enqueueSnackbar(el, { variant: "error", autoHideDuration: 3000 });
    });
  };

  const mutate = useMutation("registerUser", registerUser);

  const onSubmit = async (data: any) => {
    try {
      await mutate.mutateAsync(data);
      enqueueSnackbar(`User ${data.username} created successfully!`, { variant: "success" });
      reset();
    } catch (error: any) {
      if (error.response) {
        handleError(error.response.data);
      } else {
        enqueueSnackbar(`Something went wrong.`, { variant: "error" });
      }
    }
  };

  const watchAll = watch();

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
          <Typography variant={matchMobile ? "h5" : "h3"} fontFamily="Raleway">
            USER REGISTRATION
          </Typography>
          <Typography variant="subtitle2">Create a new user</Typography>
          <Stack direction={matchMobile ? "column" : "row"} gap={1}>
            <Box width={{ md: "50%" }}>
              <Controller
                name="username"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    size={matchMobile ? "small" : "medium"}
                    required
                    error={!!errors.username}
                    fullWidth
                    label="Username"
                    {...field}
                  />
                )}
                defaultValue=""
              />
            </Box>
            <Box width={{ md: "50%" }}>
              <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    required
                    size={matchMobile ? "small" : "medium"}
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
          <Stack direction={matchMobile ? "column" : "row"} gap={1}>
            <Box width={{ md: "50%" }}>
              <Controller
                name="first_name"
                control={control}
                render={({ field }) => (
                  <TextField
                    size={matchMobile ? "small" : "medium"}
                    fullWidth
                    error={!!errors.password}
                    label="First name"
                    {...field}
                  />
                )}
                defaultValue=""
              />
            </Box>
            <Box width={{ md: "50%" }}>
              <Controller
                name="last_name"
                control={control}
                render={({ field }) => (
                  <TextField
                    size={matchMobile ? "small" : "medium"}
                    fullWidth
                    error={!!errors.password}
                    label="Last name"
                    {...field}
                  />
                )}
                defaultValue=""
              />
            </Box>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography
              variant="caption"
              fontWeight={watchAll.is_staff ? "100" : "bold"}
              onClick={() => setValue("is_staff", false)}
              sx={{ cursor: "pointer" }}
            >
              Reader
            </Typography>
            <Controller
              name="is_staff"
              control={control}
              render={({ field }) => <Switch color="primary" checked={watchAll.is_staff} {...field} />}
            />
            <Typography
              variant="caption"
              fontWeight={watchAll.is_staff ? "bold" : "100"}
              onClick={() => setValue("is_staff", true)}
              sx={{ cursor: "pointer" }}
            >
              Writer
            </Typography>
          </Stack>
          <FormHelperText>
            {watchAll.is_staff ? "Writer can add, edit and remove posts" : "Reader can only view posts"}
          </FormHelperText>
          <Box></Box>
          <Box width={{ md: "50%" }}>
            <Button variant="contained" type="submit">
              register
            </Button>
          </Box>
          <Box width={{ md: "50%" }}>
            <Stack direction="row" gap={1} justifyContent="center">
              {currentUser ? (
                <Button onClick={onLogout} variant="outlined" startIcon={<Logout />}>
                  Logout
                </Button>
              ) : (
                <Button variant="text" onClick={() => navigate("../login", { replace: true })}>
                  go to login
                </Button>
              )}
              {currentUser && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate("../posts", { replace: true })}
                  startIcon={<ArrowBack />}
                >
                  {matchMobile ? "Back" : "Back to posts list"}
                </Button>
              )}
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </form>
  );
};

export default Register;
