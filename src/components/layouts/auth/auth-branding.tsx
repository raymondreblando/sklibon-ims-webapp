import { Link } from "@tanstack/react-router";

import LibonLogo from "@/assets/libon-logo.webp";
import SKLogo from "@/assets/logo.webp";

const links = [
  {
    name: "Galleries",
    path: "/",
  },
  {
    name: "Announcements",
    path: "/",
  },
  {
    name: "Contacts",
    path: "/",
  },
  {
    name: "Hotlines",
    path: "/",
  },
];

export const AuthBranding = () => {
  return (
    <>
      <div className="flex items-center justify-center gap-x-4">
        <img src={SKLogo} alt="sk logo" className="h-[90px] md:h-[200px]" />
        <img src={LibonLogo} alt="libon logo" className="h-[80px] md:h-[190px] w-[80px] md:w-[190px]" />
      </div>
      <h2 className="text-center text-xl md:text-2xl font-bold">
        Libon SK Federation Information Management System
      </h2>
      <nav className="flex items-center justify-center gap-x-4">
        {links.map((link) => (
          <li key={link.name} className="list-none">
            <Link to={link.path} className="text-muted text-sm md:text-base hover:text-primary">
              {link.name}
            </Link>
          </li>
        ))}
      </nav>
    </>
  );
};
