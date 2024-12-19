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
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import Loading from "./Loading";
import { CartContext } from "../contexts/CartContext";
import { ModeContext } from "../contexts/ModeContext";

import { initailizeProducts, toggleLoading } from "../redux/store";

const allProductsUrl = "https://fakestoreapi.com/products";
const categoryUrl = "https://fakestoreapi.com/products/category";

function Products() {
  const { category } = useParams();
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.products);
  const { soldOutItems } = useSelector((state) => state.soldout);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [productId, setProductId] = useState(null);
  const { addToCart, checkCartAndRemove } = useContext(CartContext);
  const { mode } = useContext(ModeContext);
  const timeoutId = useRef();

  async function loadProducts() {
    dispatch(toggleLoading());

    const url = !category ? allProductsUrl : `${categoryUrl}/${category}`;
    const response = await fetch(url);
    const serverProducts = await response.json();

    dispatch(toggleLoading());
    dispatch(initailizeProducts(serverProducts));
  }

  function handleClose() {
    setShowConfirmation(false);
  }

  function handleConfirm() {
    const productsWithoutDeletedOne = list.filter(
      (product) => product.id !== productId
    );

    dispatch(initailizeProducts(productsWithoutDeletedOne));

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

  function handleAddToCart(e, product) {
    e.preventDefault();

    addToCart(product);
  }

  function handleDeleteItem(e, productId) {
    e.preventDefault();

    setShowConfirmation(true);
    setProductId(productId);
  }

  if (loading) {
    return (
      <Container fluid className="d-flex  align-items-center w-100 h-100 ">
        <Loading message="The products are loading. Please wait!" />
      </Container>
    );
  }

  if (!list) {
    return null;
  }

  return (
    <Container className="py-5">
      <Row className="g-4">
        {list.map(({ id, title, image, price }) => (
          <Col xs={12} sm={6} md={4} lg={3} key={id}>
            <Card
              data-bs-theme={mode}
              className={`h-100 d-flex flex-column ${
                soldOutItems.includes(id) ? "opacity-50" : undefined
              }`}
            >
              <Stack className="w-75 justify-content-center align-items-center pt-4 my-0 mx-auto">
                <Image className="w-50 h-100 object-fit-fill" src={image} />
              </Stack>

              <Card.Body className="d-flex flex-column mt-3">
                <Card.Title className="mt-auto fs-6">{title}</Card.Title>
                <Card.Text className="fs-5">${price}</Card.Text>
                <Stack
                  className="justify-content-between mt-3"
                  direction="horizontal"
                >
                  <Button
                    variant={
                      mode === "light" ? "outline-dark" : "outline-light"
                    }
                    disabled={soldOutItems.includes(id)}
                    onClick={(e) =>
                      handleAddToCart(e, { id, title, image, price })
                    }
                  >
                    Add to cart
                  </Button>
                  <Button
                    disabled={soldOutItems.includes(id)}
                    variant="outline-danger"
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
