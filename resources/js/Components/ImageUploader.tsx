import { cn } from "@/lib/utils";
import { Button } from "@/shadcn/ui/button";
import { Image } from "@/types";
import axios from "axios";
import { CheckCircle2, ImagePlus, Trash, Image as ImageIcon } from "lucide-react";
import { useState, ChangeEvent, useId } from "react";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";

interface ImageUploaderProps {
  setSelectedImages: React.Dispatch<React.SetStateAction<Image[]>>;
  image?: Image;
  isFeatured?: boolean;
}

export default function ImageUploader({
  setSelectedImages,
  image,
  isFeatured
}: ImageUploaderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const id = useId();

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    setIsLoading(true);
    axios.post("/images/upload", formData)
      .then((res) => {
        setSelectedImages((prevState: Image[]) => [...prevState, res.data.image]);
      })
      .catch(error => {
        console.error(error);
        toast.error("Something went wrong");
      })
      .finally(() => setIsLoading(false));
  };

  const removeImage = () => {
    setSelectedImages((prevState: Image[]) => prevState.filter(item => item.id !== image?.id));
  }

  const changeToFeatured = () => {
    if (!image) return;
    setSelectedImages((prevState: Image[]) => {
      const newImages = prevState.filter(item => item.id !== image?.id);
      return [image, ...newImages];
    });

  }

  return (
    <div>
      <div
        className={cn(`
        h-[150px]
        w-[150px]
        border-2
        border-dashed
        rounded-lg
        flex-col
        gap-y-2
        text-gray-400
        p-1
        flex 
        items-center
        justify-center
        `,
          isFeatured ? "border-black" : "border-gray-200"
        )}>
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <Oval
              height={50}
              width={50}
              color="#c1c1c1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel='oval-loading'
              secondaryColor="#c1c1c1"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          </div>
        ) : (
          <div className="">
            {image ? (
              <div className="w-full h-full overflow-hidden relative">
                <Button
                  variant={"destructive"}
                  size={"sm"}
                  className="absolute top-2 right-2 py-0 px-2"
                  onClick={removeImage}
                >
                  <Trash size={18} className="stroke-[1.3]" />
                </Button>
                {!isFeatured && (
                  <Button
                    variant={"default"}
                    size={"sm"}
                    className="absolute bottom-2 left-[50%] rounded-full translate-x-[-50%] w-[110px] opacity-80 py-0 bg-white text-black hover:bg-slate-50"
                    onClick={changeToFeatured}
                  >
                    Switch to main
                  </Button>
                )}
                <img
                  src={`/${image.image}`}
                  alt="image"
                  className="object-contain object-center w-full h-full rounded-lg"
                />
              </div>
            ) : (
              <label htmlFor={id} className="w-full flex flex-col gap-y-2 items-center justify-center cursor-pointer">
                <ImagePlus size={30} className="stroke-[1]" />
                <span className="font-semibold text-sm">
                  Add image
                </span>
              </label>
            )}
          </div>
        )}
      </div>
      <input
        type="file"
        id={id}
        onChange={handleUpload}
        className="hidden"
      />
    </div>
  );
};

