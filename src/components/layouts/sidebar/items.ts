import { ROLES } from "@/lib/constants";
import type { SidebarItemProps } from "@/types";
import {
  AlbumIcon,
  AlignEndHorizontalIcon,
  ArchiveIcon,
  CalendarIcon,
  CardSimIcon,
  FileChartColumnIcon,
  HeadsetIcon,
  ImageIcon,
  LandPlotIcon,
  LayoutGridIcon,
  ServerIcon,
  UsersIcon,
} from "lucide-react";

export const items: SidebarItemProps[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    authorize: [ROLES.SUPERADMIN, ROLES.ADMIN, ROLES.USER],
    icon: LayoutGridIcon,
  },
  {
    title: "Requests",
    url: "/requests",
    authorize: [ROLES.SUPERADMIN, ROLES.ADMIN, ROLES.USER],
    icon: ServerIcon,
  },
  {
    title: "Events",
    url: "/events",
    authorize: [ROLES.SUPERADMIN, ROLES.ADMIN, ROLES.USER],
    icon: CalendarIcon,
  },
  {
    title: "Galleries",
    url: "/galleries",
    authorize: [ROLES.SUPERADMIN, ROLES.ADMIN, ROLES.USER],
    icon: ImageIcon,
  },
  {
    title: "Attendances",
    url: "/attendances",
    authorize: [ROLES.SUPERADMIN, ROLES.ADMIN, ROLES.USER],
    icon: LandPlotIcon,
  },
  {
    title: "Reports",
    url: "/reports",
    authorize: [ROLES.SUPERADMIN, ROLES.ADMIN, ROLES.USER],
    icon: FileChartColumnIcon,
  },
  {
    title: "SK Members",
    url: "/users",
    authorize: [ROLES.SUPERADMIN, ROLES.ADMIN, ROLES.USER],
    icon: UsersIcon,
  },
  {
    title: "Positions",
    url: "/positions",
    authorize: [ROLES.SUPERADMIN, ROLES.ADMIN],
    icon: AlignEndHorizontalIcon,
  },
  {
    title: "Request Types",
    url: "/request-types",
    authorize: [ROLES.SUPERADMIN, ROLES.ADMIN],
    icon: AlbumIcon,
  },
  {
    title: "Hotlines",
    url: "/hotlines",
    authorize: [ROLES.SUPERADMIN, ROLES.ADMIN],
    icon: HeadsetIcon,
  },
  {
    title: "Contacts",
    url: "/contacts",
    authorize: [ROLES.SUPERADMIN, ROLES.ADMIN],
    icon: CardSimIcon,
  },
  {
    title: "Archives",
    url: "/archives",
    authorize: [ROLES.SUPERADMIN, ROLES.ADMIN],
    icon: ArchiveIcon,
  },
];
