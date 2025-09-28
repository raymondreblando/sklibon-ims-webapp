import type { ColumnDef } from "@tanstack/react-table";

import { format } from "date-fns";
import { getAuthUser } from "@/lib/utils/auth";
import { formatTableCount } from "@/lib/utils/utils";

import type {
  Archive,
  EventWithRelation,
  ReportWithRelation,
} from "@/types/schema";

import {
  CalendarDaysIcon,
  FileTextIcon,
  TrashIcon,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableUserProfile } from "@/components/layouts/table";

export const data: Array<Archive> = [
  {
    id: "1",
    archivableType: "report",
    archivable: {
      id: "01k5jjmddh69jrzvxw0cy41fzf",
      subject: "Barangay Sports Festival 2025",
      description:
        "A week-long sports competition designed to promote camaraderie, discipline, and a healthy lifestyle. The festival will feature basketball, volleyball, and other games that encourage teamwork and active participation among the youth.",
      createdAt: new Date("2025-09-20T03:28:09.000000Z"),
      barangay: {
        id: "01k359bpbbxah7qj61gnbw2ynr",
        name: "Bonbon",
      },
      uploader: {
        id: "01k359btfh9xtm75qsxbvak8gd",
        profile:
          "https://ik.imagekit.io/mhkbf5beo/sklibon-ims/profiles/e88e499b-d3c5-4d07-882c-f45a2327ef7d-sana-square.png",
        info: {
          firstname: "Sheila Mae",
          lastname: "Vasquez",
          position: {
            name: "SK Chairman",
          },
        },
      },
      attachments: [
        {
          id: "01k5jjmddz8z92w5am6dhqqx3d",
          attachment:
            "https://ik.imagekit.io/mhkbf5beo/sklibon-ims/reports/acbc6012-a663-4cb9-bfee-c9af55e24c53-Barangay_Sports_Festival.docx",
          filename: "Barangay Sports Festival.docx",
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          size: 8189,
        },
      ],
    } as ReportWithRelation,
    archivedBy: {
      id: "01k359btfh9xtm75qsxbvak8gd",
      profile:
        "https://ik.imagekit.io/mhkbf5beo/sklibon-ims/profiles/e88e499b-d3c5-4d07-882c-f45a2327ef7d-sana-square.png",
      info: {
        firstname: "Sheila Mae",
        lastname: "Vasquez",
        position: {
          name: "SK Chairman",
        },
      },
    },
    createdAt: new Date("2025-09-28T03:30:00.000000Z"),
  },
  {
    id: "2",
    archivableType: "report",
    archivable: {
      id: "01k5jjmddh69jrzvxw0cy41fzf",
      subject: "Barangay Sports Festival 2025",
      description:
        "A week-long sports competition designed to promote camaraderie, discipline, and a healthy lifestyle. The festival will feature basketball, volleyball, and other games that encourage teamwork and active participation among the youth.",
      createdAt: new Date("2025-09-20T03:28:09.000000Z"),
      barangay: {
        id: "01k359bpbbxah7qj61gnbw2ynr",
        name: "Bonbon",
      },
      uploader: {
        id: "01k359btfh9xtm75qsxbvak8gd",
        profile:
          "https://ik.imagekit.io/mhkbf5beo/sklibon-ims/profiles/e88e499b-d3c5-4d07-882c-f45a2327ef7d-sana-square.png",
        info: {
          firstname: "Sheila Mae",
          lastname: "Vasquez",
          position: {
            name: "SK Chairman",
          },
        },
      },
      attachments: [
        {
          id: "01k5jjmddz8z92w5am6dhqqx3d",
          attachment:
            "https://ik.imagekit.io/mhkbf5beo/sklibon-ims/reports/acbc6012-a663-4cb9-bfee-c9af55e24c53-Barangay_Sports_Festival.docx",
          filename: "Barangay Sports Festival.docx",
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          size: 8189,
        },
      ],
    } as ReportWithRelation,
    archivedBy: {
      id: "01k359btfh9xtm75qsxbvak8gd",
      profile:
        "https://ik.imagekit.io/mhkbf5beo/sklibon-ims/profiles/e88e499b-d3c5-4d07-882c-f45a2327ef7d-sana-square.png",
      info: {
        firstname: "Sheila Mae",
        lastname: "Vasquez",
        position: {
          name: "SK Chairman",
        },
      },
    },
    createdAt: new Date("2025-09-28T03:30:00.000000Z"),
  },
  {
    id: "3",
    archivableType: "event",
    archivable: {
      id: "01k66rb544mzwbb209k4vpfz5y",
      name: "Health and Wellness Fair",
      description:
        "A gallery of community-centered activities, including free medical check-ups, fitness sessions, and mental health talks. The fair aimed to educate young people on the value of physical and mental wellness in their daily lives.",
      eventDate: new Date("2025-09-28T03:30:00.000000Z"),
      expiredDate: new Date("2025-09-28T05:30:00.000000Z"),
      openAttendance: false,
      imageUrl:
        "https://ik.imagekit.io/mhkbf5beo/sklibon-ims/events/b18b890c-1835-45be-8fa1-d83a02027789-pexels-cottonbro-5721671.jpg",
      venue: "Barangay Nogpo Health Center",
      status: "upcoming",
      latitude: "13.289986359161",
      longitude: "123.37045669556",
      barangay: {
        id: "01k359bpc09839xaawve6kqehs",
        name: "Nogpo",
      },
      creator: {
        id: "01k359btfh9xtm75qsxbvak8gd",
        profile:
          "https://ik.imagekit.io/mhkbf5beo/sklibon-ims/profiles/e88e499b-d3c5-4d07-882c-f45a2327ef7d-sana-square.png",
        info: {
          firstname: "Sheila Mae",
          lastname: "Vasquez",
          position: {
            name: "SK Chairman",
          },
        },
      },
    } as EventWithRelation,
    archivedBy: {
      id: "01k47v5c2yw05403w25e0wnv6n",
      profile:
        "https://ik.imagekit.io/mhkbf5beo/sklibon-ims/profiles/a37921be-1616-4722-8706-11699f89684c-momo-square.png",
      info: {
        firstname: "Momo",
        lastname: "Hirai",
        position: {
          name: "Secretary",
        },
      },
    },
    createdAt: new Date("2025-09-28T03:30:00.000000Z"),
  },
  {
    id: "1",
    archivableType: "report",
    archivable: {
      id: "01k5jjmddh69jrzvxw0cy41fzf",
      subject: "Barangay Sports Festival 2025",
      description:
        "A week-long sports competition designed to promote camaraderie, discipline, and a healthy lifestyle. The festival will feature basketball, volleyball, and other games that encourage teamwork and active participation among the youth.",
      createdAt: new Date("2025-09-20T03:28:09.000000Z"),
      barangay: {
        id: "01k359bpbbxah7qj61gnbw2ynr",
        name: "Bonbon",
      },
      uploader: {
        id: "01k359btfh9xtm75qsxbvak8gd",
        profile:
          "https://ik.imagekit.io/mhkbf5beo/sklibon-ims/profiles/e88e499b-d3c5-4d07-882c-f45a2327ef7d-sana-square.png",
        info: {
          firstname: "Sheila Mae",
          lastname: "Vasquez",
          position: {
            name: "SK Chairman",
          },
        },
      },
      attachments: [
        {
          id: "01k5jjmddz8z92w5am6dhqqx3d",
          attachment:
            "https://ik.imagekit.io/mhkbf5beo/sklibon-ims/reports/acbc6012-a663-4cb9-bfee-c9af55e24c53-Barangay_Sports_Festival.docx",
          filename: "Barangay Sports Festival.docx",
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          size: 8189,
        },
      ],
    } as ReportWithRelation,
    archivedBy: {
      id: "01k359btfh9xtm75qsxbvak8gd",
      profile:
        "https://ik.imagekit.io/mhkbf5beo/sklibon-ims/profiles/e88e499b-d3c5-4d07-882c-f45a2327ef7d-sana-square.png",
      info: {
        firstname: "Sheila Mae",
        lastname: "Vasquez",
        position: {
          name: "SK Chairman",
        },
      },
    },
    createdAt: new Date("2025-09-28T03:30:00.000000Z"),
  },
  {
    id: "2",
    archivableType: "report",
    archivable: {
      id: "01k5jjmddh69jrzvxw0cy41fzf",
      subject: "Barangay Sports Festival 2025",
      description:
        "A week-long sports competition designed to promote camaraderie, discipline, and a healthy lifestyle. The festival will feature basketball, volleyball, and other games that encourage teamwork and active participation among the youth.",
      createdAt: new Date("2025-09-20T03:28:09.000000Z"),
      barangay: {
        id: "01k359bpbbxah7qj61gnbw2ynr",
        name: "Bonbon",
      },
      uploader: {
        id: "01k359btfh9xtm75qsxbvak8gd",
        profile:
          "https://ik.imagekit.io/mhkbf5beo/sklibon-ims/profiles/e88e499b-d3c5-4d07-882c-f45a2327ef7d-sana-square.png",
        info: {
          firstname: "Sheila Mae",
          lastname: "Vasquez",
          position: {
            name: "SK Chairman",
          },
        },
      },
      attachments: [
        {
          id: "01k5jjmddz8z92w5am6dhqqx3d",
          attachment:
            "https://ik.imagekit.io/mhkbf5beo/sklibon-ims/reports/acbc6012-a663-4cb9-bfee-c9af55e24c53-Barangay_Sports_Festival.docx",
          filename: "Barangay Sports Festival.docx",
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          size: 8189,
        },
      ],
    } as ReportWithRelation,
    archivedBy: {
      id: "01k359btfh9xtm75qsxbvak8gd",
      profile:
        "https://ik.imagekit.io/mhkbf5beo/sklibon-ims/profiles/e88e499b-d3c5-4d07-882c-f45a2327ef7d-sana-square.png",
      info: {
        firstname: "Sheila Mae",
        lastname: "Vasquez",
        position: {
          name: "SK Chairman",
        },
      },
    },
    createdAt: new Date("2025-09-28T03:30:00.000000Z"),
  },
  {
    id: "3",
    archivableType: "event",
    archivable: {
      id: "01k66rb544mzwbb209k4vpfz5y",
      name: "Health and Wellness Fair",
      description:
        "A gallery of community-centered activities, including free medical check-ups, fitness sessions, and mental health talks. The fair aimed to educate young people on the value of physical and mental wellness in their daily lives.",
      eventDate: new Date("2025-09-28T03:30:00.000000Z"),
      expiredDate: new Date("2025-09-28T05:30:00.000000Z"),
      openAttendance: false,
      imageUrl:
        "https://ik.imagekit.io/mhkbf5beo/sklibon-ims/events/b18b890c-1835-45be-8fa1-d83a02027789-pexels-cottonbro-5721671.jpg",
      venue: "Barangay Nogpo Health Center",
      status: "upcoming",
      latitude: "13.289986359161",
      longitude: "123.37045669556",
      barangay: {
        id: "01k359bpc09839xaawve6kqehs",
        name: "Nogpo",
      },
      creator: {
        id: "01k359btfh9xtm75qsxbvak8gd",
        profile:
          "https://ik.imagekit.io/mhkbf5beo/sklibon-ims/profiles/e88e499b-d3c5-4d07-882c-f45a2327ef7d-sana-square.png",
        info: {
          firstname: "Sheila Mae",
          lastname: "Vasquez",
          position: {
            name: "SK Chairman",
          },
        },
      },
    } as EventWithRelation,
    archivedBy: {
      id: "01k47v5c2yw05403w25e0wnv6n",
      profile:
        "https://ik.imagekit.io/mhkbf5beo/sklibon-ims/profiles/a37921be-1616-4722-8706-11699f89684c-momo-square.png",
      info: {
        firstname: "Momo",
        lastname: "Hirai",
        position: {
          name: "Secretary",
        },
      },
    },
    createdAt: new Date("2025-09-28T03:30:00.000000Z"),
  },
  {
    id: "1",
    archivableType: "report",
    archivable: {
      id: "01k5jjmddh69jrzvxw0cy41fzf",
      subject: "Barangay Sports Festival 2025",
      description:
        "A week-long sports competition designed to promote camaraderie, discipline, and a healthy lifestyle. The festival will feature basketball, volleyball, and other games that encourage teamwork and active participation among the youth.",
      createdAt: new Date("2025-09-20T03:28:09.000000Z"),
      barangay: {
        id: "01k359bpbbxah7qj61gnbw2ynr",
        name: "Bonbon",
      },
      uploader: {
        id: "01k359btfh9xtm75qsxbvak8gd",
        profile:
          "https://ik.imagekit.io/mhkbf5beo/sklibon-ims/profiles/e88e499b-d3c5-4d07-882c-f45a2327ef7d-sana-square.png",
        info: {
          firstname: "Sheila Mae",
          lastname: "Vasquez",
          position: {
            name: "SK Chairman",
          },
        },
      },
      attachments: [
        {
          id: "01k5jjmddz8z92w5am6dhqqx3d",
          attachment:
            "https://ik.imagekit.io/mhkbf5beo/sklibon-ims/reports/acbc6012-a663-4cb9-bfee-c9af55e24c53-Barangay_Sports_Festival.docx",
          filename: "Barangay Sports Festival.docx",
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          size: 8189,
        },
      ],
    } as ReportWithRelation,
    archivedBy: {
      id: "01k359btfh9xtm75qsxbvak8gd",
      profile:
        "https://ik.imagekit.io/mhkbf5beo/sklibon-ims/profiles/e88e499b-d3c5-4d07-882c-f45a2327ef7d-sana-square.png",
      info: {
        firstname: "Sheila Mae",
        lastname: "Vasquez",
        position: {
          name: "SK Chairman",
        },
      },
    },
    createdAt: new Date("2025-09-28T03:30:00.000000Z"),
  },
  {
    id: "2",
    archivableType: "report",
    archivable: {
      id: "01k5jjmddh69jrzvxw0cy41fzf",
      subject: "Barangay Sports Festival 2025",
      description:
        "A week-long sports competition designed to promote camaraderie, discipline, and a healthy lifestyle. The festival will feature basketball, volleyball, and other games that encourage teamwork and active participation among the youth.",
      createdAt: new Date("2025-09-20T03:28:09.000000Z"),
      barangay: {
        id: "01k359bpbbxah7qj61gnbw2ynr",
        name: "Bonbon",
      },
      uploader: {
        id: "01k359btfh9xtm75qsxbvak8gd",
        profile:
          "https://ik.imagekit.io/mhkbf5beo/sklibon-ims/profiles/e88e499b-d3c5-4d07-882c-f45a2327ef7d-sana-square.png",
        info: {
          firstname: "Sheila Mae",
          lastname: "Vasquez",
          position: {
            name: "SK Chairman",
          },
        },
      },
      attachments: [
        {
          id: "01k5jjmddz8z92w5am6dhqqx3d",
          attachment:
            "https://ik.imagekit.io/mhkbf5beo/sklibon-ims/reports/acbc6012-a663-4cb9-bfee-c9af55e24c53-Barangay_Sports_Festival.docx",
          filename: "Barangay Sports Festival.docx",
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          size: 8189,
        },
      ],
    } as ReportWithRelation,
    archivedBy: {
      id: "01k359btfh9xtm75qsxbvak8gd",
      profile:
        "https://ik.imagekit.io/mhkbf5beo/sklibon-ims/profiles/e88e499b-d3c5-4d07-882c-f45a2327ef7d-sana-square.png",
      info: {
        firstname: "Sheila Mae",
        lastname: "Vasquez",
        position: {
          name: "SK Chairman",
        },
      },
    },
    createdAt: new Date("2025-09-28T03:30:00.000000Z"),
  },
  {
    id: "3",
    archivableType: "event",
    archivable: {
      id: "01k66rb544mzwbb209k4vpfz5y",
      name: "Health and Wellness Fair",
      description:
        "A gallery of community-centered activities, including free medical check-ups, fitness sessions, and mental health talks. The fair aimed to educate young people on the value of physical and mental wellness in their daily lives.",
      eventDate: new Date("2025-09-28T03:30:00.000000Z"),
      expiredDate: new Date("2025-09-28T05:30:00.000000Z"),
      openAttendance: false,
      imageUrl:
        "https://ik.imagekit.io/mhkbf5beo/sklibon-ims/events/b18b890c-1835-45be-8fa1-d83a02027789-pexels-cottonbro-5721671.jpg",
      venue: "Barangay Nogpo Health Center",
      status: "upcoming",
      latitude: "13.289986359161",
      longitude: "123.37045669556",
      barangay: {
        id: "01k359bpc09839xaawve6kqehs",
        name: "Nogpo",
      },
      creator: {
        id: "01k359btfh9xtm75qsxbvak8gd",
        profile:
          "https://ik.imagekit.io/mhkbf5beo/sklibon-ims/profiles/e88e499b-d3c5-4d07-882c-f45a2327ef7d-sana-square.png",
        info: {
          firstname: "Sheila Mae",
          lastname: "Vasquez",
          position: {
            name: "SK Chairman",
          },
        },
      },
    } as EventWithRelation,
    archivedBy: {
      id: "01k47v5c2yw05403w25e0wnv6n",
      profile:
        "https://ik.imagekit.io/mhkbf5beo/sklibon-ims/profiles/a37921be-1616-4722-8706-11699f89684c-momo-square.png",
      info: {
        firstname: "Momo",
        lastname: "Hirai",
        position: {
          name: "Secretary",
        },
      },
    },
    createdAt: new Date("2025-09-28T03:30:00.000000Z"),
  },
];

