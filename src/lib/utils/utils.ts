import { clsx, type ClassValue } from "clsx";
import type React from "react";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

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

export const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export const getFilename = (url: string | undefined | null) => {
  if (!url) return undefined;

  const urlObj = new URL(url);
  const parts = urlObj.pathname.split("/");
  return parts.pop();
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
