import Header from "@/components/Header";
import { LoginUserProvider } from "@/providers/LoginUserProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LoginUserProvider>
      <div>
        <Header />
        <div>
          <Component {...pageProps} />
        </div>
      </div>
    </LoginUserProvider>
  );
}
