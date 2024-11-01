import instance from "@/lib/axiosClient";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  username: string;
  email: string;
  password: string;
};

const SignUpPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<Inputs>({ mode: "onChange" });

  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // api
    try {
      const res = await instance.post("/auth/register", {
        username: data.username,
        email: data.email,
        password: data.password,
      });
      console.log(res);

      router.push("/login");

      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto flex h-screen items-center justify-center">
      {/* タイトルとフォーム */}
      <div className="mx-auto flex w-[500px] flex-col">
        <div className="mx-auto max-w-md">
          <h2 className="mb-4 text-2xl font-bold">アカウントを作成</h2>
        </div>
        {/* フォーム */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex max-w-3xl flex-col gap-5 bg-white p-5 shadow-lg"
        >
          <div className="my-2 flex flex-col">
            <label htmlFor="username" className="my-2 text-xl font-medium">
              お名前
            </label>
            <input
              id="username"
              type="text"
              {...register("username", { required: true })}
              className="w-full rounded-md border-2 border-indigo-500 px-2 py-1 text-xl font-medium outline-none ring-blue-200 ring-offset-0 focus:ring"
            />
            {errors.username && (
              <p className="text-lg text-red-500">お名前は必須です</p>
            )}
          </div>
          <div className="my-2 flex flex-col">
            <label htmlFor="email" className="my-2 text-xl font-medium">
              メールアドレス
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: true,
                //メールアドレスの正規表現
                pattern: /^[a-z\d][\w.-]*@[\w.-]+\.[a-z\d]+$/i,
              })}
              className="w-full rounded-md border-2 border-indigo-500 px-2 py-1 text-xl font-medium outline-none ring-blue-200 ring-offset-0 focus:ring"
            />
            {errors.email && (
              <p className="text-lg text-red-500">
                メールアドレスは必須です メールアドレス形式で入力してください
              </p>
            )}
          </div>
          <div className="my-2 flex flex-col">
            <label htmlFor="password" className="my-2 text-xl font-medium">
              パスワード
            </label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
              })}
              className="w-full rounded-md border-2 border-indigo-500 px-2 py-1 text-xl font-medium outline-none ring-blue-200 ring-offset-0 focus:ring"
            />
            {errors.password && (
              <p className="text-lg text-red-500">
                パスワードは必須です 6文字以上で入力してください。
              </p>
            )}
          </div>
          {/* ログインボタン */}

          {/* isValid	validationの結果を真偽値で返す */}
          <button
            type="submit"
            disabled={!isValid}
            className="w-full cursor-pointer rounded bg-indigo-500 px-3 py-2 text-white disabled:cursor-not-allowed disabled:opacity-30"
          >
            新規登録
          </button>

          <p className="text-center">
            アカウントを作成済みの方は
            <Link href={"/login"} className="underline">
              こちらから
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
