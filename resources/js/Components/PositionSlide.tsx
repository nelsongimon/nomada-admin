import { capitalizeString } from "@/lib/utils";
import { ArrowDownToLine, ArrowLeftToLine, ArrowRightToLine } from "lucide-react";

interface PositionSlideProps {
  position: string;
}
export default function PositionSlide({
  position
}: PositionSlideProps) {
  const icon = () => {
    if (position === "left") {
      return <ArrowLeftToLine size={20} className="stroke-[1.5]" />;
    }
    if (position === "center") {
      return <ArrowDownToLine size={20} className="stroke-[1.5]" />;
    }
    return <ArrowRightToLine size={20} className="stroke-[1.5]" />;
  }
  return (
    <div className="flex gap-x-5">
      <div className="text-sm font-medium">
        Position:
      </div>
      <div className="flex gap-x-2 items-center text-muted-foreground">
        {icon()}
        <div className="text-sm font-medium">{capitalizeString(position)}</div>
      </div>
    </div>
  );
}
