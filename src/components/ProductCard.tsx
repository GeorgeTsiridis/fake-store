import {
    Card, CardContent,
    CardMedia,
    Typography,
    Button,
    Grid
} from '@material-ui/core';
import { Product } from '../model/Product';
import FavoriteIcon from "@material-ui/icons/Favorite";
import useStyles from '../assets/styles';


interface ProductCardProps {
    isFavorite: boolean;
    product: Product;
    onFavoriteClick: (product: Product) => void;
    'data-testid'?: string;
}

function ProductCard({ product, isFavorite, onFavoriteClick, 'data-testid': dataTestId }: ProductCardProps) {
    const classes = useStyles();

    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <div data-testid={dataTestId}>
                <Card className={classes.card}>
                    <CardContent>
                        <CardMedia
                            component="img"
                            height="300"
                            image={product.image}
                            alt={product.title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2" className={classes.productTitle}>
                                {product.title}
                            </Typography>
                            <Typography variant="h6" component="p">
                                ${product.price}
                            </Typography>
                        </CardContent>
                        <Button
                            startIcon={<FavoriteIcon color={isFavorite ? "secondary" : "inherit"} />}
                            onClick={() => onFavoriteClick(product)}
                            data-testid="favorite-button">
                            {isFavorite ? "Remove from favorites" : "Add to favorites"}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </Grid>
    );
}

export default ProductCard;
