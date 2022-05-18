import axios from "axios";
import { EditPostInput, Post, PostInput } from "../types";
import { getApiURL } from "../utils";

async function getPosts(): Promise<Post[]> {
  return (
    await axios.get(`${getApiURL()}/posts/`, {
      headers: {
        Authorization: `Token ${window.localStorage.getItem("blog_auth_token") || ""}`,
      },
    })
  ).data;
}

async function getPost(slug: string | undefined, count_as_view: boolean): Promise<Post | null> {
  return (
    await axios.get(`${getApiURL()}/posts/${slug}/?view=${count_as_view}`, {
      headers: {
        Authorization: `Token ${window.localStorage.getItem("blog_auth_token") || ""}`,
      },
    })
  ).data;
}

async function addPost(data: PostInput): Promise<Post | null> {
  return await axios.post(`${getApiURL()}/posts/create/`, data, {
    headers: {
      Authorization: `Token ${window.localStorage.getItem("blog_auth_token") || ""}`,
    },
  });
}

async function editPost({ id, data }: EditPostInput): Promise<Post | null> {
  return await axios.put(`${getApiURL()}/posts/update/${id}/`, data, {
    headers: {
      Authorization: `Token ${window.localStorage.getItem("blog_auth_token") || ""}`,
    },
  });
}

async function deletePost(id: string): Promise<Post | null> {
  return await axios.delete(`${getApiURL()}/posts/delete/${id}/`, {
    headers: {
      Authorization: `Token ${window.localStorage.getItem("blog_auth_token") || ""}`,
    },
  });
}

export { getPosts, getPost, addPost, editPost, deletePost };
