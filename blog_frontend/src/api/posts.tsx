import axios from "axios";
import { EditPostInput, Post, PostInput } from "../types";
import { getApiURL, getDefaultHeaders } from "../utils";

async function getPosts(): Promise<Post[]> {
  return (
    await axios.get(`${getApiURL()}/posts/`, {
      headers: getDefaultHeaders(),
    })
  ).data;
}

async function getPost(slug: string | undefined, count_as_view: boolean): Promise<Post | null> {
  return (
    await axios.get(`${getApiURL()}/posts/${slug}/?view=${count_as_view}`, {
      headers: getDefaultHeaders(),
    })
  ).data;
}

async function addPost(data: PostInput): Promise<Post | null> {
  return await axios.post(`${getApiURL()}/posts/create/`, data, {
    headers: getDefaultHeaders(),
  });
}

async function editPost({ id, data }: EditPostInput): Promise<Post | null> {
  return await axios.put(`${getApiURL()}/posts/update/${id}/`, data, {
    headers: getDefaultHeaders(),
  });
}

async function deletePost(id: string): Promise<Post | null> {
  return await axios.delete(`${getApiURL()}/posts/delete/${id}/`, {
    headers: getDefaultHeaders(),
  });
}

export { getPosts, getPost, addPost, editPost, deletePost };
