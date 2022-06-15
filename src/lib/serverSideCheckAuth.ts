import { GetServerSideProps } from "next";
import { getSession, getCsrfToken, getProviders } from "next-auth/react";

/**
 * Checks if the user is logged in and redirects to the homepage if so.
 * @param context next.GetServerSidePropsContext
 * @returns Promise<{props: { [key: string]: any } }
 */
export const serverSideCheckAuth: GetServerSideProps = async (context) => {
  const { req, res } = context;
  const session = await getSession({ req });

  // If user has a current session, redirect to main page.
  if (session && res && session.user) {
    res.writeHead(302, {
      location: "/",
    });
    res.end();
    return { props: {} };
  }

  const csrfToken = await getCsrfToken(context);

  return {
    props: {
      session: null,
      providers: await getProviders(),
      csrfToken: csrfToken ?? null,
    },
  };
};
