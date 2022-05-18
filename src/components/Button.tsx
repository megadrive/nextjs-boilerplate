import MaterialButton from "@mui/material/Button";
import { NextPage } from "next";

export const Button: NextPage<{}> = ({ children }) => {
  return (
    <MaterialButton variant="contained" color="primary">
      {children}
    </MaterialButton>
  );
};
