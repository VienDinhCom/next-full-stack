import type { ReactNode } from "react";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import logo from "@src/assets/react.svg";
import "./root.css";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Deves React</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function HydrateFallback() {
  return (
    <div className="flex h-dvh w-dvw items-center justify-center overflow-hidden bg-gray-900">
      <img
        className="animate-spin"
        width={50}
        height={50}
        src={logo}
        alt="Loader"
      />
    </div>
  );
}
