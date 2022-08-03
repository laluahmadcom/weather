import { Outlet } from "@remix-run/react";
import LinkItem from "~/components/linkitem";

const homeMenus = [
  { href: "/home", tittle: "Home", icon: "BsFillLaptopFill" },
  { href: "/home/bmkg", tittle: "Info BMKG", icon: "BsFillCloudHaze2Fill" },
];

export default function Home() {
  return (
    <div className="relative min-w-screen min-h-screen w-full h-full bg-skin-main">
      <nav className="flex w-full h-10 bg-skin-bold drop-shadow-lg items-center">
        {homeMenus.map((item, index) => (
          <LinkItem
            key={index}
            title={item.tittle}
            to={item.href}
            linkIcon={item.icon}
          />
        ))}
      </nav>
      <Outlet />
    </div>
  );
}
