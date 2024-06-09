import * as stytch from "stytch";
import { createCookie } from "@remix-run/node";

const STYTCH_JWT_COOKIE_NAME = "stytch_session_jwt";
const STYTCH_TOKEN_COOKIE_NAME = "stytch_session";

export async function getStytchSignOutCookie(): Promise<Headers> {
  const cookieJWT = createCookie(STYTCH_JWT_COOKIE_NAME, {
    maxAge: 1,
    path: "/",
  });

  const cookieSession = createCookie(STYTCH_TOKEN_COOKIE_NAME, {
    maxAge: 1,
    path: "/",
  });

  const headers = new Headers();
  headers.append("Set-Cookie", await cookieJWT.serialize("123"));
  headers.append("Set-Cookie", await cookieSession.serialize("123"));
  return headers;
}

export async function getStytchJWTCookie(
  request: Request
): Promise<string | null> {
  const cookieHeader = request.headers.get("Cookie");
  if (!cookieHeader) return null;

  const cookies = Object.fromEntries(
    cookieHeader.split("; ").map((c) => c.split("="))
  );
  const stytchJWT = cookies[STYTCH_JWT_COOKIE_NAME];
  if (!stytchJWT) return null;

  return stytchJWT;
}

export let client: stytch.Client | undefined;

export async function loadStytch(): Promise<stytch.Client> {
  if (!client) {
    client = new stytch.Client({
      project_id: "some project id",
      secret: "some secret key",
      env:
        process.env.STYTCH_PROJECT_ENV === "live"
          ? stytch.envs.live
          : stytch.envs.test,
    });
  }

  return client;
}
