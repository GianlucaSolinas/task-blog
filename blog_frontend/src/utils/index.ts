import { AxiosRequestHeaders } from "axios";
import { User } from "../types";

function slugify(str: string = ""): string {
  return str.trim().toLocaleLowerCase().replaceAll(/\s/g, "-");
}

function getAuthorShownName(author: User | undefined): string {
  if (!author) {
    return "Anonymous user";
  }
  return author["first_name"] && author["last_name"] ? `${author.first_name} ${author.last_name}` : author.username;
}

function getApiURL(): string {
  const currentEnvUrl = window.location.origin.toString();

  if (currentEnvUrl.includes("localhost")) {
    return "http://127.0.0.1:8000";
  } else {
    return "https://pacific-ridge-81267.herokuapp.com";
  }
}

function getDefaultHeaders(): AxiosRequestHeaders {
  return {
    Authorization: `Token ${window.localStorage.getItem("blog_auth_token") || ""}`,
    // "Access-Control-Allow-Origin": window.location.origin.toString(),
    // "Access-Control-Allow-Headers": "*",
  };
}

export { slugify, getAuthorShownName, getApiURL, getDefaultHeaders };
