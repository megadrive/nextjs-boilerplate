import { SignInButton } from "./SignInButton";

export const Navbar = () => {
  return (
    <div className="flex items-stretch">
      <div className="">logo</div>
      <div>
        <SignInButton />
      </div>
    </div>
  );
};
