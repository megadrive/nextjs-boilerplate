import { Skeleton } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Me = () => {
  const router = useRouter();
  const { status, data } = useSession({
    required: true,
    onUnauthenticated() {
      // Redirect to signin page if not authenticated
      router.push("/signin");
    },
  });
  return (
    <>
      {status === "loading" ? (
        <Skeleton variant="text" width={300} height={10} />
      ) : (
        <div>Your name is {data.user?.name}</div>
      )}
    </>
  );
};

export default Me;
