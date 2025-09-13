import type { UserWithRelation } from "@/types/schema";
import React, { createContext, useContext, useMemo } from "react";

interface ProfileCardItem {
  heading: string;
  items: Array<{ label: string; value: string | number; className?: string }>;
}

interface ProfileCardContextProps {
  user: UserWithRelation;
  items: ProfileCardItem[];
}

const ProfileCardContext = createContext<ProfileCardContextProps | null>(null);

export const useProfileCard = () => {
  const context = useContext(ProfileCardContext);

  if (!context) {
    throw new Error(
      "useProfileCardContext must be used within a ProfileCardProvider",
    );
  }

  return context;
};

export const ProfileCardProvider = ({
  user,
  children,
}: {
  user: UserWithRelation;
  children: React.ReactNode;
}) => {
  const personalInfo: ProfileCardItem[] = useMemo(() => {
    const personalInfoMap = [
      { label: "Firstname", value: user.info.firstname },
      { label: "Middlename", value: user.info.middlename },
      { label: "Lastname", value: user.info.lastname },
      { label: "Gender", value: user.info.gender },
      { label: "Birthdate", value: user.info.birthdate },
      { label: "Age", value: user.info.age },
      { label: "Contact number", value: user.info.phoneNumber },
      { label: "Current position", value: user.info.position?.name },
    ];

    const addressInfoMap = [
      { label: "Province", value: user.info.province?.name },
      { label: "Municipality", value: user.info.municipality?.name },
      { label: "Barangay", value: user.info.barangay?.name },
      {
        label: "Additional",
        value: user.info.additionalAddress,
        className: "md:col-span-3",
      },
    ];

    const buildItems = (
      items: Array<{
        label: string;
        value?: string | number;
        className?: string;
      }>,
    ) =>
      items.map((item) => ({
        ...item,
        value: item.value ?? "Not Set",
      }));

    return [
      {
        heading: "Personal Information",
        items: buildItems(personalInfoMap),
      },
      {
        heading: "Address Information",
        items: buildItems(addressInfoMap),
      },
    ];
  }, [user]);

  const value = useMemo(
    () => ({
      user,
      items: personalInfo,
    }),
    [user, personalInfo],
  );

  return (
    <ProfileCardContext.Provider value={value}>
      {children}
    </ProfileCardContext.Provider>
  );
};
