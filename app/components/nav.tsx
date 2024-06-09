import { Link } from "@remix-run/react";
import { useStytchUser } from "@stytch/nextjs";

type NavbarProps = {
  title: string;
  subtitle?: string;
};

export default function Navbar({ title, subtitle }: NavbarProps) {
  const { user } = useStytchUser();

  return (
    <>
      <div className="mb-2">
        <h1 className="text-4xl leading-relaxed text-brand-gray-100">
          {title}{" "}
          <span className="text-2xl text-brand-gray-300">{subtitle}</span>
        </h1>
      </div>
      {user && (
        <>
          <div className="flex flex-row items-center gap-2">
            <span className="inline-flex flex-row items-center gap-1 rounded-full border p-1 pr-3 bg-brand-gray-800 border-brand-gray-600">
              <div className="inline-block h-6 w-6 overflow-clip rounded-full border-2 border-brand-gray-400">
                <img
                  src={user.providers[0].profile_picture_url}
                  alt="Profile Pic"
                />
              </div>
              {user.emails[0]?.email}
            </span>{" "}
            <span className="text-sm">
              [{" "}
              <Link
                className="text-brand-blue/80 hover:text-brand-blue"
                to={"/"}
              >
                Home
              </Link>{" "}
              ] [{" "}
              <Link
                className="text-brand-blue/80 hover:text-brand-blue"
                to={"/protected"}
              >
                User Details
              </Link>{" "}
              ] [{" "}
              <Link
                className="text-brand-blue/80 hover:text-brand-blue"
                to={"/logout"}
              >
                Logout
              </Link>{" "}
              ]
            </span>
          </div>
          <div className="rounded-full bg-brand-gray-700 h-[1px] my-4" />
        </>
      )}
    </>
  );
}
