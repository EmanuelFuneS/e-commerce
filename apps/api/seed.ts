import { prisma } from "@workspace/database";

async function main() {
  console.log("Seeding database for manual testing...");

  const existingBrands = await prisma.brand.findMany();
  if (existingBrands.length > 0) {
    console.log(`Database already has ${existingBrands.length} brands, skipping seed`);
    return;
  }

  const brand = await prisma.brand.create({
    data: { name: "TestBrand", logo: "https://example.com/logo.png", website: "https://example.com" },
  });
  console.log("Brand created:", brand.id);

  const category = await prisma.category.create({
    data: { name: "TestCategory" },
  });
  console.log("Category created:", category.id);

  const product = await prisma.product.create({
    data: {
      name: "Test Product",
      description: "A test product for manual testing",
      price: 99.99,
      stock: 50,
      sku: "TEST-SKU-001",
      slug: "test-product",
      tags: ["test", "demo"],
      brandId: brand.id,
      categoryId: category.id,
      images: [],
      isActive: true,
      views: 0,
    },
  });
  console.log("Product created:", product.id);

  console.log("Seed completed!");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
