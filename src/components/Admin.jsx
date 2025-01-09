import {
  Container,
  Row,
  Col,
  Table,
  Image,
  Badge,
  Button,
} from "react-bootstrap";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { toggleLoading, initailizeProducts, addItem } from "../redux/store";

import { useMode } from "../hooks/useMode";

function Admin() {
  const dispatch = useDispatch();
  const { mode } = useMode();
  const { list, loading } = useSelector((state) => state.products);
  const { soldOutItems } = useSelector((state) => state.soldout);

  async function loadProducts() {
    dispatch(toggleLoading());

    const response = await fetch("https://fakestoreapi.com/products");
    const serverProducts = await response.json();

    dispatch(toggleLoading());
    dispatch(initailizeProducts(serverProducts));
  }

  function handleMarkAsOutOfStock(e, productId) {
    e.preventDefault();
    const outOfStockItems =
      JSON.parse(localStorage.getItem("outOfStockItems")) ?? [];
    const newOutOfStockItems = [...outOfStockItems, productId];

    dispatch(addItem(productId));

    localStorage.setItem("outOfStockItems", JSON.stringify(newOutOfStockItems));
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Container className="pt-5">
      <Row>
        <Col>
          <Table variant={mode} striped bordered hover size="md">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Rate</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {list.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>
                    <Image className="max-w-50" src={item.image} thumbnail />
                  </td>
                  <td>{item.title}</td>
                  <td>
                    <Badge color="primary" pill>
                      ${item.price}
                    </Badge>
                  </td>
                  <td>
                    {item.rating.rate}/{item.rating.count}
                  </td>
                  <td>
                    <Button
                      variant={
                        mode === "light" ? "outline-dark" : "outline-light"
                      }
                      disabled={soldOutItems.includes(item.id)}
                      onClick={(e) => handleMarkAsOutOfStock(e, item.id)}
                    >
                      Mark as out of stock
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default Admin;
