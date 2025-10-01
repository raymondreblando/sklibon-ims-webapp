import { createFileRoute, redirect } from "@tanstack/react-router";
import { isAuthenticated } from "@/lib/utils/auth";

import { LoginForm } from "@/components/forms/login-form";
import { HeadingWithWrapper } from "@/components/headings";
import { AuthWrapper, RedirectLink } from "@/components/layouts/auth";

export const Route = createFileRoute("/(auth)/login")({
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
    <AuthWrapper className="w-[min(100%,550px)]">
      <HeadingWithWrapper
        heading="Sign In"
        subheading="Please sign in to continue to your account"
      />
      <LoginForm />
      <RedirectLink message="New user?" linkProps={{ to: "/register" }}>
        Create an account
      </RedirectLink>
    </AuthWrapper>
  );
}
