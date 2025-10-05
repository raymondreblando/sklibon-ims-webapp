import type { DashboardData } from "@/types/schema";
import { createContext, useContext, useMemo } from "react";

interface DashboardContextProps {
  readonly data: DashboardData;
}

const DashboardContext = createContext<DashboardContextProps | null>(null);

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error(
      "useDashboardContext must be used within DashboardProvider",
    );
  }
  return context;
};

interface DashboardProviderProps {
  data: DashboardData;
  children: React.ReactNode;
}

export const DashboardProvider = ({
  data,
  children,
}: DashboardProviderProps) => {
  const value = useMemo(() => ({ data }), [data]);

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};
