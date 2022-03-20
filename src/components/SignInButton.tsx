import { useSession } from "next-auth/react";
import Link from "next/link";

export const SignInButton = () => {
  const { data, status } = useSession();
  const loggedIn = status === "authenticated";

  return (
    <Link href={!loggedIn ? "/api/auth/signin" : "/api/auth/signout"}>
      <a>{!loggedIn ? "Sign In" : data?.user?.name}</a>
    </Link>
  );
};
