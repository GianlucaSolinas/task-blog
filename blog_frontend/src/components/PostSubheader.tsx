import { CalendarMonth, Person, Visibility } from "@mui/icons-material";
import { Chip, Stack } from "@mui/material";
import { format } from "date-fns";
import React from "react";
import { Post } from "../types";
import { getAuthorShownName } from "../utils/";

interface IPRops {
  post: Post;
}

const PostSubheader = ({ post }: IPRops) => {
  const authorShownName = getAuthorShownName(post.author);

  return (
    <Stack mt={1} direction={{ sm: "row", xs: "column" }} gap={1} alignItems="baseline">
      <Chip size="small" icon={<Person />} label={authorShownName} />
      <Chip
        size="small"
        icon={<CalendarMonth />}
        label={`${format(new Date(post.created_at), "MMMM do yyyy HH:mm")}`}
      />
      <Chip size="small" icon={<Visibility />} label={`${post.views} views`} />
    </Stack>
  );
};

export default PostSubheader;
