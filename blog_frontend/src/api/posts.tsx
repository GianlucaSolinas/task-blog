import axios from "axios";
import Post from "../types/post";

function getPosts(): Promise<Post[]> {
  return axios.get("http://127.0.0.1:8000/posts/").then((res) => res.data);
}

export { getPosts };
