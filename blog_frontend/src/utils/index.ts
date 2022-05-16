function slugify(str: string = ""): string {
  return str.trim().toLocaleLowerCase().replaceAll(/\s/g, "-");
}

export { slugify };
