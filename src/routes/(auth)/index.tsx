import { createFileRoute, Link } from "@tanstack/react-router";

import { LoginForm } from "@/components/forms/login-form";
import { AuthBranding } from "@/components/layouts/auth/auth-branding";

export const Route = createFileRoute("/(auth)/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto my-auto flex h-max max-w-[1200px] flex-col-reverse lg:flex-row">
        <div className="flex flex-1 flex-col gap-y-8 p-8">
          <div>
            <h1 className="mb-2 text-2xl font-bold md:text-4xl">Sign In</h1>
            <p className="text-muted text-sm md:text-base">
              Please sign in to continue to your account
            </p>
          </div>
          <LoginForm />
          <p className="text-muted text-sm font-medium md:text-base">
            New user?{" "}
            <Link to="/" className="text-primary font-semibold underline">
              Create an account
            </Link>
          </p>
        </div>
        <div className="flex flex-1 flex-col justify-center gap-y-8 p-8">
          <AuthBranding />
        </div>
      </div>
    </div>
  );
}
