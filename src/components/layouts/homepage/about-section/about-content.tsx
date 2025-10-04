import { Heading } from "@/components/headings";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const contents: Array<{ title: string; content: string }> = [
  {
    title: "Vision",
    content:
      "To be a thriving and sustainable municipality with a high quality of life for all its residents.",
  },
  {
    title: "Mission",
    content:
      "To enhance farm productivity, increase household income, mitigate flooding, and improve the quality of life.",
  },
];

export const AboutContent = () => {
  return (
    <div className="mx-auto grid w-[min(100%,1000px)] gap-4 px-4 md:grid-cols-2">
      {contents.map((content) => (
        <Card key={content.title} className="shadow-primary/5 shadow-xl">
          <CardHeader>
            <Heading variant="lg" className="text-primary">
              {content.title}
            </Heading>
          </CardHeader>
          <CardContent>
            <p className="text-base font-medium">{content.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
