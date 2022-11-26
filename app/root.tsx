import { Links, LiveReload, Outlet } from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";

import styles from "./styles/app.css";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Remix: So great, it's funny!</title>
        <Links />
      </head>
      <body className="bg-slate-300">
        <Outlet />
        <LiveReload />
      </body>
    </html>
  );
}
