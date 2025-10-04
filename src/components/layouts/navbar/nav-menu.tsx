import type { ComponentProps } from "react";
import {
  Link,
  linkOptions,
  type LinkComponentProps,
} from "@tanstack/react-router";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const navigationLinks = linkOptions([
  {
    to: "/",
    hash: "hero-section",
    label: "Home",
  },
  {
    to: "/",
    hash: "event-section",
    label: "Events",
  },
  {
    to: "/",
    hash: "gallery-section",
    label: "Gallery",
  },
  {
    to: "/",
    hash: "skofficials-section",
    label: "SK Officials",
  },
  {
    to: "/",
    hash: "about-section",
    label: "About",
  },
]);

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
              to={link.to}
              hash={link.hash}
              className={linkProps?.className}
              activeOptions={{
                exact: true,
                includeHash: true,
              }}
              activeProps={{ className: "text-primary font-extrabold" }}
              resetScroll={false}
            >
              {link.label}
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
