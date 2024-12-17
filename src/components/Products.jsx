import {
  Container,
  Card,
  Button,
  Row,
  Col,
  Image,
  Stack,
} from "react-bootstrap";
import { useState, useEffect, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { CartContext } from "../contexts/CartContext";
import { ModeContext } from "../contexts/ModeContext";

const allProductsUrl = "https://fakestoreapi.com/products";
const categoryUrl = "https://fakestoreapi.com/products/category";

function Products() {
  const { category } = useParams();
  const [products, setProducts] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [productId, setProductId] = useState(null);
  const { addToCart, checkCartAndRemove } = useContext(CartContext);
  const { mode } = useContext(ModeContext);
  const timeoutId = useRef();

  async function loadProducts() {
    /*     timeoutId.current = setTimeout(() => {
      console.log("Message after 3 sec!");
    }, 3000); */
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

    checkCartAndRemove(productId);

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

    addToCart(product);
  }

  function handleDeleteItem(e, productId) {
    e.preventDefault();

    setShowConfirmation(true);
    setProductId(productId);
  }

  return (
    <Container className="py-5">
      <Row className="g-4">
        {products.map(({ id, title, image, price }) => (
          <Col xs={12} sm={6} md={4} lg={3} key={id}>
            <Card data-bs-theme={mode} className="h-100 d-flex flex-column">
              <Stack className="justify-content-center align-items-center">
                <Image className="w-50" src={image} />
              </Stack>

              <Card.Body className="d-flex flex-column">
                <Card.Title>{title}</Card.Title>
                <Card.Text>{price}</Card.Text>
                <Stack
                  className="mt-auto justify-content-between"
                  direction="horizontal"
                >
                  <Button
                    variant="primary"
                    onClick={(e) =>
                      handleAddToCart(e, { id, title, image, price })
                    }
                  >
                    Add to cart
                  </Button>
                  <Button
                    variant="danger"
                    onClick={(e) => handleDeleteItem(e, id)}
                  >
                    Delete
                  </Button>
                </Stack>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
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
