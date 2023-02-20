import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "./ProductCard";

describe("ProductCard", () => {
  // mock product to use in tests
  const product = {
    id: 1,
    title: "Product 1",
    price: 10,
    description: "Description 1",
    category: "Category 1",
    image: "http://fakestoreapi.com/img/1.jpg",
  }

  // clearing the localStorage before testing
  beforeEach(() => {
    localStorage.clear();
  });
  const isFavorite = false;

  it('renders product card', () => {
    const onFavoriteClick = () => {localStorage.setItem("favorites", JSON.stringify(product.id.toString()))};
    render(<ProductCard
      product={product}
      isFavorite={isFavorite}
      onFavoriteClick={onFavoriteClick}
    />);
    // ui tests
    const titleElement = screen.getByText(product.title);
    const priceElement = screen.getByText(`$${product.price}`);
    const imageElement = screen.getByAltText(product.title);
    const addToFavoritesButton = screen.getByTestId('favorite-button');

    expect(titleElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
    expect(imageElement).toBeInTheDocument();
    expect(addToFavoritesButton).toBeInTheDocument();
  });

  it('adds product to favorites', () => {
    // function that adds productId to localStorage when the button is clicked
    const onFavoriteClick = () => {localStorage.setItem("favorites", JSON.stringify(product.id.toString()))};
    render(<ProductCard
      product={product}
      isFavorite={isFavorite}
      onFavoriteClick={onFavoriteClick}
    />);
    // find the add to favorites button
    const addToFavoritesButton = screen.getByTestId('favorite-button');
    // trigger the button
    fireEvent.click(addToFavoritesButton);
    // get the array from localStorage where the product.id should be in
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    // check if the array from localStorage contains the productId
    expect(favorites).toContain(product.id.toString());
  });
  
  it('removes product from favorites', () => {
    // function that mocks the removal of the productId from localStorage when the button is clicked
    const onFavoriteClick = () => {localStorage.setItem("favorites", JSON.stringify([]))};
    render(<ProductCard
      product={product}
      isFavorite={isFavorite}
      onFavoriteClick={onFavoriteClick}
    />);
    // adding it to localStorage in order to mock that it was already there
    localStorage.setItem('favorites', JSON.stringify([product.id]));

    const addToFavoritesButton = screen.getByTestId('favorite-button');

    fireEvent.click(addToFavoritesButton);

    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    // check to see if the localStorage array is actually empty
    expect(favorites).toEqual([]);
  });
});
