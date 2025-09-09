export type AuthResponse = {
  user: Omit<User, "createdAt"> & {
    role: Role;
    info: UserInfo & {
      position: Omit<Position, "status" | "createdAt">;
      province: Province;
      municipality: Municipality;
      barangay: Barangay;
    };
  };
  accessToken: string;
};

export type UserWithRelation = Omit<User, "createdAt"> & {
  role: Role;
  info: UserInfo & {
    position: Omit<Position, "status" | "createdAt">;
    province: Province;
    municipality: Municipality;
    barangay: Barangay;
  };
};

export type Role = {
  id: string;
  role: string;
};

export type User = {
  id: string;
  username: string;
  fullname: string;
  email: string;
  profile: string;
  status: "active" | "deactivated" | "blocked";
  createdAt: Date;
};

export type UserInfo = {
  id: string;
  firstname: string;
  middlename: string;
  lastname: string;
  gender: "Male" | "Female";
  age: number;
  phoneNumber: string;
  birthdate: string;
  additionalAddress: string;
};

export type Position = {
  id: string;
  name: string;
  status: "active" | "inactive";
  createdAt: Date;
};

export type RequestType = Position;

export type Hotline = Pick<Position, "id" | "name" | "status"> & {
  abbreviation: string;
  hotline: string;
};

export type ContactWithRelation = Contact & {
  user: UserWithRelation;
};

export type Contact = {
  id: string;
  contactNumber: string;
};

export type Province = {
  id: string;
  name: string;
};

export type Municipality = {
  id: string;
  name: string;
};

export type Barangay = {
  id: string;
  name: string;
};
