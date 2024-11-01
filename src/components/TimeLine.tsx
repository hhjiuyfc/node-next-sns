import { SubmitHandler, useForm } from "react-hook-form";
import Post from "./Post";
import instance from "@/lib/axiosClient";
import { useEffect, useState } from "react";
import { PostType } from "@/types/Posts";

type Inputs = {
  content: string;
};
const TimeLine = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<Inputs>({ mode: "onChange" });

  // onChange入力時に検知してエラーが表示されま;
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data.content);

    try {
      const newPost = await instance.post<PostType>("/posts/post", {
        content: data.content,
      });

      console.log(newPost);

      setPosts((prevState) => [newPost.data, ...prevState]);

      reset();
    } catch (err) {
      console.log(err);
      alert("ログインしてください。");
    }
  };
  console.log(posts);

  useEffect(() => {
    try {
      const fetchLatestPost = async () => {
        // APIを叩く

        const response = await instance.get<PostType[]>(
          "/posts/get_latest_post",
        );

        console.log(response.data);

        setPosts(response.data);
      };

      fetchLatestPost();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <div className="my-4 min-h-screen">
        <main className="container mx-auto my-5">
          <div className="my-4 w-full bg-white p-6 shadow-lg">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex w-full flex-col items-start gap-y-5 p-4 outline-none"
            >
              <textarea
                id=""
                // name属性をしてない React hook fromで定義
                className="h-[80px] w-full p-2 text-lg font-bold"
                placeholder="投稿内容"
                // name属性
                {...register("content", { required: true, maxLength: 200 })}
              />
              {errors.content && (
                <p className="text-xl text-red-500">
                  投稿内容を入力してください。 200文字以内で入力してください。
                </p>
              )}
              <button
                disabled={!isValid}
                className="rounded bg-indigo-500 px-4 py-2 text-white transition-all duration-300 hover:bg-indigo-800 disabled:cursor-not-allowed disabled:opacity-30"
              >
                投稿
              </button>
            </form>
          </div>
          {posts.map((post: PostType) => (
            <Post key={post.id} post={post} />
          ))}
        </main>
      </div>
    </>
  );
};

export default TimeLine;
