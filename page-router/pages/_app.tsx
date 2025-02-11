import "@/styles/globals.css";
import type { AppProps } from "next/app";
import RootLayout from "@/layout";
import { useRouter } from "next/router";
// import { useRouter } from "next/navigation";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const metaTitle =
    router.pathname === "/" ? "Home" : router.pathname.replace("/", "");

  console.log(router);
  return (
    <>
      <RootLayout metaTitle={metaTitle}>
        <Component {...pageProps} />
      </RootLayout>
    </>
  );
}
