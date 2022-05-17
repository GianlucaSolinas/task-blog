import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  LinearProgress,
  Grid,
  Paper,
  Stack,
  Typography,
  Fab,
  Container,
} from "@mui/material";

import React, { useContext } from "react";
import { useQuery } from "react-query";
import { getPosts } from "../api/posts";
import { Post } from "../types";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import PostSubheader from "./PostSubheader";
import { Delete, Edit, Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PostsList = () => {
  const { currentUser } = useContext(AuthContext);
  const { isLoading, data, isFetching } = useQuery("getPosts", getPosts);
  const navigate = useNavigate();

  const goTo = (path: string) => {
    navigate(`../${path}`);
  };

  return (
    <Box>
      <Grid container gap={2} justifyContent="space-between" mb={5}>
        {isLoading || isFetching ? (
          <LinearProgress />
        ) : data && data.length ? (
          data.map((post: Post) => {
            return (
              <Grid item xs={12} md={6} key={post.id}>
                <Card>
                  <CardHeader title={post.title} subheader={<PostSubheader post={post} />} />
                  <CardContent>
                    <Typography variant="body2">{`${post.content.substring(0, 100)}...`}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick={() => goTo(`post/${post.slug}`)} variant="contained">
                      Read
                    </Button>
                    {currentUser.id === post.author.id && (
                      <Stack direction="row" gap={1} width="100%" justifyContent="flex-end">
                        <Button
                          startIcon={<Edit />}
                          onClick={() => goTo(`posts/edit/${post.slug}`)}
                          variant="contained"
                          color="info"
                          size="small"
                        >
                          Edit
                        </Button>
                        <Button startIcon={<Delete />} variant="contained" color="error" size="small">
                          Delete
                        </Button>
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
      <Fab color="primary" size="medium" variant="extended" onClick={() => goTo("posts/add")}>
        <Add sx={{ mr: 1 }} />
        New post
      </Fab>
    </Box>
  );
};

export default PostsList;
