import axios from "axios";
import { LoginInput, User, RegisterInput } from "../types";

async function login(data: LoginInput): Promise<any> {
  return await (
    await axios.post("http://127.0.0.1:8000/api-token-auth/", data)
  ).data;
}

async function getCurrentUser(): Promise<User> {
  return await (
    await axios.get("http://127.0.0.1:8000/current-user/", {
      headers: {
        Authorization: `Token ${window.localStorage.getItem("blog_auth_token") || ""}`,
      },
    })
  ).data;
}

async function registerUser(data: RegisterInput): Promise<User> {
  return await axios.post("http://127.0.0.1:8000/register/", data);
}

export { login, getCurrentUser, registerUser };
