import { Brand, prisma } from "../../../../../packages/database/src/index";
import { BrandRepository } from "../../../src/repositories/brand.repository";

jest.mock("../../../../../packages/database/src/index", () => ({
  prisma: {
    brand: {
      findMany: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
    },
  },
}));
const mockBrands: Partial<Brand[]> = [
  {
    id: "x1",
    name: "Test Brand",
    logo: "https://example.com/logo.png",
    tenantId: "tenant_123",
    website: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "x2",
    name: "Test Brand 2",
    logo: "https://example.com/logo.png",
    tenantId: "tenant_123",
    website: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

describe("BrandRepository", () => {
  let brandRepo: BrandRepository;
  beforeEach(async () => {
    brandRepo = new BrandRepository();
    jest.clearAllMocks();
  });

  it("should create a new brand", async () => {
    let mockBrand = mockBrands[0];
    (prisma.brand.create as jest.Mock).mockResolvedValue(mockBrand);
    let createBrand;
    if (mockBrand) {
      createBrand = await brandRepo.create(mockBrand);
    }
    expect(createBrand).toEqual(
      expect.objectContaining({
        name: mockBrand?.name,
        logo: mockBrand?.logo,
      })
    );
  });

  it("should delete a brand", async () => {
    let mockBrand = mockBrands[0];
    (prisma.brand.delete as jest.Mock).mockResolvedValue(mockBrand);

    await brandRepo.delete({ id: mockBrand?.id });
    const deleteCategory = await brandRepo.findMany({
      id: mockBrand?.id,
    });

    expect(deleteCategory).toEqual(undefined);
  });

  it("should find many brands", async () => {
    (prisma.brand.findMany as jest.Mock).mockResolvedValue(mockBrands);

    const findManyBrands = await brandRepo.findMany();

    expect(findManyBrands).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: mockBrands[0]?.name,
          logo: mockBrands[0]?.logo,
        }),
      ])
    );
  });

  it("should update a brand", async () => {
    let mockBrand = mockBrands[0];
    let mockUpdateBrand = {
      ...mockBrands[1],
      id: mockBrand?.id,
    };
    (prisma.brand.update as jest.Mock).mockResolvedValue(mockUpdateBrand);

    const updateBrand = await brandRepo.update(
      { id: mockBrand?.id },
      { name: mockBrand?.name, logo: mockBrand?.logo }
    );

    expect(updateBrand).toEqual(
      expect.objectContaining({
        name: mockUpdateBrand?.name,
        logo: mockUpdateBrand?.logo,
      })
    );
  });
});
