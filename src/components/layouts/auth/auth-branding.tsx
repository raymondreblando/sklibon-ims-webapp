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
    path: "/libon-hotlines",
  },
];

export const AuthBranding = () => {
  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex items-center justify-center gap-x-4">
        <img src={SKLogo} alt="sk logo" className="h-[90px] md:h-[150px]" />
        <img
          src={LibonLogo}
          alt="libon logo"
          className="h-[80px] w-[80px] md:h-[140px] md:w-[140px]"
        />
      </div>
      <h2 className="mx-auto max-w-[500px] text-center text-xl font-extrabold md:text-2xl">
        Libon SK Federation Information Management System
      </h2>
      <nav className="flex items-center justify-center gap-x-4">
        {links.map((link) => (
          <li key={link.name} className="list-none">
            <Link
              to={link.path}
              className="text-muted hover:text-primary text-sm md:text-base"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </nav>
    </div>
  );
};
