import { Offcanvas, Stack, Image, Badge, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useMode } from "../hooks/useMode";

function ShoppingCart({ show, products, onClose, onClearCart }) {
  const { mode } = useMode();
  const navigate = useNavigate();

  const sum = products.reduce((sum, product) => (sum += product.price), 0);

  const groupedProducts = products.reduce((acc, product) => {
    const existingProduct = acc.find((pr) => pr.id === product.id);
    if (existingProduct) {
      const index = acc.findIndex((pr) => pr.id === product.id);
      acc[index] = { ...acc[index], count: acc[index].count + 1 };
    } else {
      acc.push({ ...product, count: 1 });
    }
    return acc;
  }, []);

  function handleClose() {
    if (onClose) {
      onClose();
    }
  }

  function handleCheckout() {
    navigate("/checkout");
    onClose?.();
    onClearCart?.();
  }

  return (
    <Offcanvas data-bs-theme={mode} show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack>
          {groupedProducts.map(({ id, price, image, title, count }) => (
            <Stack direction="horizontal" gap={3} key={id}>
              <Image thumbnail src={image} className="w-25" />
              <p className="w-50">{title}</p>
              <Badge>
                {count} x ${price}
              </Badge>
            </Stack>
          ))}
          <Stack direction="horizontal" gap={3}>
            <h2>Total</h2>
            <h2 className="ms-auto">{sum}</h2>
          </Stack>
          <Button size="md" onClick={handleCheckout}>
            Checkout
          </Button>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default ShoppingCart;
