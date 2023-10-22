import { Button } from "@/shadcn/ui/button";
import { Separator } from "@/shadcn/ui/separator";
import { Tag } from "@/types";
import axios from "axios";
import { MinusCircle, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface TagsProps {
  tags: Tag[];
  selectedTags: Tag[];
  setSelectedTags: (tags: Tag[]) => void;
}

export default function Tags({
  tags,
  selectedTags,
  setSelectedTags
}: TagsProps) {

  const addTag = (tag: Tag) => {
    setSelectedTags([...selectedTags, tag]);
  }

  const removeTag = (id: number) => {
    setSelectedTags(selectedTags.filter((tag) => tag.id !== id));
  }

  return (
    <div className="flex flex-col gap-y-3 ">
      <div className="flex justify-between">
        <h4 className="font-semibold text-base">
          Tags
        </h4>
      </div>
      <Separator />
      <div className="flex flex-col gap-y-3 mb-3">
        <h5 className="font-semibold text-sm text-gray-500">
          Selected tags
        </h5>
        {selectedTags.length === 0 ? (
          <div>
            <span className="text-sm font-semibold text-gray-400">
              There are no selected tags
            </span>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tag) => (
              <Button
                key={tag.id}
                onClick={() => removeTag(tag.id)}
                variant={"default"}
                size={"sm"}
                className="flex items-center gap-x-1 py-1 px-2 rounded-full"
              >
                {tag.name} <MinusCircle size={15} className="stroke-[1.5]" />
              </Button>
            ))}
          </div>
        )}
      </div>
      <Separator />
      <div className="flex flex-col gap-y-3">
        <h5 className="font-semibold text-sm text-gray-500">
          Available tags
        </h5>
        {tags.length === 0 ? (
          <div>
            <span className="text-sm font-semibold text-gray-400">
              There are no tags
            </span>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => {
              if (selectedTags.find((selectedTag) => selectedTag.id === tag.id)) {
                return null;
              }
              return (
                <Button
                  key={tag.id}
                  variant={'outline'}
                  size={'sm'}
                  onClick={() => addTag(tag)}
                  className="flex items-center gap-x-1 py-1 px-2 rounded-full"
                >
                  {tag.name} <PlusCircle size={15} className="stroke-[1.5]" />
                </Button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  );
}
