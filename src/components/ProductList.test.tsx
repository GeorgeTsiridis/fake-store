import { render, waitFor } from "@testing-library/react";
import ProductList from "./ProductList";


describe("ProductList", () => {
  it("should show all products by default", async () => {
    const { getAllByTestId } = render(<ProductList showOnlyFavorites={false} />);

    // wait for the products to load
    await waitFor(() => getAllByTestId("product-card"));

    const productCards = getAllByTestId("product-card");
    // check if there are any rendered cards
    expect(productCards.length).toBeGreaterThan(0);
  });
});
