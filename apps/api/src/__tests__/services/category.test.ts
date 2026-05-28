import { CategoryService } from "../../services";
import { CategoryRepository } from "@workspace/repository";

jest.mock("@workspace/repository", () => ({
  CategoryRepository: jest.fn(),
  Prisma: {},
}));

describe("CategoryService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getCategories", () => {
    it("returns categories from repository", async () => {
      const categories = [{ id: "1", name: "Electronics" }];
      (CategoryRepository as jest.Mock).mockImplementation(() => ({
        findMany: jest.fn().mockResolvedValue(categories),
      }));

      const service = new CategoryService();
      const result = await service.getCategories();

      expect(result).toEqual(categories);
    });
  });

  describe("createCategory", () => {
    it("creates a category via repository", async () => {
      const data = { name: "New Category", logo: "https://example.com/logo.png" };
      const created = { id: "1", ...data };
      (CategoryRepository as jest.Mock).mockImplementation(() => ({
        create: jest.fn().mockResolvedValue(created),
      }));

      const service = new CategoryService();
      const result = await service.createCategory(data);

      expect(result).toEqual(created);
    });
  });
});
