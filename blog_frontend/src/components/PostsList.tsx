import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  LinearProgress,
  Grid,
  Paper,
  Stack,
  Typography,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  useMediaQuery,
  IconButton,
  CardContent,
} from "@mui/material";

import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { deletePost, getPosts } from "../api/posts";
import { Post } from "../types";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import PostSubheader from "./PostSubheader";
import { Delete, Edit, Add, ReadMore, PersonAdd } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import useCurrentUser from "../hooks/useCurrentUser";

const PostsList = () => {
  const theme = useTheme();
  const matchMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { currentUser } = useCurrentUser();
  const { isLoading, data, isFetching, refetch } = useQuery("getPosts", getPosts);
  const navigate = useNavigate();
  const [deleteConfirmation, setDeleteConfirmation] = useState<string | null>(null);
  const deletePostMutation = useMutation(deletePost);
  const { enqueueSnackbar } = useSnackbar();

  const goTo = (path: string) => {
    navigate(`../${path}`);
  };

  const onPostDelete = async () => {
    if (deleteConfirmation) {
      try {
        await deletePostMutation.mutateAsync(deleteConfirmation);
        setDeleteConfirmation(null);
        enqueueSnackbar("Post deleted.", { variant: "success" });
        refetch();
      } catch (error) {
        setDeleteConfirmation(null);
        enqueueSnackbar("Something went wrong.", { variant: "error" });
      }
    }
  };

  return (
    <Box>
      <Grid container gap={2} justifyContent={{ md: "center", xs: "space-between" }} mb={{ xs: 10, md: 5 }}>
        {isLoading || isFetching ? (
          <LinearProgress />
        ) : data && data.length ? (
          data.map((post: Post) => {
            return (
              <Grid item xs={12} md={6} key={post.id}>
                <Card>
                  <CardHeader
                    titleTypographyProps={{ fontSize: 30, fontWeight: "bold", color: "primary.dark" }}
                    title={post.title}
                    subheader={<PostSubheader post={post} />}
                  />
                  <CardContent>
                    <Typography variant="caption">{`${post.content.substring(0, 50)}...`}</Typography>
                  </CardContent>
                  <CardActions>
                    {matchMobile ? (
                      <IconButton>
                        <ReadMore onClick={() => goTo(`post/${post.slug}`)} />
                      </IconButton>
                    ) : (
                      <Button onClick={() => goTo(`post/${post.slug}`)} variant="contained">
                        Read
                      </Button>
                    )}
                    {currentUser?.id === post.author.id && (
                      <Stack direction="row" gap={1} width="100%" justifyContent="flex-end">
                        {matchMobile ? (
                          <IconButton>
                            <Edit onClick={() => goTo(`posts/edit/${post.slug}`)} />
                          </IconButton>
                        ) : (
                          <Button
                            startIcon={<Edit />}
                            onClick={() => goTo(`posts/edit/${post.slug}`)}
                            variant="contained"
                            color="secondary"
                            size="small"
                          >
                            Edit
                          </Button>
                        )}
                        {matchMobile ? (
                          <IconButton>
                            <Delete onClick={() => setDeleteConfirmation(post.id)} />
                          </IconButton>
                        ) : (
                          <Button
                            startIcon={<Delete color="secondary" />}
                            variant="outlined"
                            color="primary"
                            size="small"
                            onClick={() => setDeleteConfirmation(post.id)}
                          >
                            Delete
                          </Button>
                        )}
                      </Stack>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            );
          })
        ) : (
          <Paper
            elevation={2}
            sx={{
              width: "20rem",
              height: "20rem",
              backgroundColor: "primary.main",
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <Stack height="100%" gap={2} direction="column" justifyContent="center" alignItems="center">
              <SentimentDissatisfiedIcon sx={{ fontSize: 80 }} />
              <Typography variant="subtitle1" fontWeight="bold">
                It seems that this blog is empty.
              </Typography>
            </Stack>
          </Paper>
        )}
      </Grid>
      {currentUser?.is_staff && (
        <Stack direction={{ xs: "row", md: "column" }} gap={1} className="FabContainer">
          <Fab
            color="secondary"
            size="medium"
            variant={matchMobile ? "circular" : "extended"}
            onClick={() => goTo("register")}
          >
            <PersonAdd sx={{ mr: matchMobile ? 0 : 1 }} />
            {matchMobile ? "" : "New user"}
          </Fab>
          <Fab
            color="primary"
            size="medium"
            variant={matchMobile ? "circular" : "extended"}
            onClick={() => goTo("posts/add")}
          >
            <Add sx={{ mr: matchMobile ? 0 : 1 }} />
            {matchMobile ? "" : "New post"}
          </Fab>
        </Stack>
      )}
      <Dialog open={!!deleteConfirmation}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>The post will be permanently deleted.</DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmation(null)}>Cancel</Button>
          <Button variant="contained" onClick={onPostDelete}>
            confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PostsList;
