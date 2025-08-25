import { createRootRoute, Outlet } from "@tanstack/react-router";
import { ToastContainer } from "react-toastify";

export const Route = createRootRoute({
  component: () => (
    <main>
      <Outlet />
      <ToastContainer position="top-center" theme="colored" stacked={true} />
    </main>
  ),
});
