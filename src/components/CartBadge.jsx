import { Stack, Badge } from "react-bootstrap";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useContext } from "react";

import { useCart } from "../hooks/useCart";
import { useMode } from "../hooks/useMode";

import ShoppingCart from "./ShoppingCart";

function CartBadge() {
  const { cartProducts, clearCart, show, toggleShow } = useCart();
  const { mode } = useMode();

  function handleShowShoppingCart(e) {
    e.preventDefault();

    toggleShow();
  }

  function handleHideShoppingCart() {
    toggleShow();
  }

  return (
    <>
      <Stack
        className={`ms-auto ${
          mode === "light" ? "text-dark" : "text-white"
        } flex-row align-items-center position-relative flex-grow-0 clickable`}
        onClick={handleShowShoppingCart}
      >
        <Badge className="position-absolute top-0 start-100 translate-middle ">
          {cartProducts.length}
        </Badge>
        <MdOutlineShoppingCart size={24} />
      </Stack>
      <ShoppingCart
        products={cartProducts}
        show={show}
        onClose={handleHideShoppingCart}
        onClearCart={clearCart}
      />
    </>
  );
}

export default CartBadge;
