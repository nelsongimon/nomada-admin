import { Button } from "@/shadcn/ui/button";
import { Slide } from "@/types";
import PositionSlide from "./PositionSlide";
import ActiveSwitch from "./ActiveSwitch";
import { cn } from "@/lib/utils";
import { FileEdit, Trash } from "lucide-react";

interface SlideItemProps {
  slide: Slide;
  handleEdit: (slide: Slide) => void;
  handleDelete: (slide: Slide) => void;
}
export default function SlideItem({
  slide,
  handleEdit,
  handleDelete,
}: SlideItemProps) {
  return (
    <div className="flex gap-x-4 py-4 px-4 border border-gray-200 border-dashed rounded-md items-center">
      {/* Image */}
      <div className="h-[100px] w-[150px] overflow-hidden rounded-md">
        <img
          src={slide.desktop_image}
          alt="Slide image"
          className={cn(`object-cover w-full h-full`, slide.active ? 'opacity-100' : 'opacity-30')}
        />
      </div>
      <div className="ml-10 grid grid-cols-12 gap-x-12 flex-1 items-center">
        {/* Position, Order and visibility */}
        <div className="col-span-3 flex flex-col gap-y-4">
          <PositionSlide position={slide.position} />
          <div className="flex gap-x-5">
            <div className="text-sm font-medium">
              Order:
            </div>
            <div className="flex gap-x-2 items-center text-muted-foreground">
              <div className="text-sm font-medium">{slide.order}</div>
            </div>
          </div>
          <div className="flex gap-x-5">
            <div className="text-sm font-medium">
              Active
            </div>
            <ActiveSwitch slide={slide} />
          </div>
        </div>
        {/* Title and Description */}
        <div className="col-span-3 flex flex-col gap-y-4">
          <div className="text-sm font-medium">{slide.title}</div>
          <div className="text-sm text-muted-foreground">{slide.description}</div>
        </div>
        {/*  Label and Action */}
        <div className="col-span-3 flex flex-col gap-y-4">
          <div className="text-sm font-medium">{slide.label}</div>
          <div className="text-sm text-muted-foreground">{slide.action}</div>
        </div>
        {/* Edit and Delete */}
        <div className="col-span-3 flex flex-col gap-y-4">
          <Button
            variant={"secondary"}
            onClick={() => handleEdit(slide)}
            className="flex items-center gap-x-1"
          >
            Edit <FileEdit size={15} className="stroke-[1.5]" />
          </Button>
          <Button
            variant={"destructive"}
            onClick={() => handleDelete(slide)}
            className="flex items-center gap-x-1"
          >
            Delete <Trash size={15} className="stroke-[1.5]" />
          </Button>
        </div>
      </div>
    </div>
  );
}
