import { PropsOf } from "@emotion/react";
import { Avatar } from "@mui/material";
import { useSession } from "next-auth/react";

const AvatarWithImage = ({ src, alt }: PropsOf<typeof Avatar>) => {
  return <Avatar src={src} alt={alt} />;
};

const AvatarWithoutImage = ({ alt }: PropsOf<typeof Avatar>) => {
  return <Avatar alt={alt} />;
};

/**
 * Displays a small avatar for a logged-in user.
 */
export const UserAvatar = () => {
  const { data, status } = useSession();
  return status === "loading" || !data?.user?.image ? (
    <AvatarWithoutImage />
  ) : (
    <AvatarWithImage src={data.user.image} alt={data.user.name!} />
  );
};
