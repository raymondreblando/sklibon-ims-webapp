import { clsx, type ClassValue } from "clsx";
import type React from "react";
import { twMerge } from "tailwind-merge";
import type { NotificationContent, NotificationType } from "@/types/schema";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const textElipsis = (text: string, maxLength = 20) => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

export const formatTableCount = (count: number) =>
  count.toString().padStart(2, "0");

export const formatFilename = (filename: string, maxLength = 20) => {
  const fileData = filename.split(".");
  const name = fileData[0];
  const extension = fileData[1];

  return name.length > maxLength
    ? `${name.substring(0, maxLength)}....${extension}`
    : filename;
};

export const generateNotificationMessage = (
  type: NotificationType,
  data: NotificationContent,
) => {
  if (type === "request") {
    return data.status
      ? `Your request ${data.name} was ${data.status?.toLowerCase()} successfully`
      : `${data.user} just sent you a new request — check it out!`;
  } else {
    return data.status
      ? `The event ${data.name} has been ${data.status}.`
      : `Announcement: A new event ${data.name}. Review the details.`;
  }
};

export const preventNumericInput = (
  event: React.KeyboardEvent<HTMLInputElement>,
) => {
  const allowedKeys = [
    "Backspace",
    "Delete",
    "ArrowLeft",
    "ArrowRight",
    "Tab",
    ".",
    "-",
  ];

  if (!/\d/.test(event.key) && !allowedKeys.includes(event.key)) {
    event.preventDefault();
  }
};

export const getEventBadgeVariant = (status: string) => {
  switch (status) {
    case "upcoming":
      return "default";
      break;
    case "ongoing":
      return "secondary";
      break;
    case "completed":
      return "success";
      break;
    case "cancelled":
      return "destructive";
      break;
    default:
      throw new Error("Invalid event status");
      break;
  }
};

export const getEventCalendarColor = (status: string) => {
  switch (status) {
    case "upcoming":
      return "sky";
      break;
    case "ongoing":
      return "amber";
      break;
    case "completed":
      return "emerald";
      break;
    case "cancelled":
      return "rose";
      break;
    default:
      throw new Error("Invalid event status");
      break;
  }
};

export const getUserBadgeVariant = (status: string) => {
  switch (status) {
    case "active":
      return "success";
      break;
    case "verified":
      return "default";
      break;
    default:
      return "destructive";
      break;
  }
};
