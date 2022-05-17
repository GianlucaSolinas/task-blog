import { SentimentVeryDissatisfied } from "@mui/icons-material";
import { Button, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Paper
      elevation={2}
      sx={{
        width: "20rem",
        height: "20rem",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <Stack height="100%" gap={2} direction="column" justifyContent="center" alignItems="center">
        <SentimentVeryDissatisfied sx={{ fontSize: 80 }} />
        <Typography variant="subtitle1" fontWeight="bold">
          Page not found.
        </Typography>
        <Button variant="contained" onClick={() => navigate("../posts", { replace: true })}>
          Go to post list
        </Button>
      </Stack>
    </Paper>
  );
};

export default NotFound;
