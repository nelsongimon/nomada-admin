import { useState, ChangeEvent } from "react";

export default function ImageUploader() {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setSelectedImages((prevImages) => [...prevImages, ...selectedFiles]);
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };

  const handleUpload = () => {
    const formData = new FormData();
    selectedImages.forEach((image) => {
      formData.append('imagenes[]', image);
    });

    fetch('/subir-imagenes', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        setSelectedImages([]);
      })
      .catch((error) => {
        console.error('Error al subir las imágenes:', error);
      });
  };

  return (
    <div>
      <label htmlFor="image-input" className="upload-button">
        Seleccionar imágenes
      </label>
      <input
        type="file"
        id="image-input"
        multiple
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />
      <button onClick={handleUpload}>Subir imágenes</button>
      <div className="image-preview">
        {selectedImages.map((image, index) => (
          <div key={index} className="preview-item">
            <img
              src={URL.createObjectURL(image)}
              alt="image"
              className="preview-image"
            />
            <button
              className="remove-button"
              onClick={() => handleRemoveImage(index)}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

