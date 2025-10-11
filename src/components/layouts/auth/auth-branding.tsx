import { Link, linkOptions } from "@tanstack/react-router";

import LibonLogo from "@/assets/libon-logo.webp";
import SKLogo from "@/assets/logo.webp";

const links = linkOptions([
  {
    to: "/",
    label: "Home",
    activeOptions: { exact: true },
  },
  {
    to: "/sk-galleries",
    label: "Galleries",
    activeOptions: { exact: true },
  },
  {
    to: "/sk-events",
    label: "Events",
    activeOptions: { exact: true },
  },
  {
    to: "/sk-contacts",
    label: "Contacts",
    activeOptions: { exact: true },
  },
  {
    to: "/libon-hotlines",
    label: "Hotlines",
    activeOptions: { exact: true },
  },
]);

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
          <li key={link.label} className="list-none">
            <Link
              {...link}
              activeProps={{ className: "font-bold text-primary" }}
              className="text-muted hover:text-primary text-sm md:text-base"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </nav>
    </div>
  );
};
