import {
  Backdrop,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { slugify } from "../utils";
import { teal } from "@mui/material/colors";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { addPost, editPost, getPost } from "../api/posts";
import { Post } from "../types";
import { Info, Preview } from "@mui/icons-material";
import ContentRenderer from "./ContentRenderer";
import { useSnackbar } from "notistack";

interface ExitDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

type PostFormData = {
  title: string;
  content: string;
};

const ExitDialog = ({ open, onClose, onConfirm }: ExitDialogProps) => {
  return (
    <Dialog open={open}>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogContent>Any changes will be discarded.</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm}>confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

const PostFormWrapper = () => {
  const { slug } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  let defaultValues: PostFormData = {
    title: "",
    content: "",
  };

  const { data, isLoading } = useQuery(["getPost", slug], () => getPost(slug, false), {
    enabled: !!slug,
    retry: false,
    onError: (err) => {
      enqueueSnackbar(`Post not found. Redirected to post list.`, { variant: "warning" });
      navigate("../posts", { replace: true });
    },
  });

  if (data) {
    defaultValues.title = data.title;
    defaultValues.content = data.content;
  }

  return (
    <React.Fragment>
      <Backdrop open={isLoading}>
        <CircularProgress />
      </Backdrop>
      <PostForm defaultValues={defaultValues} postData={data} />
    </React.Fragment>
  );
};

interface IPRops {
  defaultValues: PostFormData;
  postData: Post | null | undefined;
}

const PostForm = ({ defaultValues, postData }: IPRops) => {
  const formTitle = postData ? "Edit post" : "Create a new blog post";

  const {
    control,
    watch,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isDirty },
  } = useForm<PostFormData>({
    defaultValues: { ...defaultValues },
  });

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [exitDialogOpen, setExitDialogOpen] = useState(false);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);

  const addPostMutation = useMutation(addPost);
  const editPostMutation = useMutation(editPost);

  const onSubmit = handleSubmit(async (data) => {
    const slug = slugify(data.title);
    const formData = { ...data, slug };

    if (postData) {
      await editPostMutation.mutateAsync({ data: formData, id: postData.id });
      enqueueSnackbar("Post modified successfully!", { variant: "success" });
      onBack();
    } else {
      await addPostMutation.mutateAsync(formData);
      enqueueSnackbar("Post created successfully!", { variant: "success" });
      onBack();
    }
  });

  const watchTitle = watch("title");
  const watchContent = watch("content");

  const onBack = () => {
    navigate("/posts");
  };

  const onOpenDialog = () => {
    if (isDirty) {
      // if form is dirty, prompt the user
      setExitDialogOpen(true);
    } else {
      // else go directly back
      onBack();
    }
  };

  const onCloseDialog = () => {
    setExitDialogOpen(false);
  };

  return (
    <Card>
      <Backdrop open={addPostMutation.isLoading || editPostMutation.isLoading}>
        <CircularProgress />
      </Backdrop>
      <form onSubmit={onSubmit}>
        <CardHeader title={formTitle} />
        <CardContent>
          <Stack direction={{ xs: "column", md: "row" }} gap={2}>
            <Box width={{ md: "40%" }}>
              <Stack gap={1}>
                <Controller
                  name="title"
                  control={control}
                  rules={{ required: true, pattern: /^[A-Za-z0-9\s]+$/i }}
                  render={({ field }) => (
                    <TextField required error={!!errors.title} fullWidth label="Title" {...field} />
                  )}
                  defaultValue=""
                />
                {errors.title && (
                  <React.Fragment>
                    {errors.title.type === "required" && <FormHelperText error>Title is required!</FormHelperText>}
                    {errors.title.type === "pattern" && (
                      <FormHelperText error>Title must not contain special characters!</FormHelperText>
                    )}
                  </React.Fragment>
                )}
                {watchTitle && !errors.title && (
                  <React.Fragment>
                    <Typography variant="body2">Post URL will look like this</Typography>
                    <Typography
                      component="code"
                      sx={{ background: teal[800], padding: "1px 4px", color: "white", width: "fit-content" }}
                    >
                      <small style={{ opacity: 0.75 }}>{window.location.origin.toString()}/post/</small>
                      <small style={{ fontWeight: "bold" }}>{slugify(getValues().title)}</small>
                    </Typography>
                  </React.Fragment>
                )}
              </Stack>
            </Box>
            <Box width={{ md: "60%" }}>
              <Controller
                name="content"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    required
                    error={!!errors.content}
                    fullWidth
                    label="Content"
                    multiline
                    minRows="10"
                    {...field}
                  />
                )}
                defaultValue=""
              />
              <Stack direction="row" justifyContent="space-between">
                <Box>
                  {errors.content && (
                    <React.Fragment>
                      {errors.content.type === "required" && (
                        <FormHelperText error>Please write something here!</FormHelperText>
                      )}
                    </React.Fragment>
                  )}
                  <FormHelperText margin="dense">
                    <Stack direction="row" gap={0.5}>
                      <Info fontSize="small" /> Markdown supported
                    </Stack>
                  </FormHelperText>
                </Box>
                {watchContent && (
                  <Button
                    size="small"
                    variant="text"
                    startIcon={<Preview />}
                    onClick={() => setPreviewDialogOpen(true)}
                  >
                    Preview
                  </Button>
                )}
              </Stack>
            </Box>
          </Stack>
        </CardContent>
        <CardActions>
          <Button onClick={onOpenDialog} variant="outlined">
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </CardActions>
      </form>
      <ExitDialog open={exitDialogOpen} onClose={onCloseDialog} onConfirm={onBack} />
      <Dialog fullWidth maxWidth="xl" open={previewDialogOpen} onClose={() => setPreviewDialogOpen(false)}>
        <DialogTitle>Preview</DialogTitle>
        <DialogContent>
          <ContentRenderer content={getValues().content} />
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default PostFormWrapper;
