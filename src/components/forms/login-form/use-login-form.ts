import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/lib/constants/api-constants";

import { login } from "@/services/api/auth";
import { LoginSchema, type LoginField } from "@/lib/schemas/login";
import { handleRequestError } from "@/lib/utils/error-handler";

import { Route } from "@/routes/(auth)";

export const useLoginForm = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const search = Route.useSearch();

  const form = useForm<LoginField>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = useCallback(
    async (values: LoginField) => {
      try {
        const { data } = await login(values);

        queryClient.setQueryData(
          [QUERY_KEYS.PROFILE_PIC],
          data.user.profile ?? "",
        );
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("accessToken", data.accessToken);

        navigate({
          to: (search.redirect as string | undefined) ?? "/dashboard",
          replace: true,
        });
      } catch (error) {
        handleRequestError({ error, setError: form.setError });
      }
    },
    [form.setError, search, navigate, queryClient],
  );

  return { form, onSubmit };
};
