import { useSession } from "next-auth/react";
import { SignInButton } from "./SignInButton";
import Image from "next/image";
import LogoImage from "../../public/logo.jpg";

export const Navbar = () => {
  const { data, status } = useSession();
  const authenticated = status === "authenticated";

  return (
    <div className="flex items-stretch">
      <div className="grow">
        <Image alt="Website logo" src={LogoImage} width={200} height={75} />
      </div>
      <div>
        <SignInButton />
      </div>
    </div>
  );
};
