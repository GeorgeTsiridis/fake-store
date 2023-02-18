export const fetchProducts = () => {
    return fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .catch((error) => console.log(error));
  };
  