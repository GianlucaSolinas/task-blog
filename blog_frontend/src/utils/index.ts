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

export { slugify, getAuthorShownName };
