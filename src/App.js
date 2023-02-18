import './App.css';
import React from "react";
import ProductList from './components/ProductList';
import TopBar from './components/AppBar';
import useStyles from './styles';

function App() {
  const classes = useStyles();
  
  return (
    <div className="App">
      <TopBar />
      <div className={classes.root}>
        <ProductList />
      </div>
    </div>
  );
}

export default App;
