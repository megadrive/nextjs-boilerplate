import { Avatar } from "@mui/material";
import { useSession } from "next-auth/react";
import Image from "next/image";

const AvatarWithImage = ({ url }: { url: string }) => {
  return <Avatar src={url} />;
};

const AvatarWithoutImage = () => {
  return <Avatar />;
};

export const UserAvatar = () => {
  const { data, status } = useSession();
  return !data ? (
    <AvatarWithoutImage />
  ) : (
    <AvatarWithImage url={data.user!.image!} />
  );
};
