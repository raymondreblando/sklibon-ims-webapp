import { useCallback, useState } from "react";

export const usePasswordInput = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = useCallback(() => setShowPassword((prev) => !prev), []);

  return { showPassword, handleToggle };
};
