import { Button } from "@/shadcn/ui/button";
import { Category } from "@/types";
import { FileEdit, Trash } from "lucide-react";

interface CategoryItemProps {
  category: Category;
  handleEdit: (category: Category) => void;
  handleDelete: (category: Category) => void;
}
export default function CategoryItem({
  category,
  handleEdit,
  handleDelete,
}: CategoryItemProps) {
  return (
    <div className="flex gap-x-4 py-4 px-4 border border-gray-200 border-dashed rounded-md items-center">
      {/* Image */}
      <div className="h-[90px] w-[200px] overflow-hidden rounded-md">
        <img
          src={category.billboard ? category.billboard : "/images/placeholder.png"}
          alt="Slide image"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="ml-5 grid grid-cols-12 gap-x-12 flex-1 items-center">
        {/* Name and Slug */}
        <div className="col-span-4 flex flex-col gap-y-3">
          <div className="flex gap-x-3">
            <div className="text-sm font-medium">Name:</div>
            <div className="text-sm font-medium">{category.name}</div>
          </div>
          <div className="flex gap-x-3">
            <div className="text-sm font-medium">Slug:</div>
            <div className="text-sm text-muted-foreground">{category.slug}</div>
          </div>
          <div className="flex gap-x-3">
            <div className="text-sm font-medium">Products:</div>
            <div className="text-sm font-medium">{category.products_count}</div>
          </div>
        </div>
        {/*  Label and Action */}
        <div className="col-span-5 flex flex-col gap-y-3">
          <div className="flex gap-x-3">
            <div className="text-sm font-medium">Order:</div>
            <div className="text-sm font-medium">{category.order}</div>
          </div>
          <div className="flex gap-x-3">
            <div className="text-sm font-medium">Description:</div>
            <div className="text-sm text-muted-foreground">{category.description ?? "No description"}</div>
          </div>
        </div>
        {/* Edit and Delete */}
        <div className="col-span-3 flex gap-x-4">
          <Button
            variant={"secondary"}
            onClick={() => handleEdit(category)}
            className="flex items-center gap-x-1"
          >
            Edit <FileEdit size={15} className="stroke-[1.5]" />
          </Button>
          <Button
            variant={"destructive"}
            onClick={() => handleDelete(category)}
            className="flex items-center gap-x-1"
          >
            Delete <Trash size={15} className="stroke-[1.5]" />
          </Button>
        </div>
      </div>
    </div>
  );
}
