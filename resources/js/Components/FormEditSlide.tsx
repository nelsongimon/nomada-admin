import { router, useForm } from "@inertiajs/react";
import { Input } from "@/shadcn/ui/input";
import { Textarea } from "@/shadcn/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/ui/select";
import { ChangeEvent } from "react";
import { Button } from "@/shadcn/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import { Trash2, XCircle } from "lucide-react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Slide } from "@/types";

interface FormEditSlide {
  slide: Slide;
  closeModal: () => void;
}

export default function FormEditSlide({
  slide,
  closeModal,
}: FormEditSlide) {
  const [isLoading, setIsLoading] = useState(false);
  const [desktopImagePreview, setDesktopImagePreview] = useState(slide.desktopImage);
  const [mobileImagePreview, setMobileImagePreview] = useState(slide.mobileImage);
  const { data, setData, errors } = useForm({
    desktopImage: {},
    mobileImage: {},
    title: slide.title,
    description: slide.description,
    label: slide.label,
    action: slide.action,
    position: slide.position,
    order: slide.order
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();

    router.post(route('slides.update', slide.id), {
      _method: "patch",
      ...data,
    }, {
      onStart: () => setIsLoading(true),
      onSuccess: () => {
        closeModal();
        toast.success("Updated slide");
        setIsLoading(false);
      },
      onError: () => {
        setIsLoading(false);
      },
      preserveScroll: true,
    });
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>, key: "desktopImage" | "mobileImage") => {
    if (event.target.files) {
      const file = event.target.files[0];
      const reader = new FileReader();
      setData(key, file);
      reader.onload = (e) => {
        if (key === "desktopImage") setDesktopImagePreview(e.target?.result as string);
        else setMobileImagePreview(e.target?.result as string);
      }
      reader.readAsDataURL(file);
    }
  };

  const deleteImage = (key: "desktopImage" | "mobileImage") => {
    setData(key, {});
    if (key === "desktopImage") setDesktopImagePreview("");
    else setMobileImagePreview("");
  }

  return (
    <div className="py-7 px-5">
      <div className="mb-4">
        <h3 className="text-center font-semibold text-xl">
          Edit slide
        </h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-y-4">
          <div className="grid grid-cols-2 gap-x-4">
            {/* Title */}
            <div className="col-span-1 flex flex-col gap-y-2">
              <Input
                placeholder="Title"
                value={data.title}
                onChange={(e) => setData("title", e.target.value)}
              />
              {errors.title && (
                <div className="flex items-center gap-x-1 text-red-500 text-sm font-normal ml-1">
                  <XCircle size={20} className="stroke-[1]" />
                  {errors.title}
                </div>
              )}
            </div>
            {/* Order */}
            <div className="col-span-1 flex flex-col gap-y-2">
              <Input
                type="number"
                placeholder="Order"
                value={data.order}
                onChange={(e) => setData("order", Number(e.target.value))}
              />
              {errors.order && (
                <div className="flex items-center gap-x-1 text-red-500 text-sm font-normal ml-1">
                  <XCircle size={20} className="stroke-[1]" />
                  {errors.order}
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-4">
            {/* Label */}
            <div className="col-span-1 flex flex-col gap-y-2">
              <Input
                placeholder="Label"
                value={data.label}
                onChange={(e) => setData("label", e.target.value)}
              />
              {errors.label && (
                <div className="flex items-center gap-x-1 text-red-500 text-sm font-normal ml-1">
                  <XCircle size={20} className="stroke-[1]" />
                  {errors.label}
                </div>
              )}
            </div>
            {/* Call to action */}
            <div className="col-span-1 flex flex-col gap-y-2">
              <Input
                placeholder="Call to action"
                value={data.action}
                onChange={(e) => setData("action", e.target.value)}
              />
              {errors.action && (
                <div className="flex items-center gap-x-1 text-red-500 text-sm font-normal ml-1">
                  <XCircle size={20} className="stroke-[1]" />
                  {errors.action}
                </div>
              )}
            </div>
          </div>
          {/* Position */}
          <div className="col-span-1 flex flex-col gap-y-2">
            <Select onValueChange={(value) => setData("position", value)} defaultValue={slide.position}>
              <SelectTrigger>
                <SelectValue placeholder="Position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="center">Center</SelectItem>
                <SelectItem value="right">Right</SelectItem>
              </SelectContent>
            </Select>
            {errors.position && (
              <div className="flex items-center gap-x-1 text-red-500 text-sm font-normal ml-1">
                <XCircle size={20} className="stroke-[1]" />
                {errors.position}
              </div>
            )}
          </div>
          {/* Description */}
          <div className="flex flex-col gap-y-2">
            <Textarea
              placeholder="Description"
              value={data.description}
              onChange={(e) => setData("description", e.target.value)}
            />
            {errors.description && (
              <div className="flex items-center gap-x-1 text-red-500 text-sm font-normal ml-1">
                <XCircle size={20} className="stroke-[1]" />
                {errors.description}
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-x-4">
            {/* Desktop image */}
            <div className="col-span-1 flex flex-col gap-y-2">
              <label htmlFor="desktopImage" className="
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
                {desktopImagePreview ? (
                  <div className="flex flex-col gap-y-1 items-center">
                    <div className="w-[250px] h-[150px] rounded-md overflow-hidden relative">
                      <img
                        src={desktopImagePreview}
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
                        onClick={() => deleteImage("desktopImage")}
                        className="absolute top-2 right-2"
                      >
                        <Trash2 size={20} className="" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <span>Edit desktop image</span>
                )
                }
              </label>
              <input id="desktopImage" type="file" onChange={(e) => handleFileChange(e, "desktopImage")} className="hidden" />
              {errors.desktopImage && (
                <div className="flex items-center gap-x-1 text-red-500 text-sm font-normal ml-1">
                  <XCircle size={20} className="stroke-[1]" />
                  {errors.desktopImage}
                </div>
              )}
            </div>
            {/* Mobile image */}
            <div className="col-span-1 flex flex-col gap-y-2">
              <label htmlFor="mobileImage" className="
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
                {mobileImagePreview ? (
                  <div className="flex flex-col gap-y-1 items-center">
                    <div className="w-[150px] h-[150px] rounded-md overflow-hidden relative">
                      <img
                        src={mobileImagePreview}
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
                        onClick={() => deleteImage("mobileImage")}
                        className="absolute top-2 right-2"
                      >
                        <Trash2 size={20} className="" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <span>Edit mobile image</span>
                )
                }
              </label>
              <input id="mobileImage" type="file" onChange={(e) => handleFileChange(e, "mobileImage")} className="hidden" />
              {errors.mobileImage && (
                <div className="flex items-center gap-x-1 text-red-500 text-sm font-normal ml-1">
                  <XCircle size={20} className="stroke-[1]" />
                  {errors.mobileImage}
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
            Edit slide
          </Button>
        </div>
      </form>
    </div>
  );
}
