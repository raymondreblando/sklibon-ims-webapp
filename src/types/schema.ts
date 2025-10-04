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

export type RoleType = "Super Admin" | "Admin" | "User";

export type User = {
  id: string;
  username: string;
  fullname: string;
  email: string;
  profile: string;
  status: "active" | "verified" | "deactivated" | "blocked";
  isOnline: boolean;
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

export type MinifyUser = Pick<User, "id" | "profile"> & {
  info: Pick<UserInfo, "firstname" | "lastname"> & {
    position: Pick<Position, "name">;
  };
};

export type Request = {
  id: string;
  name: string;
  description: string;
  dateNeeded: Date;
  attachment: string;
  status: "pending" | "approved" | "disapproved" | "completed" | "cancelled";
  approvedDate: Date;
  disapprovedDate: Date;
  filedDate: Date;
  reason: string;
  receivableType: "user" | "barangay";
};

export type RequestWithRelation = Request & {
  type: Pick<RequestType, "id" | "name">;
  receiver:
    | MinifyUser
    | (Barangay & {
        provinceId: string;
        municipalityId: string;
        code: string;
      });
  requester: MinifyUser;
  approver: MinifyUser;
  disapprover: MinifyUser;
};

export type Event = {
  id: string;
  name: string;
  description: string;
  eventDate: Date;
  expiredDate: Date;
  openAttendance: boolean;
  imageUrl: string;
  venue: string;
  status: "upcoming" | "ongoing" | "completed" | "cancelled" | "archived";
  latitude: string;
  longitude: string;
};

export type EventWithRelation = Event & {
  barangay: Barangay;
  creator: MinifyUser;
  attendances: Array<Omit<Attendance, "event">>;
};

export type Attendance = {
  id: string;
  timeIn: Date;
  timeOut: Date;
  user: MinifyUser;
  event: Event;
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
  filename: string;
  type: string;
  size: number;
};

export type Gallery = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
};

export type GalleryImage = {
  id: string;
  imageUrl: string;
};

export type GalleryWithRelation = Gallery & {
  uploader: Pick<User, "id" | "profile"> & {
    info: Pick<UserInfo, "firstname" | "lastname"> & {
      position: Pick<Position, "name">;
    };
  };
  images: Array<GalleryImage>;
};

export type Archive = {
  id: string;
  archivableType: "report" | "event";
  archivable: ReportWithRelation | EventWithRelation;
  archivedBy: MinifyUser;
  createdAt: Date;
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
