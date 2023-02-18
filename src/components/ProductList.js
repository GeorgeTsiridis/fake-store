import '../App.css';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Grid, Typography, CardActionArea, CardActions, Button } from "@material-ui/core";
import { fetchProducts } from "../services/productService";
import useStyles from '../styles';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    fetchProducts().then((data) => setProducts(data));
  }, []);

  /**
   * Used every time that user adds or removes product to/from favorites
   * @param product the product that is being toggled 
   */
  const toggleFavorite = (product) => {
    const index = favorites.findIndex((p) => p.id === product.id);
    if (index === -1) {
      // Add to favorites
      setFavorites([...favorites, product]);
    } else {
      // Remove from favorites
      setFavorites([...favorites.slice(0, index), ...favorites.slice(index + 1)]);
    }
  };

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(savedFavorites);
  }, []);

  return (
    <>
      <Grid container spacing={2} justifyContent="center" className={classes.grid}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3} height="100">
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="250"
                  image={product.image}
                  alt={product.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2" className={classes.productTitle}>
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" className={classes.productDescription}>
                    {product.description}
                  </Typography>
                  <Typography variant="h6" component="p">
                    ${product.price}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={() => toggleFavorite(product)}>
                  {favorites.some((p) => p.id === product.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      {favorites.length > 0 && (
        <div>
          <h2>Favorites</h2>
          <ul>
            {favorites.map((product) => (
              <li key={product.id}>{product.title}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default ProductList;
