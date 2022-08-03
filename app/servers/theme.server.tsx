import { createCookieSessionStorage } from "@remix-run/node";

const themeStorage = createCookieSessionStorage({
  cookie: {
    name: "_ThemeColor",
    secure: true,
    secrets: ["janganbilangsiapasiapayach"],
    sameSite: "none",
    path: "/",
    httpOnly: true,
  },
});

export async function getThemeSession(request: Request) {
  const session = await themeStorage.getSession(request.headers.get("Cookie"));
  return {
    getTheme: () => {
      const themeValue = session.get("themes");
      return themeValue;
    },
    setTheme: (theme: string | null) => session.set("themes", theme),
    commit: () => themeStorage.commitSession(session),
  };
}
