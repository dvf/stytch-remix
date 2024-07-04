import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { createStytchUIClient } from "@stytch/nextjs/ui";
import { StytchProvider } from "@stytch/nextjs";
import stylesheet from "~/tailwind.css?url";
import { LinksFunction } from "@remix-run/node";

const stytch = createStytchUIClient(
  "INSERT YOUR STYTCH PUBLIC TOKEN"
);

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <StytchProvider stytch={stytch}>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body className="bg-brand-gray-900 text-brand-gray-200 p-4">
          {children}
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    </StytchProvider>
  );
}

export default function App() {
  return <Outlet />;
}
