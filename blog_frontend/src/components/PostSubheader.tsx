import { CalendarMonth, Person, Visibility } from "@mui/icons-material";
import { Chip, Stack } from "@mui/material";
import { format } from "date-fns";
import React from "react";
import { Post } from "../types";

interface IPRops {
  post: Post;
}

const PostSubheader = ({ post }: IPRops) => {
  const authorShownName =
    post.author["first_name"] && post.author["last_name"]
      ? `${post.author.first_name} ${post.author.last_name}`
      : post.author.username;

  return (
    <Stack mt={1} direction={{ sm: "row", xs: "column" }} gap={1}>
      <Chip size="small" color="primary" icon={<Person />} label={authorShownName} />
      <Chip
        size="small"
        color="secondary"
        icon={<CalendarMonth />}
        label={`${format(new Date(post.created_at), "MMMM do yyyy HH:mm")}`}
      />
      <Chip size="small" color="success" icon={<Visibility />} label={`${post.views} views`} />
    </Stack>
  );
};

export default PostSubheader;
