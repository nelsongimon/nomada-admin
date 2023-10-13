import { Button } from "@/shadcn/ui/button";
import { Style } from "@/types";
import { FileEdit, Trash } from "lucide-react";

interface StyleItemProps {
  style: Style;
  handleEdit: (style: Style) => void;
  handleDelete: (style: Style) => void;
}
export default function StyleItem({
  style,
  handleEdit,
  handleDelete,
}: StyleItemProps) {
  return (
    <div className="flex gap-x-4 py-4 px-4 border border-gray-200 border-dashed rounded-md items-center">
      {/* Image */}
      <div className="h-[90px] w-[150px] overflow-hidden rounded-md">
        <img
          src={style.image}
          alt="Style image"
          className="object-contain object-center w-full h-full"
        />
      </div>
      <div className="h-[90px] w-[200px] overflow-hidden rounded-md">
        <img
          src={style.billboard ? style.billboard : "/images/placeholder.png"}
          alt="Style billboard"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="ml-5 grid grid-cols-12 gap-x-12 flex-1 items-center">
        {/* Name, Slug and Products */}
        <div className="col-span-3 flex flex-col gap-y-3">
          <div className="flex gap-x-3">
            <div className="text-sm font-medium">Name:</div>
            <div className="text-sm font-medium">{style.name}</div>
          </div>
          <div className="flex gap-x-3">
            <div className="text-sm font-medium">Slug:</div>
            <div className="text-sm text-muted-foreground">{style.slug}</div>
          </div>
          <div className="flex gap-x-3">
            <div className="text-sm font-medium">Products:</div>
            <div className="text-sm font-medium">{style.products_count}</div>
          </div>
        </div>
        {/*  Order and Description */}
        <div className="col-span-5 flex flex-col gap-y-3">
          <div className="flex gap-x-3">
            <div className="text-sm font-medium">Order:</div>
            <div className="text-sm font-medium">{style.order}</div>
          </div>
          <div className="flex gap-x-3">
            <div className="text-sm font-medium">Description:</div>
            <div className="text-sm text-muted-foreground">{style.description ?? "No description"}</div>
          </div>
        </div>
        {/* Edit and Delete */}
        <div className="col-span-4 flex gap-x-4">
          <Button
            variant={"secondary"}
            onClick={() => handleEdit(style)}
            className="flex items-center gap-x-1"
          >
            Edit <FileEdit size={15} className="stroke-[1.5]" />
          </Button>
          <Button
            variant={"destructive"}
            onClick={() => handleDelete(style)}
            className="flex items-center gap-x-1"
          >
            Delete <Trash size={15} className="stroke-[1.5]" />
          </Button>
        </div>
      </div>
    </div>
  );
}
