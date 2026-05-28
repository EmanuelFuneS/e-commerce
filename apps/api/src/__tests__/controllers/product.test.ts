import controllers from "../../controller/product.controller";
import { ProductService } from "../../services";

jest.mock("../../services", () => ({
  ProductService: jest.fn(),
}));

function mockReply() {
  return {
    send: jest.fn().mockReturnThis(),
    status: jest.fn().mockReturnThis(),
  };
}

describe("ProductController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getProducts", () => {
    it("returns products list", async () => {
      const products = [{ id: "1", name: "Test" }];
      (ProductService as jest.Mock).mockImplementation(() => ({
        getProducts: jest.fn().mockResolvedValue(products),
      }));

      const reply = mockReply();
      await controllers.getProducts({} as any, reply as any);

      expect(reply.send).toHaveBeenCalledWith(products);
    });
  });
});
