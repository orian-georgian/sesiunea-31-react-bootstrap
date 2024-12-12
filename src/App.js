import { Container } from "react-bootstrap";
import { useState } from "react";

import Header from "./components/Header";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";


function App() {
  const [category, setCategory] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const [show, setShow] = useState(false);

  function showShoppingCart() {
    setShow(true);
  }

  function hideShoppingCart() {
    setShow(false);
  }

  function changeCategory(newCategory) {
    setCategory(newCategory);
  }

  function addToCart(product) {
    setCartProducts([...cartProducts, product]);
  }

  return (
    <Container className="p-0" fluid>
      <Header
        category={category}
        cartProducts={cartProducts.length}
        onCategoryChange={changeCategory}
        onShowShoppingCart={showShoppingCart}
      />
      <Products category={category} onAddToCart={addToCart} />
      <ShoppingCart
        products={cartProducts}
        show={show}
        onClose={hideShoppingCart}
      />
    </Container>
  );
}

export default App;
