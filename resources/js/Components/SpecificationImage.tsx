import { ImagePlus } from "lucide-react";
import { ChangeEvent } from "react";

interface SpecificationImageProps {
  specificationImage: File | string | null;
  setSpecificationImage: React.Dispatch<React.SetStateAction<File | string | null>>
}

export default function SpecificationImage({
  specificationImage,
  setSpecificationImage
}: SpecificationImageProps) {

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSpecificationImage(file);
  }
  return (
    <div>
      <label htmlFor="specificationImage"
        className="
        h-[150px]
        w-[350px]
        border-2
        border-dashed
        rounded-lg
        flex-col
        gap-y-2
        text-gray-400
        p-1
        flex
        cursor-pointer
        overflow-hidden
        "
      >
        {specificationImage ? (
          <img
            src={typeof (specificationImage) === "string" ? `/${specificationImage}` : URL.createObjectURL(specificationImage)}
            alt="specification image"
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full flex flex-col gap-y-2 items-center justify-center">
            <ImagePlus size={30} className="stroke-[1]" />
            <span className="font-semibold text-sm">
              Add image
            </span>
          </div>
        )}
      </label>
      <input
        type="file"
        id="specificationImage"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}
