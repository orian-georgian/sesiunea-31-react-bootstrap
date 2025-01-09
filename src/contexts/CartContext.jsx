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

  function clearCart() {
    setCartProducts([]);
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
        clearCart,
        checkCartAndRemove,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
