import { textElipsis } from "@/lib/utils/utils";

interface ContentProps {
  title: string;
  total: number;
}

export const Content = ({ title, total }: ContentProps) => {
  return (
    <div className="py-2">
      <p className="text-sm font-semibold md:text-base">
        {textElipsis(title, 32)}
      </p>
      <p className="text-muted text-xs font-medium">{`${total} photos`}</p>
    </div>
  );
};
