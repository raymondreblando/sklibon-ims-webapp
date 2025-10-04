import { ChatListHeader } from "./chat-list-header";
import { Searchbar } from "@/components/ui/searchbar";
import { Chat } from "./chat";
import { Separator } from "@/components/ui/separator";

const messages = [
  {
    name: "Momo",
    profile:
      "https://ik.imagekit.io/mhkbf5beo/sklibon-ims/profiles/a37921be-1616-4722-8706-11699f89684c-momo-square.png",
  },
  {
    name: "Sana",
    profile:
      "https://ik.imagekit.io/mhkbf5beo/sklibon-ims/profiles/9e85021d-8e5e-42cc-9277-ba04221180b4-sana-square.png",
  },
  {
    name: "Jihyo",
    profile:
      "https://ik.imagekit.io/mhkbf5beo/sklibon-ims/profiles/9b5aaf0e-dbf3-4916-95fb-f6741e6d8632-jihyo-square.png",
  },
  {
    name: "Nayeon",
    profile:
      "https://ik.imagekit.io/mhkbf5beo/sklibon-ims/profiles/54cfdabc-948b-4819-b4d0-cc7bd0bf19df-nayeon-square.png",
  },
  {
    name: "Mina",
    profile:
      "https://ik.imagekit.io/mhkbf5beo/sklibon-ims/profiles/d256a651-3bba-4c41-aee7-f0ef21d8444b-mina-square.png",
  },
  {
    name: "Dhayun",
    profile:
      "https://ik.imagekit.io/mhkbf5beo/sklibon-ims/profiles/3d9a6254-4622-4833-b3c0-de14c7a891e9-dhayun-square.png",
  },
  {
    name: "Chaeyoung",
    profile:
      "https://ik.imagekit.io/mhkbf5beo/sklibon-ims/profiles/bd3c24e3-bcf4-4e10-be0d-203b18dccd38-chaeyoung-square.png",
  },
];

export const ChatList = () => {
  return (
    <div className="border-input rounded-md border">
      <ChatListHeader />
      <Separator className="bg-input" />
      <div className="px-6 py-4">
        <Searchbar inputProps={{ placeholder: "Search conversations..." }} />
      </div>
      <Separator className="bg-input" />
      {messages.map((message, index) => (
        <Chat
          key={`chat-message-${index}`}
          name={message.name}
          profile={message.profile}
        />
      ))}
    </div>
  );
};
