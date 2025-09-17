"use client";
import { Card, Label } from "@workspace/ui/components";
import Image from "next/image";
import { useState } from "react";
import { Product } from "../../lib/types";

interface ProductGalleryProps {
  product: Product;
}

const ProductGallery = ({ product }: ProductGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(
    product.imageUrl ? product.imageUrl : product.images![0]
  );

  const handleChangeImage = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  return (
    <section className="w-full grid grid-cols-1 lg:grid-cols-10 p-4">
      <div className="col-span-7 h-[60vh] grid grid-cols-6 grid-rows-3 gap-2">
        <div className="col-start-1 col-span-2 ">
          {product && product.images ? (
            product.images.map((imageUrl, index) => (
              <Card
                key={index}
                className="h-full shadow-lg bg-black p-0 overflow-hidden"
                onClick={() => handleChangeImage(imageUrl)}
              >
                <Image
                  src={imageUrl}
                  alt={"Product Image " + (index + 1)}
                  width={200}
                  height={200}
                  className="relative z-10 object-scale-down h-full w-full"
                  priority
                />
              </Card>
            ))
          ) : (
            <div>No image available</div>
          )}
        </div>
        <div className="col-start-3 col-span-4 row-start-1 row-end-4">
          <Card className="relative h-full shadow-lg bg-black p-0 overflow-hidden">
            <Image
              src={selectedImage || ""}
              alt="Product Main Image"
              width={200}
              height={200}
              className="relative z-10 object-contain h-full w-full"
              priority
            />
          </Card>
        </div>
      </div>
      <div className="col-span-3 w-full h-full p-4">
        <Label className="text-3xl font-bold">{product.name}</Label>
        <Label className="text-lg text-muted-foreground my-2">
          {product.description}
        </Label>
        <div className="my-4 flex items-center gap-2">
          <Label className="text-2xl font-bold">{product.price}</Label>
          <Label className="text-sm text-muted-foreground line-through">
            {typeof product.price === "number" &&
            typeof product.discountPercentage === "number"
              ? product.price - product.discountPercentage
              : ""}
          </Label>
          <Label className="text-sm text-green-500">
            {product.discountPercentage === 0
              ? ""
              : product.discountPercentage + "% off"}
          </Label>
        </div>
        <div className="my-4 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Label className="text-sm text-muted-foreground">
              {product.stock === 0 ? "Out of Stock" : product.stock}
            </Label>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductGallery;
