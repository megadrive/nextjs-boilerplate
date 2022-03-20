import Head from "next/head";
import { Navbar } from "../components/Navbar";

export default function Home() {
  return (
    <div className="w-4/5">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full">
        <Navbar />
      </main>
    </div>
  );
}
