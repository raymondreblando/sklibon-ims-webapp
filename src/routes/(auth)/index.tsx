import { createFileRoute, Link, redirect } from "@tanstack/react-router";

import { LoginForm } from "@/components/forms/login-form";
import { AuthBranding } from "@/components/layouts/auth/auth-branding";
import { Separator } from "@/components/ui/separator";
import { isAuthenticated } from "@/lib/utils/auth";

export const Route = createFileRoute("/(auth)/")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      redirect: search.redirect ?? undefined,
    };
  },
  component: Index,
  beforeLoad: async () => {
    if (isAuthenticated()) {
      throw redirect({
        to: "/dashboard",
      });
    }
  },
});

function Index() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="max-w-[600px] px-4 py-8">
        <AuthBranding />
        <Separator className="my-8" />
        <div className="flex flex-1 flex-col gap-y-8">
          <div className="text-center">
            <h1 className="mb-2 text-2xl font-extrabold">Sign In</h1>
            <p className="text-muted text-sm md:text-base">
              Please sign in to continue to your account
            </p>
          </div>
          <LoginForm />
          <p className="text-muted text-center text-sm font-medium md:text-base">
            New user?{" "}
            <Link
              to="/register"
              className="text-primary font-semibold underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
