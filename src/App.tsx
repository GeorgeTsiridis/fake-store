import './App.css';
import ProductList from './components/ProductList';
import TopBar from './components/TopBar';
import useStyles from './assets/styles';
import { useState } from 'react';

function App() {
  const classes = useStyles();
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  /**
   * Used to trigger the boolean value that changes the view between favorites in ProductList
   * @param value the boolean value to change
   */
  const handleToggleShowOnlyFavorites = (value: boolean) => {
    setShowOnlyFavorites(value);
  };

  return (
    <div className="App">
      <TopBar showOnlyFavorites={showOnlyFavorites}
        onToggleShowOnlyFavorites={handleToggleShowOnlyFavorites} />
      <div className={classes.root}>
        <ProductList showOnlyFavorites={showOnlyFavorites} />
      </div>
    </div>
  );
} 

export default App;
