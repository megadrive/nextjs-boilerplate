import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./Button";

const SignIn = () => {
  return (
    <Button type="primary">
      <Link href="/api/auth/signin">
        <a>Log In</a>
      </Link>
    </Button>
  );
};

const SignOut = () => {
  return (
    <Button type="secondary">
      <Link href="/api/auth/signout">
        <a>Log Out</a>
      </Link>
    </Button>
  );
};

export const SignInButton = () => {
  const { status } = useSession();
  const authenticated = status === "authenticated";

  return !authenticated ? <SignIn /> : <SignOut />;
};
