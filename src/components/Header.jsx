import { Navbar, Nav, Container, Stack, Badge } from "react-bootstrap";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";

const links = [
  {
    value: "electronics",
    label: "Electronics",
  },
  {
    value: "jewelery",
    label: "Jewelery",
  },
  {
    value: "men's clothing",
    label: "Men's clothing",
  },
  {
    value: "women's clothing",
    label: "Women's clothing",
  },
];

function Header({ cartProducts, onShowShoppingCart }) {
  const { category } = useParams();
  const navigate = useNavigate();

  console.log("category ", category);

  function handleGoHome(e) {
    e.preventDefault();

    navigate("/");
  }

  function handleShowShoppingCart(e) {
    e.preventDefault();

    if (onShowShoppingCart) {
      onShowShoppingCart();
    }
  }

  return (
    <Navbar
      className=""
      sticky="top"
      expand="sm"
      bg="dark"
      data-bs-theme="dark"
    >
      <Container>
        <Navbar.Brand className="clickable" onClick={handleGoHome}>
          ItSchool Store
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {links.map(({ label, value }) => (
              <Nav.Link
                href={`/${value}`}
                active={category === value}
                key={value}
              >
                {label}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
        <Stack
          className="ms-auto text-white flex-row align-items-center position-relative flex-grow-0"
          onClick={handleShowShoppingCart}
        >
          <Badge className="position-absolute top-0 start-100 translate-middle ">
            {cartProducts}
          </Badge>
          <MdOutlineShoppingCart size={24} />
        </Stack>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Container>
    </Navbar>
  );
}

export default Header;
