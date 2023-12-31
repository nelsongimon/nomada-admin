import { useForm } from "@inertiajs/react";
import { Input } from "@/shadcn/ui/input";
import { Textarea } from "@/shadcn/ui/textarea";
import { ChangeEvent } from "react";
import { Button } from "@/shadcn/ui/button";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { CheckCircle2, Trash2, XCircle } from "lucide-react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { cn, slugify } from "@/lib/utils";
import axios from "axios";

interface FormCreateStyle {
  closeModal: () => void;
}

export default function FormCreateStyle({
  closeModal,
}: FormCreateStyle) {
  const [isLoading, setIsLoading] = useState(false);
  const [checkSlug, setCheckSlug] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [billboardImagePreview, setBillboardImagePreview] = useState("");
  const { data, setData, post, errors } = useForm({
    image: {},
    billboard: {},
    name: "",
    description: "",
    slug: "",
    order: 1
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    post(route("styles.store"), {
      onStart: () => setIsLoading(true),
      onSuccess: () => {
        closeModal();
        toast.success("Style created");
        setIsLoading(false);
      },
      onError: () => {
        setIsLoading(false);
      },
      preserveScroll: true,
    });
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>, key: "image" | "billboard") => {
    if (event.target.files) {
      const file = event.target.files[0];
      const reader = new FileReader();
      setData(key, file);
      reader.onload = (e) => {
        if (key === "image") setImagePreview(e.target?.result as string);
        else setBillboardImagePreview(e.target?.result as string);
      }
      reader.readAsDataURL(file);
    }
  };

  const deleteImage = (key: "image" | "billboard") => {
    setData(key, {});
    if (key === "image") setImagePreview("");
    else setBillboardImagePreview("");
  }

  const handleCheckSlug = () => {
    if (checkSlug) {
      toast.success("Slug unlocked");
      setCheckSlug(false);
      return;
    }
    axios.post('/styles/check', {
      slug: data.slug
    }).then((res) => {
      if (res.data.slug) {
        toast.success("Slug available");
      } else {
        toast.error("Slug not available");
      }
      setCheckSlug(res.data.slug);
    }).
      catch((err) => {
        console.log("Error", err);
      })
  }

  useEffect(() => {
    if (checkSlug) return;
    setData("slug", slugify(data.name));
  }, [data.name]);

  return (
    <div className="py-7 px-5">
      <div className="mb-4">
        <h3 className="text-center font-semibold text-xl">
          Add new style
        </h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-y-4">
          <div className="grid grid-cols-2 gap-x-4">
            {/* Name */}
            <div className="col-span-1 flex flex-col gap-y-2">
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
            {/* Order */}
            <div className="col-span-1 flex flex-col gap-y-2">
              <Input
                type="number"
                placeholder="Order"
                min={1}
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
          <div className="grid grid-cols-12 gap-x-4">
            {/* Slug */}
            <div className="col-span-9 flex flex-col gap-y-2">
              <Input
                placeholder="Slug"
                value={data.slug}
                onChange={(e) => setData("slug", e.target.value)}
                disabled={checkSlug}
              />
              {errors.slug && (
                <div className="flex items-center gap-x-1 text-red-500 text-sm font-normal ml-1">
                  <XCircle size={20} className="stroke-[1]" />
                  {errors.slug}
                </div>
              )}
            </div>
            <div className="col-span-3">
              <Button
                variant={"secondary"}
                onClick={handleCheckSlug}
                type="button"
                className={cn(`
                  w-full flex items-center gap-x-2
                `,
                  checkSlug && "bg-green-500 hover:bg-green-600 text-white"
                )}
              >
                <CheckCircle2 size={20} className="stroke-[1.5]" />
                {checkSlug ? "Checked" : "Check"}
              </Button>
            </div>
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
            {/* Image */}
            <div className="col-span-1 flex flex-col gap-y-2">
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
                    <div className="w-[150px] h-[100px] rounded-md overflow-hidden relative">
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
                        onClick={() => deleteImage("billboard")}
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
              <input id="image" type="file" onChange={(event) => handleFileChange(event, "image")} className="hidden" />
              {errors.image && (
                <div className="flex items-center gap-x-1 text-red-500 text-sm font-normal ml-1">
                  <XCircle size={20} className="stroke-[1]" />
                  {errors.image}
                </div>
              )}
            </div>
            {/* Billboard */}
            <div className="col-span-1 flex flex-col gap-y-2">
              <label htmlFor="billboard" className="
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
                {billboardImagePreview ? (
                  <div className="flex flex-col gap-y-1 items-center">
                    <div className="w-[300px] h-[100px] rounded-md overflow-hidden relative">
                      <img
                        src={billboardImagePreview}
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
                        onClick={() => deleteImage("billboard")}
                        className="absolute top-2 right-2"
                      >
                        <Trash2 size={20} className="" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <span>Add billboard image</span>
                )
                }
              </label>
              <input id="billboard" type="file" onChange={(event) => handleFileChange(event, "billboard")} className="hidden" />
              {errors.billboard && (
                <div className="flex items-center gap-x-1 text-red-500 text-sm font-normal ml-1">
                  <XCircle size={20} className="stroke-[1]" />
                  {errors.billboard}
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
            disabled={isLoading || !checkSlug}
          >
            {isLoading && (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            )}
            Save style
          </Button>
        </div>
      </form>
    </div>
  );
}
