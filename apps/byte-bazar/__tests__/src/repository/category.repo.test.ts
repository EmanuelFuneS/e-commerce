import { CategoryRepository } from "../../../src/repositories/category.repository";

jest.mock("../../../../../packages/database/src/index", () => ({
  prisma: {
    category: {
      findMany: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

import { prisma } from "../../../../../packages/database/src/index";

describe("CategoryRepository", () => {
  let categoryRepo: CategoryRepository;

  beforeAll(async () => {
    categoryRepo = new CategoryRepository();
    jest.clearAllMocks();
  });

  it("should create a new category", async () => {
    const mockCategory = {
      name: "Test Category",
      logo: "https://example.com/logo.png",
    };

    (prisma.category.create as jest.Mock).mockResolvedValue(mockCategory);

    const createdCategory = await categoryRepo.create(mockCategory);

    expect(createdCategory).toEqual(
      expect.objectContaining({
        name: mockCategory.name,
        logo: mockCategory.logo,
      })
    );
  });

  it("should delete a category", async () => {
    const mockCategory = {
      name: "Test Category",
      logo: "https://example.com/logo.png",
    };
    (prisma.category.create as jest.Mock).mockResolvedValue(mockCategory);
    (prisma.category.delete as jest.Mock).mockResolvedValue(mockCategory);

    const createdCategory = await categoryRepo.create(mockCategory);
    await categoryRepo.delete({ id: createdCategory.id });

    const deletedCategory = await categoryRepo.findMany({
      id: createdCategory.id,
    });

    expect(deletedCategory).toEqual(undefined);
  });

  it("should find many categories", async () => {
    const mockCategories = [
      {
        name: "Test Category 1",
        logo: "https://example.com/logo1.png",
      },
      {
        name: "Test Category 2",
        logo: "https://example.com/logo2.png",
      },
    ];

    (prisma.category.create as jest.Mock).mockResolvedValue(mockCategories[0]);
    (prisma.category.findMany as jest.Mock).mockResolvedValue(mockCategories);

    await Promise.all(
      mockCategories.map((category) => categoryRepo.create(category))
    );

    const foundCategories = await categoryRepo.findMany();

    expect(foundCategories).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: mockCategories[0]?.name,
          logo: mockCategories[0]?.logo,
        }),
        expect.objectContaining({
          name: mockCategories[1]?.name,
          logo: mockCategories[1]?.logo,
        }),
      ])
    );
  });
});
