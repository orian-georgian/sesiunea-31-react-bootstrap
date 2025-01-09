import { CartContext } from "../contexts/CartContext";
import { useContext } from "react";

export const useCart = () => {
  const cartContext = useContext(CartContext);

  return cartContext;
};
