import { useState, useEffect } from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import ProductCard from "./ProductCard";
import { fetchProducts } from "../services/ProductService";
import { Product } from "../model/Product";
import useStyles from "../assets/styles";

type ProductListProps = {
  showOnlyFavorites: boolean;
};

function ProductList({ showOnlyFavorites }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [favoriteIds, setFavoriteIds] = useState<string[]>(
    JSON.parse(localStorage.getItem("favorites") || "[]")
  );
  const classes = useStyles();

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false)
    });
  }, []);

  if (loading) {
    return <CircularProgress />;
  } 

  /**
   * Used to add the id of the product to localStorage for filtering the list
   * @param product the product to add or remove from favorites
   */
  const handleFavoriteClick = (product: Product) => {
    const favorites = favoriteIds.includes(product.id.toString())
      ? favoriteIds.filter((id) => id !== product.id.toString())
      : [...favoriteIds, product.id.toString()];
    setFavoriteIds(favorites);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  /**
   * if the showOnlyFavorites prop is set to true we are filtering the products with ids from localStorage
   * otherwise we are showing all the products from the API
   */
  const displayedProducts = showOnlyFavorites
    ? products.filter((product) => favoriteIds.includes(product.id.toString()))
    : products;


  return (
    <Grid container spacing={3} justifyContent="center" className={classes.grid}>
      {displayedProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isFavorite={favoriteIds.includes(product.id.toString())}
          onFavoriteClick={handleFavoriteClick}
        />
      ))}
    </Grid>
  );
};

export default ProductList;