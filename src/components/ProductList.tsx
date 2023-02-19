import { useState, useEffect } from "react";
import { Grid, CircularProgress, Button } from "@material-ui/core";
import ProductCard from "./ProductCard";
import { Product } from "../model/Product";
import useStyles from "../assets/styles";
import { FilterAltOff } from "@mui/icons-material";
import { ProductService } from "../services/ProductService";

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
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">();

  useEffect(() => {
    ProductService.fetchProducts().then((data) => {
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

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const clearSort = () => {
    setSortOrder(undefined);
  }

  /**
   * Sorting function that sorts the displayed products if selected by user
   */
  const sortedProducts = displayedProducts.slice().sort((a, b) => {
    if (sortOrder === "desc") {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  // Rendering the List
  // If the user selects the sorting functionality we are displaying the sorted products
  // and also adding a clear sorting filter button to reset the view
  return (
    <><div className={classes.filterButtonsDiv}>
      <Button variant="contained" onClick={handleSort} className={classes.filterButton}>
        Sort by Price {sortOrder === "asc" ? "(Asc)" : "(Desc)"}
      </Button>
      {sortOrder !== undefined && <Button variant="contained" onClick={clearSort} className={classes.filterButton}>
        <FilterAltOff />
      </Button>}
    </div>
      <Grid container spacing={3} justifyContent="center" className={classes.grid}>
        {(sortOrder !== undefined ? sortedProducts : displayedProducts).map((product) => (
          <ProductCard
            data-testid="product-card"
            key={product.id}
            product={product}
            isFavorite={favoriteIds.includes(product.id.toString())}
            onFavoriteClick={handleFavoriteClick} />
        ))}
      </Grid>
    </>
  );
};

export default ProductList;