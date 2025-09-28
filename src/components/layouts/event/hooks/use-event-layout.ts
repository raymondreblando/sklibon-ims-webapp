import { useCallback, useState } from "react";
import type { EventPageLayout } from "@/types";

export const useEventLayout = () => {
  const [layout, setLayout] = useState<EventPageLayout>(
    (localStorage.getItem("eventLayout") as EventPageLayout) ?? "grid",
  );

  const setEventLayout = useCallback((layout: string) => {
    setLayout(layout as EventPageLayout);
    localStorage.setItem("eventLayout", layout);
  }, []);

  return { layout, setEventLayout };
};
