import { useSendMessageForm } from "./use-send-message-form";

import { SendHorizonalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormWrapper } from "@/components/forms";
import { Textarea } from "@/components/ui/textarea";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";

export const SendMessageForm = () => {
  const { form, onSubmit } = useSendMessageForm();

  return (
    <FormWrapper
      form={form}
      onSubmit={onSubmit}
      hasButton={false}
      formProps={{
        className: "w-full flex flex-row items-center gap-x-4 px-6 py-4",
      }}
    >
      <FormField
        control={form.control}
        name="message"
        render={({ field }) => (
          <FormItem className={"flex flex-1 flex-col justify-start"}>
            <FormControl>
              <Textarea className="min-h-16 resize-none" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <Button
        variant="outline"
        size="xl"
        className="bg-input hover:bg-input/50 hover:text-foreground h-16 min-w-16 transition-colors"
      >
        {form.formState.isSubmitting ? <Spinner /> : <SendHorizonalIcon />}
        
      </Button>
    </FormWrapper>
  );
};
