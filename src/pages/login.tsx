import instance from "@/lib/axiosClient";
import { useAuthUser } from "@/providers/LoginUserProvider";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

const LoginPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<Inputs>({ mode: "onChange" });

  const router = useRouter();

  const { login } = useAuthUser();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    // api
    try {
      const res = await instance.post("/auth/login", {
        email: data.email,
        password: data.password,
      });

      console.log(res);

      const token = res.data.token;
      console.log(token);

      login(token);

      reset();

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto flex h-screen items-center justify-center">
      {/* タイトルとフォーム */}
      <div className="mx-auto flex w-[500px] flex-col">
        <div className="mx-auto max-w-md">
          <h2 className="mb-4 text-2xl font-bold">アカウントにログイン</h2>
        </div>
        {/* フォーム */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex max-w-4xl flex-col gap-10 bg-white p-10 shadow-lg"
        >
          <div className="flex flex-col">
            <label htmlFor="email" className="my-4 text-xl font-medium">
              メールアドレス
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: true,
                pattern: /^[a-z\d][\w.-]*@[\w.-]+\.[a-z\d]+$/i,
              })}
              className="w-full rounded-md border-2 border-indigo-500 px-2 py-1 text-xl font-medium outline-none ring-blue-200 ring-offset-0 focus:ring"
            />
            {errors.email && (
              <p className="text-lg text-red-500">
                メールアドレスは必須です。半角英数字 大文字
                @.-を入力してください。
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-xl font-medium">
              パスワード
            </label>
            <input
              id="password"
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              className="my-4 w-full rounded-md border-2 border-indigo-500 px-2 py-1 text-xl font-medium outline-none ring-blue-200 ring-offset-0 focus:ring"
            />
            {errors.password && (
              <p className="text-lg text-red-500">
                パスワードは必須です 6文字以上で入力してください。
              </p>
            )}
          </div>
          {/* ログインボタン */}
          <button
            disabled={!isValid}
            className="w-full rounded bg-indigo-500 px-3 py-2 text-white transition duration-300 hover:bg-indigo-800 disabled:cursor-not-allowed disabled:opacity-30"
          >
            ログイン
          </button>
          <p className="text-center">
            アカウントをお持ちでない方は
            <Link href={"/signUp"} className="underline">
              こちら
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
