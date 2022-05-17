import axios from "axios";
import { LoginInput } from "../types";

async function login(data: LoginInput): Promise<any> {
  return await (
    await axios.post("http://127.0.0.1:8000/api-token-auth/", data)
  ).data;
}

export { login };
