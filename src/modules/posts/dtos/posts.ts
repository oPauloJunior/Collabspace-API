interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string | null;
}

interface IPost {
  id: string;
  user_id: string;
  content: string;
  tags: string | null;
  visibility: number;
  published_at: Date;
  users?: User;
}

interface IRequestCreatePost {
  content: string;
  tags: string;
  visibility: number;
}

interface ICreatePost {
  id: string;
  userId: string;
  content: string;
  tags?: string;
  visibility?: number;
}

interface IRequestUpdatePost {
  content: string;
  tags: string;
  visibility: number;
}

interface IUpdatePost {
  id: string;
  content: string;
  tags: string;
  visibility: number;
}

interface Reaction {
  id: string;
  entity_type: number;
  reacted_at: Date;
  users: User;
}

interface Comment {
  id: string;
  content: string;
  commented_at: Date;
  users: User;
  reactions: Reaction[];
}

interface IListAllPosts {
  id: string;
  content: string;
  tags: string | null;
  visibility: number;
  published_at: Date;
  users: User;
  comments: Comment[];
  reactions: Reaction[];
}

export {
  IPost,
  IRequestCreatePost,
  ICreatePost,
  IRequestUpdatePost,
  IUpdatePost,
  IListAllPosts,
};
