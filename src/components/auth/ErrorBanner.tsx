import { Alert } from "@mui/material";

interface ErrorBannerProps {
  errorCode: string;
}

export const ErrorBanner = ({ errorCode }: ErrorBannerProps) => {
  const errorMessages = new Map([
    ["Default", "Unknown error"],
    ["Configuration", "Configuration error"],
    ["AccessDenied", "Access denied"],
    ["Verification", "Verification error"],
    ["OAuthSignin", "Error in constructing an authorization URL"],
    ["OAuthCallback", "Error in handling the response from an OAuth provider."],
    [
      "OAuthCreateAccount",
      "Could not create OAuth provider user in the database.",
    ],
    [
      "EmailCreateAccount",
      "Could not create email provider user in the database.",
    ],
    ["Callback", "Error in the OAuth callback handler route"],
    [
      "OAuthAccountNotLinked",
      "If the email on the account is already linked, but not with this OAuth account",
    ],
    ["EmailSignin", "Sending the e-mail with the verification token failed"],
    ["CredentialsSignin", "Could not log in with the provided credentials"],
    [
      "SessionRequired",
      "The content of this page requires you to be signed in at all times. See useSession for configuration.",
    ],
  ]);
  const errorMessage =
    errorMessages.get(errorCode) ?? errorMessages.get("Default");

  return <Alert severity="error">{errorMessage}</Alert>;
};
