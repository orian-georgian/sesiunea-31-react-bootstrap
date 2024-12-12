import { Container } from "react-bootstrap";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [cartProducts, setCartProducts] = useState([]);
  const [show, setShow] = useState(false);

  function showShoppingCart() {
    setShow(true);
  }

  function hideShoppingCart() {
    setShow(false);
  }

  function addToCart(product) {
    setCartProducts([...cartProducts, product]);
  }

  function checkCartAndRemove(productId) {
    const isAvailabe = !!cartProducts.find(
      (product) => product.id === productId
    );

    if (isAvailabe) {
      const cartWithoutDeletedProduct = cartProducts.filter(
        (product) => product.id !== productId
      );

      setCartProducts(cartWithoutDeletedProduct);
    }
  }

  return (
    <BrowserRouter>
      <Container className="p-0" fluid>
        <Routes>
          <Route
            path="/:category?"
            element={
              <ProtectedRoute>
                <Header
                  cartProducts={cartProducts.length}
                  onShowShoppingCart={showShoppingCart}
                />
                <ShoppingCart
                  products={cartProducts}
                  show={show}
                  onClose={hideShoppingCart}
                />
                <Products
                  onAddToCart={addToCart}
                  onCheckAndRemove={checkCartAndRemove}
                />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="/contact" element={<h1>This is my contact page</h1>} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
