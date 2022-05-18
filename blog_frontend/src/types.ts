interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
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

interface EditPostInput {
  id: string;
  data: PostInput;
}

interface LoginInput {
  username: string;
  password: string;
}

interface RegisterInput {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
}

export type { Post, User, PostInput, LoginInput, EditPostInput, RegisterInput };
