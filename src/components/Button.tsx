type ButtonTypes = "primary" | "secondary";

export const Button = ({
  children,
  type = "primary",
}: {
  children: React.ReactNode;
  type?: ButtonTypes;
}) => {
  const className =
    type === "primary"
      ? "px-4 py-2 m-2 text-base text-white font-bold bg-slate-700 rounded-lg hover:bg-slate-500"
      : "px-4 py-2 m-2 text-base text-slate-700 font-bold bg-white rounded-lg border border-2 border-slate-500";
  return <button className={className}>{children}</button>;
};
