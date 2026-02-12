"use server";

import { deleteImages, uploadImages } from ".";
import { ImageItem } from "../../utils";

export async function uploadImagesAction(
  imageItems: ImageItem[],
): Promise<string[]> {
  try {
    console.log("uploading images to cloudinary: ", imageItems);
    const imageUrls = imageItems
      .filter((item) => item.type === "url")
      .map((item) => item.url);
    const imageFiles = imageItems
      .filter((item) => item.type === "file")
      .map((item) => item.file);

    const imageResult = await uploadImages(imageFiles);
    return [...imageUrls, ...imageResult];
  } catch (error) {
    console.error("Error uploading images to cloudinary: ", error);
    throw error;
  }
}

export async function deleteImagesAction(publicIds: string[]): Promise<void> {
  try {
    const uploadedImages = publicIds.filter((id) =>
      id.startsWith("https://res.cloudinary.com/"),
    );
    if (uploadedImages.length > 0) {
      await deleteImages(uploadedImages);
      console.log("images deleted");
    }
  } catch (error) {
    console.error("Error deleting images from cloudinary: ", error);
    throw error;
  }
}
