import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { Button, Card, Input } from "../../../../packages/ui/src/components";
import { Delete } from "../../../../packages/ui/src/lib";
import { ImageItem } from "../../lib/utils/productHelper";

interface InputImagesProps {
  stateForm: ImageItem[];
  setStateForm: React.Dispatch<React.SetStateAction<ImageItem[]>>;
  dbImages?: string[];
}

function InputImages({ setStateForm, dbImages }: InputImagesProps) {
  const [preview, setPreview] = useState<string[]>([]);
  const [urlInput, setUrlInput] = useState("");

  const onChangeURL = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrlInput(e.target.value);
  };
  useEffect(() => {
    if (dbImages && dbImages.length > 0) {
      setPreview(dbImages!);
    }
  }, [dbImages]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newItems = acceptedFiles.map((file) => ({
        type: "file" as const,
        file,
      }));
      const newPreviews = acceptedFiles.map((file) =>
        URL.createObjectURL(file),
      );

      setStateForm((prev) => [...prev, ...newItems]);
      setPreview((prev) => [...prev, ...newPreviews]);
    },
    [setStateForm],
  );

  const removeImages = (index: number) => {
    if (preview[index]?.startsWith("blob:")) {
      URL.revokeObjectURL(preview[index]);
    }

    setStateForm((prev) => prev.filter((_, idx) => idx !== index));
    setPreview((prev) => prev.filter((_, idx) => idx !== index));
  };

  useEffect(() => {
    return () => {
      preview.forEach((img) => URL.revokeObjectURL(img));
    };
  }, [preview]);

  const handleAddURL = () => {
    if (!urlInput.trim()) return;

    const newItem = { type: "url" as const, url: urlInput };
    setPreview((prev) => [...prev, urlInput]);
    setStateForm((prev) => [...prev, newItem]);
    setUrlInput("");
  };

  return (
    <Card className="p-2 w-full space-y-2 flex flex-col gap-1">
      <div className="h-[40%] flex justify-center">
        {!!preview.length &&
          preview.map((previewUrl: string, idx: number) => {
            return (
              <div key={idx} className="relative" style={{ zIndex: idx }}>
                <button
                  className="absolute top-0 left-0 z-10"
                  onClick={() => removeImages(idx)}
                >
                  <Delete
                    className="hover:scale-125 text-destructive-foreground"
                    size={20}
                  />
                </button>
                <Image
                  width={120}
                  height={120}
                  key={idx}
                  src={previewUrl}
                  alt="Image Loaded"
                  className="h-full object-cover rounded-md"
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
                className={`${preview.length > 3 ? "text-gray-500" : "hover:text-gray-500"}`}
              >
                Drag `&n` drop some files here, or click to select files
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
          type="button"
          onClick={handleAddURL}
          disabled={preview.length > 3 ? true : false}
        >
          Add
        </Button>
      </div>
    </Card>
  );
}

export default InputImages;
