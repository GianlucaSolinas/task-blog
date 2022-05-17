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
  Chip,
} from "@mui/material";
import { Box } from "@mui/system";
import { differenceInMinutes, format } from "date-fns";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getPost } from "../api/posts";
import ReportIcon from "@mui/icons-material/Report";
import { ArrowBack } from "@mui/icons-material";
import PostSubheader from "./PostSubheader";
import ContentRenderer from "./ContentRenderer";

const PostSingle = () => {
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

  let hasBeenUpdated = false;

  if (data) {
    hasBeenUpdated = differenceInMinutes(new Date(data.updated_at), new Date(data.created_at)) >= 1;
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
          <CardHeader
            titleTypographyProps={{ variant: "h5" }}
            title={data.title}
            subheader={<PostSubheader post={data} />}
          ></CardHeader>
          <CardContent>
            <Box>
              {hasBeenUpdated && (
                <Chip
                  size="small"
                  color="secondary"
                  variant="outlined"
                  label={<em>Last edit on {format(new Date(data.updated_at), "MMMM do yyyy HH:mm")}</em>}
                />
              )}
            </Box>
            <Box overflow="auto">
              <ContentRenderer content={data.content} />
            </Box>
          </CardContent>
        </Card>
      ) : (
        <Skeleton variant="rectangular" />
      )}
    </div>
  );
};

export default PostSingle;
