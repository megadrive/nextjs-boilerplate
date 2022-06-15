import Head from "next/head";
import { Layout } from "../components/Layout";
import { Navbar } from "../components/Navbar";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
    </Layout>
  );
}
