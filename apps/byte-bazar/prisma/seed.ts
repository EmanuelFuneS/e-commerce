import path from "path";
import { fileURLToPath } from "url";
import { PrismaClient } from "../app/generated/prisma";
import { uploadImage } from "../lib/services/cloudinary";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appRoot = path.resolve(__dirname, "..");
const prisma = new PrismaClient();

const initBrands = [
  {
    name: "INTEL",
    logo: path.join(appRoot, "public/seedImages/brands/AMD.svg"),
  },
  {
    name: "AMD",
    logo: path.join(appRoot, "public/seedImages/brands/Intel.png"),
  },
  {
    name: "Gigabyte",
    logo: path.join(appRoot, "public/seedImages/brands/gigabyte.png"),
  },
];

const initCategories = [
  {
    name: "CPU",
    slug: "cpu",
    imageUrl: path.join(appRoot, "public/seedImages/categories/cpu.svg"),
  },
  {
    name: "GPU",
    slug: "gpu",
    imageUrl: path.join(appRoot, "public/seedImages/categories/gpu.svg"),
  },
  {
    name: "Motherboard",
    slug: "motherboard",
    imageUrl: path.join(
      appRoot,
      "public/seedImages/categories/motherboard.svg"
    ),
  },
  {
    name: "Case",
    slug: "case",
    imageUrl: path.join(appRoot, "public/seedImages/categories/case.svg"),
  },
  {
    name: "Power Supply",
    slug: "power-supply",
    imageUrl: path.join(
      appRoot,
      "public/seedImages/categories/power-supply.svg"
    ),
  },
  {
    name: "Ram",
    slug: "ram",
    imageUrl: path.join(appRoot, "public/seedImages/categories/ram.svg"),
  },
];

const initProducts = [
  {
    name: "Ryzen 7 7800x3d",
    slug: "ryzen-7-7800x3d",
    sku: "AMD-CPU-7800X3D",
    description: "Ryzen 7 7800g processor",
    brandName: "AMD",
    categoryName: "CPU",
    price: 449.99,
    images: [
      path.join(appRoot, "public/seedImages/products/7800x3d.webp"),
      path.join(appRoot, "public/seedImages/products/7800x3d_2.webp"),
    ],
  },
  {
    name: "RX 6600",
    slug: "rx-6600",
    sku: "AMD-GPU-RX6600",
    description: "RX 6600 graphics card",
    brandName: "AMD",
    categoryName: "GPU",
    price: 280.99,
    images: [
      path.join(appRoot, "public/seedImages/products/rx6600.avif"),
      path.join(appRoot, "public/seedImages/products/rx6600_2.jpg"),
    ],
  },
  {
    name: "I5 12400",
    slug: "i5-12400",
    sku: "INTEL-CPU-I512400",
    description: "Intel Core i5 12400 processor",
    brandName: "INTEL",
    categoryName: "CPU",
    price: 299.99,
    images: [
      path.join(appRoot, "public/seedImages/products/12400.jpg"),
      path.join(appRoot, "public/seedImages/products/12400_2.jpeg"),
    ],
  },
  {
    name: "I7 14600",
    slug: "i7-14600",
    sku: "INTEL-CPU-I714600",
    description: "Intel Core i7 14600 processor",
    brandName: "INTEL",
    categoryName: "CPU",
    price: 449.99,
    images: [
      path.join(appRoot, "public/seedImages/products/14600.jpg"),
      path.join(appRoot, "public/seedImages/products/14600_2.webp"),
    ],
  },
  {
    name: "H410M H v2",
    slug: "h410m-h-v2",
    sku: "GIGABYTE-MB-H410MHV2",
    description: "H410M H v2 motherboard",
    brandName: "Gigabyte",
    categoryName: "Motherboard",
    price: 175.99,
    images: [
      path.join(appRoot, "public/seedImages/products/h410hv2.jpg"),
      path.join(appRoot, "public/seedImages/products/h410mhv2_2.webp"),
    ],
  },
  {
    name: "B550M K",
    slug: "b550m-k",
    sku: "GIGABYTE-MB-B550MK",
    description: "B550M K motherboard",
    brandName: "Gigabyte",
    categoryName: "Motherboard",
    price: 225.99,
    images: [
      path.join(appRoot, "public/seedImages/products/b550mk.png"),
      path.join(appRoot, "public/seedImages/products/b550mk_2.png"),
    ],
  },
];

/* const userData: Prisma.UserCreateInput[] = [
  {
    name: "admin",
    email: "Admin@example.com",
    auth0_id: "",
  },
]; */

export async function main() {
  /* for (const u of userData) {
    await prisma.user.create({ data: u });
  } */
  console.log("cleaning DB");
  await prisma.product.deleteMany({});
  await prisma.brand.deleteMany({});
  await prisma.category.deleteMany({});

  const brandPromises = initBrands.map(async (brand) => {
    const imageUrl = await uploadImage(brand.logo);
    return prisma.brand.create({
      data: {
        name: brand.name,
        logo: imageUrl,
      },
    });
  });
  const createdBrands = await Promise.all(brandPromises);
  console.log(`added ${createdBrands.length} brands.`);

  const categoryPromises = initCategories.map(async (category) => {
    const imageUrl = await uploadImage(category.imageUrl);
    return prisma.category.create({
      data: {
        name: category.name,
        slug: category.slug,
        imageUrl: imageUrl,
      },
    });
  });
  const createdCategories = await Promise.all(categoryPromises);
  console.log(`added ${createdCategories.length} categories.`);

  for (const product of initProducts) {
    const brand = createdBrands.find((b) => b.name === product.brandName);
    const category = createdCategories.find(
      (c) => c.name === product.categoryName
    );

    if (!brand || !category) {
      console.warn(
        `Saltando el producto ${product.name}, no se encontró la marca o categoría.`
      );
      continue;
    }

    const uploadedImageUrls = await Promise.all(
      product.images.map((path) => uploadImage(path))
    );

    await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        sku: product.sku,
        slug: product.slug,
        brandId: brand.id,
        categoryId: category.id,
        images: uploadedImageUrls,
      },
    });
    console.log(`Product "${product.name}" create.`);
  }
}

main();
