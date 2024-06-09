import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/router";
import { getStytchJWTCookie, loadStytch } from "~/auth/stytch.server";
import { useStytchUser } from "@stytch/nextjs";
import Navbar from "~/components/nav";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const jwt = await getStytchJWTCookie(request);
  if (!jwt) return redirect("/");

  const stytchClient = await loadStytch();

  try {
    // This happens locally, without any API calls... so it's fast!
    const session = await stytchClient.sessions.authenticateJwt({
      session_jwt: jwt,
    });
    return json({ session });
  } catch (e) {
    return redirect("/");
  }
};

export default function ProtectedPage() {
  const data = useLoaderData<typeof loader>();
  const { user } = useStytchUser();
  return (
    <div className="container mx-auto">
      <Navbar title={"Test Stytch Auth"} subtitle={"Protected Page"} />
      <div className="mb-10">
        We validate the JWT on the Remix backend without making an API call
        (i.e. validating the signature) to protect the route.
      </div>
      <h2 className="text-2xl text-brand-gray-100 leading-relaxed">
        User Details
      </h2>
      <div>This is a frontend call to Stytch</div>
      <div className="overflow-auto rounded-md p-4 bg-brand-gray-800 border-brand-gray-600 my-4 border">
        <pre className="text-xs">{JSON.stringify(user, null, 2)}</pre>
      </div>

      <h2 className="text-2xl mt-10 text-brand-gray-100 leading-relaxed">
        JWT String
      </h2>
      <div>This is the JWT that is stored in the cookie.</div>
      <div className="font-mono break-all text-xs rounded-md p-4 bg-brand-gray-800 border-brand-gray-600 my-4 border">
        {data.session.session_jwt}
      </div>
    </div>
  );
}
