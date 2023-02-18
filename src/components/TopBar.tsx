import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Store } from '@material-ui/icons';

interface TopBarProps {
  showOnlyFavorites: boolean;
  onToggleShowOnlyFavorites: (value: boolean) => void;
}

export default function TopBar({ showOnlyFavorites, onToggleShowOnlyFavorites }: TopBarProps) {
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Store/>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
             Fake Store
          </Typography>
          <Button variant="contained" color="primary" onClick={() => onToggleShowOnlyFavorites(!showOnlyFavorites)}>
            {showOnlyFavorites ? "Show All Products" : "Show Favorite Products"}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}