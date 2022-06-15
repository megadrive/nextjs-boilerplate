import { Box, Button, Container, Divider, TextField } from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ErrorBanner } from "../components/auth/ErrorBanner";
import { Layout } from "../components/Layout";
import { serverSideCheckAuth } from "../lib/serverSideCheckAuth";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Navbar } from "../components/Navbar";

const SignInPage: NextPage<{
  session: Session | null;
  providers: any;
  csrfToken: string | undefined;
}> = ({ session, providers, csrfToken }) => {
  // Get the error code, if any.
  const router = useRouter();
  const queryError = router.query?.error;
  const error = Array.isArray(queryError) ? queryError[0] : queryError;

  const onSubmit = (event: any) => {
    event.preventDefault();
    signIn("credentials");
  };

  return (
    <Layout>
      <Head>
        <title>Sign in</title>
      </Head>

      <Navbar />

      <h1>Sign in</h1>

      {error && (
        <Box marginX={2} marginY={2}>
          <ErrorBanner errorCode={error} />
        </Box>
      )}

      {/* Email */}
      <form method="post" action="/api/auth/signin" onSubmit={onSubmit}>
        <Box alignContent={"center"}>
          <input type="hidden" name="csrfToken" value={csrfToken} />
          <Box marginBottom={1}>
            <TextField
              id="email"
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
            />
          </Box>
          <Box marginBottom={1}>
            <TextField
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
            />
          </Box>
          <Box>
            <Button variant="outlined" type="submit" fullWidth>
              Sign in with email
            </Button>
          </Box>
        </Box>
      </form>

      <Divider>
        <span
          style={{ fontSize: 12, fontFamily: "Arial", fontWeight: "bolder" }}
        >
          OR
        </span>
      </Divider>

      {/* Providers */}
      <Box>
        {Object.values(providers).map((provider: any) => {
          if (provider.name === "Email") return;
          return (
            <Button
              key={provider.name}
              href={provider.url}
              onClick={() => signIn(provider.id)}
              fullWidth
            >
              {provider.name === "Facebook" ? <FacebookIcon /> : provider.name}
            </Button>
          );
        })}
      </Box>
    </Layout>
  );
};

// Check the current session.
export const getServerSideProps: GetServerSideProps = serverSideCheckAuth;
export default SignInPage;
