interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string | null;
}

interface IComment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  commented_at: Date;
  users?: User;
}

interface IRequestCreateComment {
  content: string;
}

interface ICreateComment {
  id: string;
  postId: string;
  userId: string;
  content: string;
}

interface IRequestUpdateComment {
  content: string;
}

interface IUpdateComment {
  id: string;
  content: string;
}

export {
  IComment,
  IRequestCreateComment,
  ICreateComment,
  IRequestUpdateComment,
  IUpdateComment,
};
