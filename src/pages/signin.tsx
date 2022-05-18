import { Box, Button, Container, Divider, TextField } from "@mui/material";
import { fontWeight } from "@mui/system";
import { GetServerSideProps, NextPage } from "next";
import { Session } from "next-auth";
import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
} from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useRef } from "react";
import { ErrorBanner } from "../components/auth/ErrorBanner";

const SignInPage: NextPage<{
  session: Session | null;
  providers: any;
  csrfToken: string | undefined;
}> = ({ session, providers, csrfToken }) => {
  // Get the error code, if any.
  const router = useRouter();
  const queryError = router.query?.error;
  const error = Array.isArray(queryError) ? queryError[0] : queryError;

  const onSubmit = () => {};

  return (
    <Container>
      <Head>
        <title>Sign in</title>
      </Head>

      <h1>Sign up</h1>

      {error && (
        <Box>
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
            >
              Sign in with {provider.name}
            </Button>
          );
        })}
      </Box>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  const session = await getSession({ req });

  // If user has a current session, redirect to main page.
  if (session && res && session.user) {
    res.writeHead(302, {
      location: "/",
    });
    res.end();
    return { props: {} };
  }

  const csrfToken = await getCsrfToken(context);

  return {
    props: {
      session: null,
      providers: await getProviders(),
      csrfToken: csrfToken ?? null,
    },
  };
};

export default SignInPage;
