# Change Profile Picture Dialog: Review and Improvements

This document provides a review of the `ChangeProfileDialog` feature. The form correctly uses `useFormContext` to update the state upon a successful upload. The following suggestions focus on improving reusability and user experience.

## 1. Improve `ProfileUploader` Reusability

The `ProfileUploader` component currently has the form field name (`profile`) hardcoded within it. This prevents it from being reused in other forms where the field might have a different name (e.g., `avatar`).

### Suggestion: Pass the Field Name as a Prop

Modify `ProfileUploader` to accept the `name` of the form field as a prop.

**`src/components/upload/profile-uploader.tsx` (Refactored):**
```tsx
// ... other imports
import { useFormContext } from "react-hook-form";

interface ProfileUploaderProps {
  name: string; // Add this prop
}

export const ProfileUploader = ({ name }: ProfileUploaderProps) => {
  const user = getAuthUser();
  const { setValue } = useFormContext();
  const { upload, isPending, isError, refetch, handleUpload } = useSingleUpload({
    folder: "/sklibon-ims/profiles/",
    field: name, // Use the prop here
    setValue,
    defaultFilename: getFilename(user?.profile),
  });
  // ... rest of the component
};
```

Now, you must pass the `name` prop from the form where it's used.

**`src/components/forms/account/change-profile/index.tsx` (Usage):**
```tsx
// ...
export const ChangeProfilePicForm = ({ onSuccess }: ChangeProfilePicFormProps) => {
  // ...
  return (
    // ...
    <ProfileUploader name="profile" />
    // ...
  );
};
```

## 2. Enhance User Experience on Success

After a user uploads a new picture, the dialog remains open. A better experience is to automatically close the dialog and provide clear feedback.

### Suggestion: Auto-Close Dialog on Success

This can be achieved by passing an `onSuccess` callback from the dialog to the form hook.

**`src/components/forms/account/change-profile/use-change-profilepic-form.ts` (Refactored):**
```ts
// ... imports

interface UseChangeProfilePicFormProps {
  onSuccess?: () => void;
}

export const useChangeProfilePicForm = ({ onSuccess }: UseChangeProfilePicFormProps = {}) => {
  const mutation = useChangeProfilePicMutation();

  const form = useForm<ChangeProfilePicField>({
    resolver: zodResolver(ChangeProfilePicSchema),
    defaultValues: {
      profile: "",
    },
  });

  const onSubmit = useCallback(
    async (values: ChangeProfilePicField) => {
      try {
        await mutation.mutateAsync(values);
        form.reset();
        onSuccess?.(); // Call the success callback
      } catch (error) {
        handleRequestError({ error, setError: form.setError });
      }
    },
    [mutation, form, onSuccess],
  );

  return { form, onSubmit };
};
```

**`src/components/modals/account/change-profile-dialog.tsx` (Refactored):**
```tsx
import { useState } from 'react';
// ... other imports

export const ChangeProfileDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MainDialog
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      triggerComp={/* ... */}
      title="Change Profile Picture" // More specific title
      description="Upload a new photo to personalize your profile."
    >
      <ChangeProfilePicForm onSuccess={() => setIsOpen(false)} />
    </MainDialog>
  );
};
```

**`src/components/forms/account/change-profile/index.tsx` (Accept `onSuccess`):**
```tsx
// ...
interface ChangeProfilePicFormProps {
  onSuccess?: () => void;
}

export const ChangeProfilePicForm = ({ onSuccess }: ChangeProfilePicFormProps) => {
  const { form, onSubmit } = useChangeProfilePicForm({ onSuccess });

  return (
    <FormWrapper
      form={form}
      onSubmit={onSubmit}
      buttonText={{
        idle: "Save Changes",
        submitting: "Saving...",
      }}
    >
      <ProfileUploader name="profile" />
    </FormWrapper>
  );
};
```

These changes will make your components more reusable and provide a smoother experience for the user.