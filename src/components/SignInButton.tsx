import { Button } from "@mui/material";
import { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";

const SignIn: NextPage<{}> = () => {
  return (
    <Button variant="contained" href="/api/auth/signin">
      Log In
    </Button>
  );
};

const SignOut = () => {
  return (
    <Button variant="outlined" onClick={() => signOut()}>
      Log Out
    </Button>
  );
};

export const SignInButton = () => {
  const { status } = useSession();
  const authenticated = status === "authenticated";

  return !authenticated ? <SignIn /> : <SignOut />;
};
