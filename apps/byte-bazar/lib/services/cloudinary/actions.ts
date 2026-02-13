"use server";

import { deleteImages, uploadImages } from ".";
import { ImageItem } from "../../utils";

export async function uploadImagesAction(
  imageItems: ImageItem[],
): Promise<string[]> {
  try {
    const imageUrls = imageItems
      .filter((item) => item.type === "url")
      .map((item) => item.url);
    console.log("existing image urls: ", imageUrls);
    const imageFiles = imageItems
      .filter((item) => item.type === "file")
      .map((item) => item.file);
    console.log("uploading images to cloudinary: ", imageFiles);

    const imageResult = await uploadImages(imageFiles);
    return [...imageUrls, ...imageResult];
  } catch (error) {
    console.error("Error uploading images to cloudinary: ", error);
    throw error;
  }
}

export async function deleteImagesAction(publicIds: string[]): Promise<void> {
  try {
    console.log("deleting images from cloudinary: ", publicIds);
    const uploadedImages = publicIds.filter((id) =>
      id.startsWith("https://res.cloudinary.com/"),
    );
    console.log("uploaded images to delete: ", uploadedImages);
    if (uploadedImages.length > 0) {
      await deleteImages(uploadedImages);
      console.log("images deleted");
    }
  } catch (error) {
    console.error("Error deleting images from cloudinary: ", error);
    throw error;
  }
}
