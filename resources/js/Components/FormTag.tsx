import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import { Tag } from "@/types";
import { useForm } from "@inertiajs/react";
import { FileEdit, PlusCircle, XCircle } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";

interface FormTagProps {
  tag?: Tag | null;
  selectedTag: () => void;
}

export default function FormTag({
  tag,
  selectedTag
}: FormTagProps) {

  const { data, setData, post, patch, errors } = useForm({
    name: "",
  });

  useEffect(() => {
    if (tag?.name) {
      setData("name", tag?.name as string);
    }
  }, [tag]);

  const handleCreate = (event: any) => {
    event.preventDefault();
    post(route("tags.store"), {
      onSuccess: () => {
        toast.success("Tag created");
      },
      onError: () => {
        toast.error("Something went wrong");
      },
      onFinish: () => {
        setData("name", "");
      },
      preserveScroll: true,
    });
  }

  const handleUpdate = (event: any) => {
    event.preventDefault();
    patch(route("tags.update", tag?.id), {
      onSuccess: () => {
        toast.success("Tag updated");
      },
      onError: () => {
        toast.error("Something went wrong");
      },
      onFinish: () => {
        setData("name", "");
        selectedTag();
      },
      preserveScroll: true,
    });
  }

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex gap-x-3 items-end">
        <div className="flex flex-1 flex-col gap-y-2">
          <label htmlFor="name" className="text-sm font-semibold">
            Name
          </label>
          <Input
            id="name"
            placeholder="Tag name"
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
          />
        </div>
        <div>
          <Button
            variant={'outline'}
            size={'default'}
            onClick={tag ? handleUpdate : handleCreate}
            type="button"
          >
            {tag ? (
              <span className="flex items-center gap-x-2">
                Update <FileEdit size={20} className="stroke-[1.5]" />
              </span>
            ) : (
              <span className="flex items-center gap-x-2">
                Add <PlusCircle size={20} className="stroke-[1.5]" />
              </span>
            )}
          </Button>
        </div>
      </div>
      {errors.name && (
        <div className="flex items-center gap-x-1 text-red-500 text-sm font-normal ml-1">
          <XCircle size={20} className="stroke-[1]" />
          {errors.name}
        </div>
      )}
    </div>
  );

}
