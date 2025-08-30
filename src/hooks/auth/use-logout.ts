import { useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";

import { logOut } from "@/services/api/auth";
import { handleRequestError } from "@/lib/utils/error-handler";

export const useLogout = () => {
  const navigate = useNavigate();

  const handleSignOut = useCallback(async () => {
    try {
      const response = await logOut();

      if (response.message === "Logout successful.") {
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        navigate({ to: "/", search: { redirect: undefined } });
      }
    } catch (error) {
      handleRequestError({ error });
    }
  }, [navigate]);

  return { handleSignOut };
};
