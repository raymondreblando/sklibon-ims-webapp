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

export type Report = {
  id: string;
  subject: string;
  description: string;
  createdAt: Date;
};

export type ReportWithRelation = Report & {
  barangay: Barangay;
  uploader: Pick<User, "id" | "profile"> & {
    info: Pick<UserInfo, "firstname" | "lastname"> & {
      position: Pick<Position, "name">;
    };
  };
  attachments: Array<Attachment>;
};

export type Contact = {
  id: string;
  contactNumber: string;
};

export type Attachment = {
  id: string;
  attachment: string;
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
