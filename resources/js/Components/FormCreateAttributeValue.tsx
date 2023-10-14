import { useForm } from "@inertiajs/react";
import { Input } from "@/shadcn/ui/input";
import { ChangeEvent } from "react";
import { Button } from "@/shadcn/ui/button";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Trash2, XCircle } from "lucide-react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { cn, slugify } from "@/lib/utils";

interface FormCreateAttributeValueProps {
  closeModal: () => void;
  attributeId: number;
}

export default function FormCreateAttributeValue({
  closeModal,
  attributeId
}: FormCreateAttributeValueProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const { data, setData, post, errors } = useForm({
    order: 1,
    name: "",
    slug: "",
    value: "",
    image: {},
    attributeId
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(data);

    post(route("attribute-values.store"), {
      onStart: () => setIsLoading(true),
      onSuccess: () => {
        closeModal();
        toast.success("Value created");
        setIsLoading(false);
      },
      onError: () => {
        setIsLoading(false);
      },
      preserveScroll: true,
    });
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const reader = new FileReader();
      setData("image", file);
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      }
      reader.readAsDataURL(file);
    }
  };

  const deleteImage = () => {
    setData("image", {});
    setImagePreview("");
  }

  useEffect(() => {
    setData("slug", slugify(data.name));
  }, [data.name]);

  return (
    <div className="py-7 px-5">
      <div className="mb-4">
        <h3 className="text-center font-semibold text-xl">
          Add new value
        </h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-y-4">
          <div className="grid grid-cols-2 gap-x-4">
            {/* Name */}
            <div className="col-span-2 flex flex-col gap-y-2">
              <Input
                placeholder="Title"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
              />
              {errors.name && (
                <div className="flex items-center gap-x-1 text-red-500 text-sm font-normal ml-1">
                  <XCircle size={20} className="stroke-[1]" />
                  {errors.name}
                </div>
              )}
            </div>
          </div>
          {/* Slug */}
          <div className="col-span-12 flex flex-col gap-y-2">
            <Input
              placeholder="Slug"
              value={data.slug}
              onChange={(e) => setData("slug", e.target.value)}
            />
            {errors.slug && (
              <div className="flex items-center gap-x-1 text-red-500 text-sm font-normal ml-1">
                <XCircle size={20} className="stroke-[1]" />
                {errors.slug}
              </div>
            )}
          </div>
          {/* Order */}
          <div className="col-span-1 flex flex-col gap-y-2">
            <Input
              type="number"
              placeholder="Order"
              value={data.order}
              min={1}
              onChange={(e) => setData("order", Number(e.target.value))}
            />
            {errors.order && (
              <div className="flex items-center gap-x-1 text-red-500 text-sm font-normal ml-1">
                <XCircle size={20} className="stroke-[1]" />
                {errors.order}
              </div>
            )}
          </div>
          {/* Value */}
          <div className="col-span-12 flex flex-col gap-y-2">
            <Input
              placeholder="Value"
              value={data.value}
              onChange={(e) => setData("value", e.target.value)}
            />
            {errors.value && (
              <div className="flex items-center gap-x-1 text-red-500 text-sm font-normal ml-1">
                <XCircle size={20} className="stroke-[1]" />
                {errors.value}
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-x-4">
            {/* Image */}
            <div className="col-span-2 flex flex-col gap-y-2">
              <label htmlFor="image" className="
              text-gray-500 
              border
              border-gray-200
              border-dashed
              font-bold 
              py-4
              px-4 
              rounded
              flex
              items-center
              justify-center
              ">
                {imagePreview ? (
                  <div className="flex flex-col gap-y-1 items-center">
                    <div className="h-[70px] rounded-md overflow-hidden relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="
                          object-cover
                          object-center
                          w-full
                          h-full
                        "
                      />
                      <Button
                        size={"sm"}
                        variant={"destructive"}
                        onClick={deleteImage}
                        className="absolute top-2 right-2"
                      >
                        <Trash2 size={20} className="" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <span>Add image</span>
                )
                }
              </label>
              <input id="image" type="file" onChange={handleFileChange} className="hidden" />
              {errors.image && (
                <div className="flex items-center gap-x-1 text-red-500 text-sm font-normal ml-1">
                  <XCircle size={20} className="stroke-[1]" />
                  {errors.image}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <Button
            variant={"secondary"}
            onClick={closeModal}
            className="flex items-center gap-x-2"
            disabled={isLoading}
            type="button"
          >
            Close modal
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
          >
            {isLoading && (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            )}
            Save value
          </Button>
        </div>
      </form>
    </div>
  );
}
