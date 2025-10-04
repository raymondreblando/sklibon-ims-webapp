import { cn } from "@/lib/utils/utils";

import { MenuIcon } from "./menu-icon";
import { NavLogo } from "./nav-logo";
import { NavMenu } from "./nav-menu";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/buttons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface NavBarProps {
  scrollYPos: number;
}

export default function NavBar({ scrollYPos }: NavBarProps) {
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-10 px-4 transition-colors duration-150 ease-in-out md:px-6",
        scrollYPos > 0 && "border-input/50 border-b bg-white",
      )}
    >
      <div className="flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <MenuIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavMenu
                menuProps={{ className: "max-w-none *:w-full" }}
                lisClassname="flex-col items-start gap-0 md:gap-2"
                itemClassname="w-full"
                linkProps={{
                  className: cn(
                    "py-1.5",
                    scrollYPos > 0
                      ? "text-foreground"
                      : "text-primary-foreground",
                  ),
                }}
              />
            </PopoverContent>
          </Popover>
          <NavLogo />
        </div>
        <div className="flex items-center gap-6">
          <NavMenu
            menuProps={{ className: "max-md:hidden" }}
            lisClassname="flex items-center gap-6"
            linkProps={{
              className: cn(
                "text-sm font-semibold text-muted-foreground hover:text-primary py-1.5 font-medium text-primary-foreground",
                scrollYPos > 0 && "text-foreground",
              ),
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <ButtonLink
            to="/login"
            variant="ghost"
            size="sm"
            className={cn(
              "text-primary-foreground text-sm",
              scrollYPos > 0 && "text-foreground",
            )}
          >
            Log In
          </ButtonLink>
          <ButtonLink to="/register" size="sm" className="text-sm">
            Get Started
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
