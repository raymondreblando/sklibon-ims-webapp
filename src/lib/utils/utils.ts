import { clsx, type ClassValue } from "clsx";
import type React from "react";
import { twMerge } from "tailwind-merge";

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
      return "default";
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
