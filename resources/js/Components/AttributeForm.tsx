import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import { Attribute } from "@/types";
import { useForm } from "@inertiajs/react";
import { FileEdit, PlusCircle, Trash, XCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface AttributeFormProps {
  attribute?: Attribute;
  closeForm?: () => void;
  cofirmDelete?: () => void;
}
export default function AttributeForm({
  attribute,
  closeForm,
  cofirmDelete
}: AttributeFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { data, setData, errors, post, patch } = useForm({
    name: attribute?.name ?? "",
    order: attribute?.order ?? 1,
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (attribute) {
      patch(route("attributes.update", attribute.id), {
        onStart: () => setIsLoading(true),
        onSuccess: () => {
          toast.success("Attribute updated");
        },
        onError: () => {
          toast.error("Something went wrong");
        },
        onFinish: () => closeForm?.(),
        preserveScroll: true,
      });
      return;
    }
    post(route("attributes.store"), {
      onStart: () => setIsLoading(true),
      onSuccess: () => {
        toast.success("Attribute created");
      },
      onError: () => {
        toast.error("Something went wrong");
      },
      onFinish: () => {
        setData({
          name: "",
          order: 1,
        });
      },
      preserveScroll: true,
    });
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-x-5">
          <div className="flex flex-col gap-y-2">
            <div className="flex gap-x-2 items-center">
              <label htmlFor="name" className="text-sm font-semibold">
                Name
              </label>
              <Input
                id="name"
                placeholder="Name"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
              />
            </div>
            {errors.name && (
              <div className="flex items-center gap-x-1 text-red-500 text-sm font-normal ml-1">
                <XCircle size={20} className="stroke-[1]" />
                {errors.name}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="flex gap-x-2 items-center">
              <label htmlFor="order" className="text-sm font-semibold">
                Order
              </label>
              <Input
                id="order"
                placeholder="Order"
                value={data.order}
                type="number"
                min={1}
                onChange={(e) => setData("order", Number(e.target.value))}
              />
            </div>
            {errors.order && (
              <div className="flex items-center gap-x-1 text-red-500 text-sm font-normal ml-1">
                <XCircle size={20} className="stroke-[1]" />
                {errors.order}
              </div>
            )}

          </div>
          {attribute ? (
            <div className="flex gap-x-2">
              <Button
                variant={"secondary"}
                type="submit"
                className="flex items-center gap-x-2"
              >
                Edit <FileEdit size={15} className="stroke-[1.5]" />
              </Button>
              <Button
                variant={"destructive"}
                type="button"
                onClick={cofirmDelete}
                className="flex items-center gap-x-2"
              >
                Delete <Trash size={15} className="stroke-[1.5]" />
              </Button>
              <Button
                variant={"outline"}
                type="button"
                className="flex items-center gap-x-2"
                onClick={closeForm}
              >
                Cancel <XCircle size={20} className="stroke-[1.5]" />
              </Button>
            </div>
          ) : (
            <div>
              <Button
                variant={"secondary"}
                type="submit"
                className="flex items-center gap-x-2"
              >
                Create <PlusCircle size={20} className="stroke-[1.5]" />
              </Button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
