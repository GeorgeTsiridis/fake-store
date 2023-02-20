import { Product } from "../model/Product";
import { ProductService } from "./ProductService";

describe("ProductService", () => {
  describe("getProducts", () => {
    it("should return an array of products", async () => {
      const products: Product[] = await ProductService.fetchProducts();
      expect(products).toBeInstanceOf(Array);
      expect(products.length).toBeGreaterThan(0);
    });

    it("should return products with the expected properties", async () => {
      const products: Product[] = await ProductService.fetchProducts();
      const firstProduct = products[0];
      expect(firstProduct).toHaveProperty("id");
      expect(firstProduct).toHaveProperty("title");
      expect(firstProduct).toHaveProperty("description");
      expect(firstProduct).toHaveProperty("price");
      expect(firstProduct).toHaveProperty("image");
    });
  });
});
