import axios from "axios";
import { LoginInput, User, RegisterInput } from "../types";
import { getApiURL } from "../utils";

async function login(data: LoginInput): Promise<any> {
  return await (
    await axios.post(`${getApiURL()}/api-token-auth/`, data)
  ).data;
}

async function getCurrentUser(): Promise<User> {
  return await (
    await axios.get(`${getApiURL()}/current-user/`, {
      headers: {
        Authorization: `Token ${window.localStorage.getItem("blog_auth_token") || ""}`,
      },
    })
  ).data;
}

async function registerUser(data: RegisterInput): Promise<User> {
  return await axios.post(`${getApiURL()}/register/`, data);
}

export { login, getCurrentUser, registerUser };
