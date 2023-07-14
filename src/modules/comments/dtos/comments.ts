interface IComment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  commented_at: Date;
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

export { IComment, ICreateComment, IRequestCreateComment };
