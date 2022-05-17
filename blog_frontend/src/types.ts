interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
}

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  created_at: string;
  updated_at: string;
  views: number;
  author: User;
}

interface PostInput {
  title: string;
  content: string;
  slug: string;
}

interface LoginInput {
  username: string;
  password: string;
}

export type { Post, User, PostInput, LoginInput };
