import ImageUploader from "./ImageUploader";
import { Image } from "@/types";

interface ImagesUploadProps {
  setSelectedImages: React.Dispatch<React.SetStateAction<Image[]>>;
  selectedImages: Image[];
}

export default function ImagesUpload({
  setSelectedImages,
  selectedImages
}: ImagesUploadProps) {

  return (
    <div className="flex flex-wrap gap-3">
      {selectedImages.map((image, index) => (
        <ImageUploader
          key={image.id}
          image={image}
          setSelectedImages={setSelectedImages}
          isFeatured={index === 0}
        />
      ))}
      <ImageUploader
        setSelectedImages={setSelectedImages}
      />
    </div>
  );
}
