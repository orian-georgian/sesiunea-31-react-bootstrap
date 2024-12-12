import { Container, Card, Button, Stack, Image } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

const allProductsUrl = "https://fakestoreapi.com/products";
const categoryUrl = "https://fakestoreapi.com/products/category";

function Products({ onAddToCart, onCheckAndRemove }) {
  const { category } = useParams();
  const [products, setProducts] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [productId, setProductId] = useState(null);
  const timeoutId = useRef();

  async function loadProducts() {
    timeoutId.current = setTimeout(() => {
      console.log("Message after 3 sec!");
    }, 3000);
    const url = !category ? allProductsUrl : `${categoryUrl}/${category}`;
    const response = await fetch(url);
    const serverProducts = await response.json();

    setProducts(serverProducts);
  }

  function handleClose() {
    setShowConfirmation(false);
  }

  function handleConfirm() {
    const productsWithoutDeletedOne = products.filter(
      (product) => product.id !== productId
    );

    setProducts(productsWithoutDeletedOne);

    if (onCheckAndRemove) {
      onCheckAndRemove(productId);
    }

    setShowConfirmation(false);
    setProductId(null);
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

  function handleDeleteItem(e, productId) {
    e.preventDefault();

    setShowConfirmation(true);
    setProductId(productId);
  }

  return (
    <Container className="py-5">
      <Stack
        className="flex-wrap justify-content-center align-items-center"
        direction="horizontal"
        gap={3}
      >
        {products.map(({ id, title, image, price }) => (
          <Card className="w-25" key={id}>
            <Stack className="justify-content-center align-items-center">
              <Image className="w-50" src={image} />
            </Stack>

            <Card.Body>
              <Card.Title>{title}</Card.Title>
              <Card.Text>{price}</Card.Text>
              <Button
                variant="primary"
                onClick={(e) => handleAddToCart(e, { id, title, image, price })}
              >
                Add to cart
              </Button>
              <Button variant="danger" onClick={(e) => handleDeleteItem(e, id)}>
                Delete
              </Button>
            </Card.Body>
          </Card>
        ))}
      </Stack>
      <DeleteConfirmationModal
        show={showConfirmation}
        title="Remove Product Confirmation"
        yesButton="Yes"
        noButton="No"
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
    </Container>
  );
}

export default Products;
