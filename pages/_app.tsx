import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import config from "../tailwind.config";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        body {
          background-color: ${config.theme.extend.colors.brand.DEFAULT};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
