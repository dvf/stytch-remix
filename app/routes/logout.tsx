import { redirect } from "@remix-run/node";
import {
  getStytchJWTCookie,
  getStytchSignOutCookie,
  loadStytch,
} from "~/auth/stytch.server";
import { LoaderFunctionArgs } from "@remix-run/router";

export async function loader({ request }: LoaderFunctionArgs) {
  const jwt = await getStytchJWTCookie(request);
  if (!jwt) return redirect("/");

  const stytchClient = await loadStytch();

  // This invalidates the session via API call to Stytch
  await stytchClient.sessions.revoke({ session_jwt: jwt });

  const headers = await getStytchSignOutCookie();
  return redirect("/", { headers: headers });
}
