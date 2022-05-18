import { ReactElement } from "react";
import Login from "../components/Login";
import PostFormWrapper from "../components/PostForm";
import PostSingle from "../components/PostSingle";
import PostsList from "../components/PostsList";
import Register from "../components/Register";

interface Route {
  path: string;
  element: ReactElement;
  isProtected: boolean;
}

const routes: Route[] = [
  {
    path: "login",
    element: <Login />,
    isProtected: false,
  },
  {
    path: "register",
    element: <Register />,
    isProtected: false,
  },
  {
    path: "posts",
    element: <PostsList />,
    isProtected: true,
  },
  {
    path: "post/:slug",
    element: <PostSingle />,
    isProtected: true,
  },
  {
    path: "posts/add",
    element: <PostFormWrapper />,
    isProtected: true,
  },
  {
    path: "posts/edit/:slug",
    element: <PostFormWrapper />,
    isProtected: true,
  },
];

export default routes;
