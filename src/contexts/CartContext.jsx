import React, { createContext, useState } from "react";

export const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);
  const [show, setShow] = useState(false);

  function toggleShow() {
    setShow((prevState) => !prevState);
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
    <CartContext.Provider
      value={{
        cartProducts,
        show,
        setCartProducts,
        toggleShow,
        addToCart,
        checkCartAndRemove,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
