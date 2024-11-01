import { useAuthUser } from "@/providers/LoginUserProvider";
import Link from "next/link";
import React from "react";

const Header = () => {
  const { users, logout } = useAuthUser();
  console.log(users);
  return (
    <header className="w-full bg-teal-500 p-10 text-white">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          <Link href={"/"}>SNS APP</Link>
        </h1>
        {users ? (
          <nav>
            <ul className="flex items-center gap-4">
              <li>
                <Link
                  href={`/profile/${users.id}`}
                  className="rounded bg-white px-4 py-3 text-slate-800 transition-all duration-300 hover:opacity-30"
                >
                  プロフィール
                </Link>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="rounded bg-white px-4 py-3 text-slate-800 transition-all duration-300 hover:opacity-30"
                >
                  ログアウト
                </button>
              </li>
            </ul>
          </nav>
        ) : (
          <nav>
            <ul className="flex gap-4">
              <li>
                <Link
                  href={"/login"}
                  className="rounded bg-white px-4 py-3 text-slate-800 transition-all duration-300 hover:opacity-30"
                >
                  ログイン
                </Link>
              </li>
              <li>
                <Link
                  href={"/signUp"}
                  className="rounded bg-white px-4 py-3 text-slate-800 transition-all duration-300 hover:opacity-30"
                >
                  サインアップ
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
