import { UserAvatar } from "./UserAvatar";
import { SignInButton } from "./SignInButton";
import { Grid, Stack } from "@mui/material";

export const Navbar = () => {
  return (
    <Grid container spacing={1} marginTop={1}>
      <Grid item flexGrow={1}>
        Left side
      </Grid>
      <Stack direction="row" justifyContent="flex-end" spacing={1}>
        {/* TODO: convert this stack to a clickable option */}
        <UserAvatar />
        <SignInButton />
      </Stack>
    </Grid>
  );
};
