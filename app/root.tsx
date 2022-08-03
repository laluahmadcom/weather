import {
  MetaFunction,
  LoaderFunction,
  json,
  ActionFunction,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import PojokBusana from "./components/pojokbusana";
import { getThemeSession } from "./servers/theme.server";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

import styles from "./styles/app.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const loader: LoaderFunction = async ({ request }) => {
  const themeSession = await getThemeSession(request);
  const activeTheme = themeSession.getTheme();

  return json(
    { activeTheme },
    { headers: { "set-Cookie": await themeSession.commit() } }
  );
};

export const action: ActionFunction = async ({ request }) => {
  const themeSession = await getThemeSession(request);
  const formData = await request.formData();
  let { TemaGue } = Object.fromEntries(formData);

  themeSession.setTheme(String(TemaGue));

  return json(
    { success: true },
    { headers: { "Set-Cookie": await themeSession.commit() } }
  );
};

export default function App() {
  let { activeTheme } = useLoaderData();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <div className={activeTheme}>
          <Outlet />
          <PojokBusana />
        </div>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }) {
  console.error(error);
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <span className="text-3xl text-skin-bold text-center">
          Ups maaf terjadi kesalahan, mohon refresh halamannya, jika masih
          terjadi silahkan hubungi
        </span>
        <span className="text-5xl text-skin-bold text-center">Suparman</span>
        <Scripts />
      </body>
    </html>
  );
}
