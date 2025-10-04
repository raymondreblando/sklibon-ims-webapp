import { Link } from "@tanstack/react-router";

import SKLogo from "@/assets/logo.webp";
import LibonLogo from "@/assets/libon-logo.webp";

export const NavLogo = () => {
  return (
    <Link to="/" className="flex items-center gap-x-2">
      <img src={SKLogo} alt="sk logo" className="h-10" />
      <img src={LibonLogo} alt="libon logo" className="h-10" />
    </Link>
  );
};
