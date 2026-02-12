import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(imagePath: string) {
  try {
    if (!imagePath || imagePath.trim() === "") {
      return "";
    }
    const result = await cloudinary.uploader.upload(imagePath);
    console.log("image uploaded");
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading image to cloudinary: ", error);
    throw error;
  }
}

export async function uploadFile(file: File) {
  try {
    if (!file) {
      return "";
    }
    //convert file to base64
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(base64);

    console.log("file uploaded");
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading file to cloudinary: ", error);
    throw error;
  }
}

export async function deleteImage(publicId: string) {
  try {
    await cloudinary.uploader.destroy(publicId);
    console.log("image deleted");
  } catch (error) {
    console.error("Error deleting image from cloudinary: ", error);
    throw error;
  }
}

export async function uploadImages(imageFiles: File[]) {
  try {
    if (!imageFiles || imageFiles.length === 0) {
      return [];
    }
    const uploadPromises = imageFiles.map((file) => uploadFile(file));
    const urls = await Promise.all(uploadPromises);
    return urls;
  } catch (error) {
    console.error("Error uploading images to cloudinary: ", error);
    throw error;
  }
}

export async function deleteImages(publicIds: string[]) {
  try {
    const deletePromises = publicIds.map((id) => deleteImage(id));
    await Promise.all(deletePromises);
    console.log("images deleted");
  } catch (error) {
    console.error("Error deleting images from cloudinary: ", error);
    throw error;
  }
}
