import { Navbar, Nav, Container, Stack, Badge } from "react-bootstrap";
import { MdOutlineShoppingCart } from "react-icons/md";

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

function Header({
  category,
  cartProducts,
  onCategoryChange,
  onShowShoppingCart,
}) {
  const handleClick = (event, value) => {
    event.preventDefault();

    if (onCategoryChange) {
      onCategoryChange(value);
    }
  };

  function handleShowShoppingCart(e) {
    e.preventDefault();

    if (onShowShoppingCart) {
      onShowShoppingCart();
    }
  }

  return (
    <Navbar expand="sm" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand onClick={(e) => handleClick(e, null)}>
          ItSchool Store
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {links.map(({ label, value }) => (
              <Nav.Link
                active={category === value}
                key={value}
                onClick={(e) => handleClick(e, value)}
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
