import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { Button, Card, Input } from "../../../../packages/ui/src/components";
import { Delete } from "../../../../packages/ui/src/lib";

export type ImageItem =
  | { type: "file"; file: File }
  | { type: "url"; url: string };

interface InputImagesProps {
  stateForm: ImageItem[];
  setStateForm: React.Dispatch<React.SetStateAction<ImageItem[]>>;
}

function InputImages({ stateForm, setStateForm }: InputImagesProps) {
  const [preview, setPreview] = useState<string[]>([]);
  const [urlInput, setUrlInput] = useState("");

  const onChangeURL = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrlInput(e.target.value);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newItems = acceptedFiles.map((file) => ({
      type: "file" as const,
      file,
    }));
    const newPreviews = acceptedFiles.map((file) => URL.createObjectURL(file));

    setStateForm((prev) => [...prev, ...newItems]);
    setPreview((prev) => [...prev, ...newPreviews]);
    console.log(stateForm);
    console.log(preview);
  }, []);

  const removeImages = (index: number) => {
    if (preview[index]?.startsWith("blob:")) {
      URL.revokeObjectURL(preview[index]);
    }

    setStateForm((prev) => prev.filter((_, idx) => idx !== index));
    setPreview((prev) => prev.filter((_, idx) => idx !== index));
    console.log(stateForm);
    console.log(preview);
  };

  useEffect(() => {
    return () => {
      preview.forEach((img) => URL.revokeObjectURL(img));
    };
  }, [preview]);

  const handleAddURL = () => {
    if (!urlInput.trim()) return;

    const newItem = { type: "url" as const, url: urlInput };

    // Agregar la URL directamente a preview (no necesita createObjectURL)
    setPreview((prev) => [...prev, urlInput]);

    // Guardar la URL en images para diferenciarla de Files
    // Opción: guardar un objeto que identifique el tipo
    setStateForm((prev) => [...prev, newItem]); // O usa un objeto: {type: 'url', value: urlInput}

    // Limpiar el input
    setUrlInput("");
  };

  return (
    <Card className="p-2 h-full w-full flex flex-col justify-between gap-1">
      <div className="h-[55%] flex gap-1">
        {!!preview.length &&
          preview.map((previewUrl: string, idx: number) => {
            return (
              <div key={idx} className="relative" style={{ zIndex: idx }}>
                <button
                  className="absolute top-0 left-0 z-10"
                  onClick={(e) => removeImages(idx)}
                >
                  <Delete
                    className="hover:scale-125 text-destructive-foreground"
                    size={20}
                  />
                </button>
                <Image
                  width={60}
                  height={60}
                  key={idx}
                  src={previewUrl}
                  alt="Image Loaded"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            );
          })}
      </div>
      <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input
                disabled={preview.length > 3 ? true : false}
                {...getInputProps()}
              />
              <p
                className={`${preview.length > 3 ? "" : "hover:text-gray-500"}`}
              >
                Drag 'n' drop some files here, or click to select files
              </p>
            </div>
          </section>
        )}
      </Dropzone>
      <div className="flex space-x-2">
        <Input
          disabled={preview.length > 3 ? true : false}
          name="external_url"
          type="url"
          placeholder="https://ejemplo.com/imagen.jpg"
          value={urlInput}
          onChange={onChangeURL}
        />
        <Button
          onClick={handleAddURL}
          disabled={preview.length > 3 ? true : false}
        >
          Guardar
        </Button>
      </div>
    </Card>
  );
}

export default InputImages;
