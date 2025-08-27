import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";

import { login } from "@/services/api/auth";
import { loginSchema, type LoginField } from "@/lib/schemas/login";
import { handleRequestError } from "@/lib/error-handler";

export const useLoginForm = () => {
  const navigate = useNavigate();

  const form = useForm<LoginField>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = useCallback(
    async (values: LoginField) => {
      try {
        const { data } = await login(values);

        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("accessToken", data.accessToken);

        navigate({ to: "/main", replace: true });
      } catch (error) {
        handleRequestError({ error, setError: form.setError });
      }
    },
    [form.setError, navigate],
  );

  return { form, onSubmit };
};
