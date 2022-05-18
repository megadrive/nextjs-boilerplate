// import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { darkModeStore } from "../stores/darkMode";
import { useState } from "react";
import { RecoilRoot } from "recoil";
import Head from "next/head";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [darkMode, setDarkMode] = useState(darkModeStore.getState());
  darkModeStore.subscribe((state) => {
    setDarkMode(state);
  });

  return (
    <RecoilRoot>
      <SessionProvider session={session}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <Component {...pageProps} />
      </SessionProvider>
    </RecoilRoot>
  );
}

export default MyApp;
