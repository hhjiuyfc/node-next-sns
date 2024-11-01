import instance from "@/lib/axiosClient";
import { useAuthUser } from "@/providers/LoginUserProvider";
import { PostType } from "@/types/Posts";
import Link from "next/link";
// import React, { Dispatch, SetStateAction } from "react";

type PostProps = {
  post: PostType;
  // setPosts: Dispatch<SetStateAction<PostType[]>>;
};

const Post = ({ post }: PostProps) => {
  const { users } = useAuthUser();
  console.log(users);
  // console.log(post.author);

  const handleDeletePost = async () => {
    try {
      const res = await instance.delete(`/posts/${post.id}`);
      console.log(res.data);
      window.location.reload();
      // setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mb-4 rounded bg-white p-4 shadow-lg">
      <div className="mb-4">
        <div className="flex items-center p-2">
          <Link href={`/profile/${post.authorId}`}>
            <img
              className="mr-2 h-10 w-10 rounded-full"
              src={post.author.profile?.profileImageUrl}
              alt="User Avatar"
              width={500}
            />
          </Link>
          <div className="mb-2">
            <h2 className="text-lg font-bold text-slate-800">
              {post.author?.username}
            </h2>
            <p className="text-lg">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        <p className="text-xl font-bold text-slate-600">投稿:{post.content}</p>
      </div>
      <div className="flex">
        {users?.id === post.authorId && (
          <button
            onClick={handleDeletePost}
            className="rounded bg-red-500 px-3 py-2 text-white transition-all duration-300 hover:bg-red-800"
          >
            削除
          </button>
        )}
      </div>
    </div>
  );
};

export default Post;
