import { Header } from "./header";
import { Content } from "./content";
import { Footer } from "./footer";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";

export const EventCard = () => {
  return (
    <Card className="border-input gap-2 overflow-hidden rounded-md border p-0 shadow-none">
      <Header />
      <Separator className="bg-input" />
      <Content />
      <Separator className="bg-input" />
      <Footer />
    </Card>
  );
};
