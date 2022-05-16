interface User {
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

export type { Post, User };
