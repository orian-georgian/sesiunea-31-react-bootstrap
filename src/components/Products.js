import { Container, Card, Button, Stack, Image } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";

const allProductsUrl = "https://fakestoreapi.com/products";
const categoryUrl = "https://fakestoreapi.com/products/category";

function Products({ category, onAddToCart }) {
  const [products, setProducts] = useState(null);
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

  return (
    <Container className="">
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
            </Card.Body>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}

export default Products;
