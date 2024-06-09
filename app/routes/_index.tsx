import { MetaFunction } from "@remix-run/node";
import { useStytchUser } from "@stytch/nextjs";
import { Link } from "@remix-run/react";
import Navbar from "~/components/nav";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const { user } = useStytchUser();

  return (
    <div className="container mx-auto">
      <Navbar title={"Test Stytch Auth"} />
      <div>
        {!user && (
          <Link to={"/login"}>
            <div className="w-[360px] h-12 px-5 py-3 bg-gradient-to-r from-purple-500 to-violet-700 rounded-[10px] justify-center items-center gap-2 inline-flex">
              <div className="text-white text-base font-bold leading-normal">
                Login
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
