import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import type { FieldValues, Path, UseFormSetError } from "react-hook-form";

export type HandleRequestErrorProps<T extends FieldValues> = {
  error: unknown;
  setError?: UseFormSetError<T>;
};

export const handleRequestError = <T extends FieldValues>({
  error,
  setError,
}: HandleRequestErrorProps<T>) => {
  if (!isAxiosError(error)) return;

  const data = error.response?.data;

  if (data.errors) {
    const errors = data.errors;
    for (const key in errors) {
      const message = errors[key][0];

      if (setError)
        setError(key as Path<T>, { type: "custom", message: message });
      else toast.error(message);
    }
  }

  if (data.status === "error") toast.error(data.message);
};