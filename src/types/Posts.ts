export type Profile = {
  id: number;
  bio: string;
  profileImageUrl: string;
  userId: number;
  user: UserType;
};

export type UserType = {
  id: number;
  username: string;
  email: string;
  password: string;
  posts: PostType[];
  profile: Profile;
};

export type PostType = {
  id: number;
  content: string;
  createdAt: string;
  authorId: number;
  author: UserType;
};
