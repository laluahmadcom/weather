import { Outlet } from "@remix-run/react";
import LinkItem from "~/components/linkitem";

const listInfo = [
  { href: "/home/bmkg/autogempa", tittle: "Gempa Terbaru" },
  { href: "/home/bmkg/gempaterkini", tittle: "15 Gempa M 5.0+" },
  { href: "/home/bmkg/gempadirasakan", tittle: "15 Gempa Dirasakan" },
  { href: "/home/bmkg/cuaca", tittle: "Cuaca" },
];

export default function Bmkg() {
  return (
    <>
      <header className="flex w-full p-1 bg-skin-bold/50 items-center justify-center">
        <a href="https://data.bmkg.go.id/" target={"_blank"}>
          <img src="/images/logo-bmkg.svg" className="h-10" />
        </a>
        <div className="pl-3 text-sm text-center font-semibold text-skin-bold">
          <h1>Sumber informasi dari BMKG</h1>
          <h1>(Badan Meteorologi, Klimatologi, dan Geofisika)</h1>
        </div>
      </header>

      <nav className="flex w-scren h-8 bg-skin-bold/90 items-center justify-center">
        {listInfo.map((item, index) => (
          <LinkItem key={index} title={item.tittle} to={item.href} />
        ))}
      </nav>

      <Outlet />
    </>
  );
}
