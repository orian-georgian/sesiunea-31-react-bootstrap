import { Container, Card, Button, Stack, Image } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import ConfirmationModal from "./Modal_Conf";

const allProductsUrl = "https://fakestoreapi.com/products";
const categoryUrl = "https://fakestoreapi.com/products/category";

function Products({ category, onAddToCart }) {
  const [products, setProducts] = useState(null);
  const timeoutId = useRef();
  const [showModal, setShowModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  async function loadProducts() {
    timeoutId.current = setTimeout(() => {
      console.log("Message after 3 sec!");
    }, 3000);
    const url = !category ? allProductsUrl : `${categoryUrl}/${category}`;
    const response = await fetch(url);
    const serverProducts = await response.json();

    setProducts(serverProducts);
  }

  useEffect(() => {
    loadProducts();

    return () => {
      clearTimeout(timeoutId.current);
    };
  }, [category]);

  if (!products) {
    return null;
  }

  function handleAddToCart(e, product) {
    e.preventDefault();

    if (onAddToCart) {
      onAddToCart(product);
    }
  }

  function handleDeleteClick(productId) {
    setProductToDelete(productId);
    setShowModal(true);
  }

  function handleConfirmDelete(productId) {
    setProducts((prevProducts) =>
      prevProducts.filter((p) => p.id !== productId)
    );
    setShowModal(false);
  }

  return (
    <Container className="">
      <Stack
        className="flex-wrap justify-content-center align-items-center"
        direction="horizontal"
        gap={3}
      >
        {products.map(({ id, title, image, price }) => (
          <Card className="w-25 custom-card" key={id}>
            <Stack className="justify-content-center align-items-center">
              <Image className="w-50 card-image" src={image} />
            </Stack>

            <Card.Body className="d-flex flex-column">
              <Card.Title className="card-title">{title}</Card.Title>
              <Card.Text className="card-price">{price}</Card.Text>
              <Stack className="card-buttons" direction="horizontal" gap={4}>
                <Button
                  className="button"
                  variant="primary"
                  onClick={(e) =>
                    handleAddToCart(e, { id, title, image, price })
                  }
                >
                  Add to cart
                </Button>
                <Button
                  className="button"
                  variant="danger"
                  onClick={() => handleDeleteClick(id)}
                >
                  Delete Card
                </Button>
              </Stack>
            </Card.Body>
          </Card>
        ))}
      </Stack>

      <ConfirmationModal
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
        onConfirm={() => {
          handleConfirmDelete(productToDelete);
          setShowModal(false);
        }}
        title="Remove Card Confirmation"
        yesButtonText="Yes"
        noButtonText="No"
        cardId={productToDelete}
      />
    </Container>
  );
}

export default Products;
