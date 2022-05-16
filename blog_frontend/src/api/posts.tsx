import axios from "axios";
import { Post } from "../types";

async function getPosts(): Promise<Post[]> {
  return (await axios.get("http://127.0.0.1:8000/posts/")).data;
}

async function getPost(slug: string | undefined, count_as_view: boolean): Promise<Post | null> {
  return (await axios.get(`http://127.0.0.1:8000/posts/${slug}/?view=${count_as_view}`)).data;
}

export { getPosts, getPost };
