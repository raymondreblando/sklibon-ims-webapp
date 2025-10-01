import type { ComponentProps } from "react";
import { Link, type LinkComponentProps } from "@tanstack/react-router";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const navigationLinks = [
  { href: "#", label: "Home", active: true },
  { href: "#", label: "Events" },
  { href: "#", label: "Gallery" },
  { href: "#", label: "SK Officials" },
  { href: "#", label: "About" },
];

interface NavMenuProps {
  menuProps?: Pick<ComponentProps<"nav">, "className"> & {
    viewport?: boolean;
  };
  lisClassname?: string;
  itemClassname?: string;
  linkProps?: LinkComponentProps;
}

export const NavMenu = ({
  menuProps,
  lisClassname,
  itemClassname,
  linkProps,
}: NavMenuProps) => {
  return (
    <NavigationMenu
      viewport={menuProps?.viewport}
      className={menuProps?.className}
    >
      <NavigationMenuList className={lisClassname}>
        {navigationLinks.map((link, index) => (
          <NavigationMenuItem key={index} className={itemClassname}>
            <Link
              {...linkProps}
              href={link.href}
              className={linkProps?.className}
            >
              {link.label}
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
