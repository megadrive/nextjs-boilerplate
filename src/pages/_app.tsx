import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { MantineProvider } from "@mantine/core";
import { darkModeStore } from "../stores/darkMode";
import { useState } from "react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [darkMode, setDarkMode] = useState(darkModeStore.getState());
  darkModeStore.subscribe((state) => {
    setDarkMode(state);
  });

  return (
    <MantineProvider
      theme={{
        colorScheme: darkMode ? "dark" : "light",
        fontFamily: "Tahoma, sans-serif",
      }}
    >
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </MantineProvider>
  );
}

export default MyApp;
