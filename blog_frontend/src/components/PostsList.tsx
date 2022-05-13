import { Card, CardContent, CardHeader, CircularProgress, Grid } from "@mui/material";
import { format } from "date-fns";
import React from "react";
import { useQuery } from "react-query";
import { getPosts } from "../api/posts";
import Post from "../types/post";

const PostsList = () => {
  const { isLoading, data } = useQuery("getPosts", getPosts);
  console.log("data", data);

  return (
    <Grid container>
      {isLoading && <CircularProgress />}
      {data && data.length
        ? data.map((post: Post) => {
            const creationDate = format(new Date(post.created_at), "dd-MM-yyyy");
            return (
              <Grid item xs={12} md={6}>
                <Card>
                  <CardHeader title={post.title} subheader={`${post.author} on ${creationDate}`} />
                  <CardContent>{`${post.content.substring(0, 100)}...`}</CardContent>
                </Card>
              </Grid>
            );
          })
        : "No posts"}
    </Grid>
  );
};

export default PostsList;
