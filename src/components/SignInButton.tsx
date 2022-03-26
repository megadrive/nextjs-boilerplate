import { useSession } from "next-auth/react";
import Link from "next/link";

const SignIn = () => {
  return <Link href="/api/auth/signin">Log In</Link>;
};

const SignOut = (props: { name: string }) => {
  const { name } = props;
  return (
    <span>
      {name} <Link href="/api/auth/signout">Log Out</Link>
    </span>
  );
};

export const SignInButton = () => {
  const { data, status } = useSession();
  const name = data?.user?.name;
  const loggedIn = status === "authenticated";

  return !loggedIn ? <SignIn /> : <SignOut name={name ? name : "Unknown"} />;
};