export const getColumns = ({
  onUpdate,
}: {
  onUpdate: (id: string) => void;
}): Array<ColumnDef<Archive>> => {
  const userId = getAuthUser()?.id;

  return [
    {
      id: "count",
      header: "#",
      cell: (props) => {
        const count = props.row.index + 1;
        return <span>{formatTableCount(count)}</span>;
      },
    },
    {
      id: "archiver",
      accessorFn: (props) =>
        `${props.archivedBy.info.firstname} ${props.archivedBy.info.lastname}`,
      header: "Archived By",
      cell: (props) => {
        const row = props.row.original;
        const fullname =
          row.archivedBy.id === userId
            ? "You"
            : `${row.archivedBy.info.firstname} ${row.archivedBy.info.lastname}`;

        return (
          <TableUserProfile
            user={{
              name: fullname,
              subtitle: row.archivedBy.info.position.name,
              profile: row.archivedBy.profile,
            }}
          />
        );
      },
    },
    {
      id: "archive",
      accessorFn: (props) => {
        const archivableItem = props.archivable;
        const archivableType = props.archivableType;

        if (archivableType === "report") {
          const archivable = archivableItem as ReportWithRelation;

          return archivable.subject;
        }

        if (archivableType === "event") {
          const archivable = archivableItem as EventWithRelation;

          return archivable.name;
        }
      },
      header: "Archive",
      cell: (props) => {
        const row = props.row.original;
        const archivableItem = row.archivable;
        const archivableType = row.archivableType;

        const Component = ({
          title,
          creator,
          Icon,
        }: {
          title: string;
          creator: string;
          Icon: LucideIcon;
        }) => {
          return (
            <div className="flex items-center gap-2">
              <Icon />
              <div>
                <p className="text-foreground text-sm font-semibold">{title}</p>
                <p className="text-muted text-xs font-semibold">{creator}</p>
              </div>
            </div>
          );
        };

        if (archivableType === "report") {
          const archivable = archivableItem as ReportWithRelation;

          return (
            <Component
              title={archivable.subject}
              creator={`${archivable.uploader.info.firstname} - ${archivable.uploader.info.position.name}`}
              Icon={FileTextIcon}
            />
          );
        }

        if (archivableType === "event") {
          const archivable = archivableItem as EventWithRelation;

          return (
            <Component
              title={archivable.name}
              creator={`${archivable.creator.info.firstname} - ${archivable.creator.info.position.name}`}
              Icon={CalendarDaysIcon}
            />
          );
        }
      },
    },
    {
      accessorKey: "archivabletype",
      header: "Type",
      cell: (props) =>
        props.row.original.archivableType === "report" ? "Report" : "Event",
    },
    {
      accessorKey: "createdAt",
      header: "Archived Date",
      cell: (props) => format(props.row.original.createdAt, "MMM dd, yyyy"),
    },
    {
      id: "actions",
      header: "Actions",
      cell: (props) => {
        const row = props.row.original;

        return (
          <Button variant="outline" onClick={() => onUpdate(row.id)}>
            <TrashIcon />
            Unarchive
          </Button>
        );
      },
    },
  ];
};
