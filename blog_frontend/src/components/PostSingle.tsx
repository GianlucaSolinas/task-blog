import {
  Backdrop,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Paper,
  Stack,
  Typography,
  Skeleton,
} from "@mui/material";
import { Box } from "@mui/system";
import { format } from "date-fns";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getPost } from "../api/posts";
import ReportIcon from "@mui/icons-material/Report";
import { ArrowBack } from "@mui/icons-material";
import PostSubheader from "./PostSubheader";
import { useSnackbar } from "notistack";
import { AuthContext } from "../context/AuthContext";

const PostSingle = () => {
  const { currentUser } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isLoading, data, error } = useQuery("getPost", () => getPost(slug, true), {
    retry: false,
  });

  if (error) {
    return (
      <Paper>
        <Stack direction="column" justifyContent="center" alignItems="center">
          <ReportIcon fontSize="large" color="error" />
          <Typography variant="h4">Post not found</Typography>
          <Button variant="outlined" onClick={() => navigate("../posts")}>
            Back to posts list
          </Button>
        </Stack>
      </Paper>
    );
  }

  if (data) {
    if (currentUser.id !== data.author.id) {
      enqueueSnackbar("You don't have the right permissions to edit post. Redirecting...");
    }
  }

  return (
    <div>
      <Button startIcon={<ArrowBack />} color="secondary" onClick={() => navigate("../posts")}>
        Back
      </Button>
      <Backdrop open={isLoading}>
        <CircularProgress />
      </Backdrop>
      {data ? (
        <Card>
          <CardHeader title={data.title} subheader={<PostSubheader post={data} />}></CardHeader>
          <CardContent>
            <Typography variant="body1">{data.content}</Typography>
          </CardContent>
        </Card>
      ) : (
        <Skeleton variant="rectangular" />
      )}
    </div>
  );
};

export default PostSingle;
