import { useLoginForm } from "./hooks/use-login-form";
import { inputs } from "./fields";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import type { LoginField } from "./schema";

export const LoginForm = () => {
  const { form, onSubmit } = useLoginForm();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-3"
      >
        {inputs.map((input, index) => (
          <FormField
            key={index}
            control={form.control}
            name={input.name as keyof LoginField}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">{input.label}</FormLabel>
                <FormControl>
                  <Input className="bg-white" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit" className="w-max text-base">
          Login
        </Button>
      </form>
    </Form>
  );
};
