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
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getPost } from "../api/posts";
import ReportIcon from "@mui/icons-material/Report";
import { ArrowBack } from "@mui/icons-material";
import PostSubheader from "./PostSubheader";

const PostSingle = () => {
  const { slug } = useParams();
  const { isLoading, data, error } = useQuery("getPost", () => getPost(slug, true), {
    retry: false,
  });

  if (error) {
    return (
      <Paper>
        <Stack direction="column" justifyContent="center" alignItems="center">
          <ReportIcon fontSize="large" color="error" />
          <Typography variant="h4">Post not found</Typography>
          <Button variant="outlined" href="/posts">
            Back to posts list
          </Button>
        </Stack>
      </Paper>
    );
  }

  return (
    <div>
      <Button startIcon={<ArrowBack />} color="secondary" href="/posts">
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
