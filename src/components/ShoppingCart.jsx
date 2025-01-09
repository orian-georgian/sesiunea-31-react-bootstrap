import { Offcanvas, Stack, Image, Badge } from "react-bootstrap";

import { useMode } from "../hooks/useMode";

function ShoppingCart({ show, products, onClose }) {
  const { mode } = useMode();

  function handleClose() {
    if (onClose) {
      onClose();
    }
  }

  return (
    <Offcanvas data-bs-theme={mode} show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {products.map(({ id, price, image, title }) => (
          <Stack direction="horizontal" gap={3} key={id}>
            <Image thumbnail src={image} className="w-25" />
            <p className="w-50">{title}</p>
            <Badge>${price}</Badge>
          </Stack>
        ))}
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default ShoppingCart;
