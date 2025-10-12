import React from "react";
import { isAuthenticated } from "@/lib/utils/auth";

interface WithAuthGuardProps {
  children: React.ReactNode;
}

export const WithAuthGuard = ({ children }: WithAuthGuardProps) => {
  const isLoggedIn = isAuthenticated();

  if (!isLoggedIn) return null;

  return children;
};
