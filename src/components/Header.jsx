import { Navbar, Nav, Container } from "react-bootstrap";
import { MdLogout } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import CartBadge from "./CartBadge";
import ModeActions from "./ModeActions";

import { useContext } from "react";

import { ModeContext } from "../contexts/ModeContext";

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

function Header() {
  const { category } = useParams();
  const navigate = useNavigate();
  const { mode } = useContext(ModeContext);

  function handleGoHome(e) {
    e.preventDefault();

    navigate("/");
  }

  function handleLogout(e) {
    e.preventDefault();

    navigate("/login");
    localStorage.removeItem("token");
  }

  return (
    <Navbar
      className="border-bottom"
      sticky="top"
      expand="sm"
      bg={mode}
      data-bs-theme={mode}
    >
      <Container className="py-2">
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
            <Nav.Link href="/admin">Admin</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <ModeActions />
        <CartBadge />
        <MdLogout
          className={`ms-3 ${
            mode === "light" ? "text-dark" : "text-light"
          } clickable`}
          size={24}
          onClick={handleLogout}
        />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Container>
    </Navbar>
  );
}

export default Header;
