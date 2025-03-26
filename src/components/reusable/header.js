import React, { useState } from "react";
import {
  Col,
  Nav,
  Navbar,
  Row,
  Form,
  Dropdown,
  ListGroup,
  Container,
} from "react-bootstrap";

import {
  BsCartCheckFill,
  BsFillPersonFill,
  BsChevronDown,
} from "react-icons/bs";
import ProfileDropDown from "../reusable/logout.js";
import { Link, useNavigate } from "react-router-dom";

function Header({
  cartCount = 0,
  onSearch = () => {},
  onFilterChange = () => {},
  categories = [],
  selectedCategory = "All",
}) {
  const [show, setShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleCategoryChange = (catId) => {
    onFilterChange({ category: catId });
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <div
      className="position-fixed top-0"
      style={{ zIndex: 1050, width: "100%", right: "0" }}
    >
      <Row>
        <div style={{ backgroundColor: "black" }}>
          <h3
            style={{
              fontFamily: "time new roman",
              fontSize: 20,
              color: "white",
              textAlign: "center",
            }}
          >
            Sony
          </h3>
        </div>

        <Navbar expand="lg" className="header">
          <Container fluid>
            <Row className="w-100 align-items-center">
              <Col md={3} className="d-flex align-items-center">
                <Navbar.Brand href="/">
                  <img
                    className="logo-home"
                    src={`${process.env.PUBLIC_URL}/images/logo.png`}
                    alt="Logo"
                  />
                </Navbar.Brand>
                <Nav className="me-auto ms-3">
                  <Nav.Link
                    className="Nav-link"
                    onClick={() => navigate("/help")}
                  >
                    Help
                  </Nav.Link>
                  <Nav.Link className="Nav-link" href="contact">
                    Contact
                  </Nav.Link>
                </Nav>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
              </Col>

              <Col md={6} className="search-col">
                <div className="main-search-container">
                  <Form.Control
                    type="search"
                    placeholder="Search for products, brands and more..."
                    className="main-search-input"
                    aria-label="Search"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>
              </Col>

              <Col md={3} className="d-flex justify-content-end">
                <div className="header-actions">
                  <Dropdown className="category-dropdown">
                    <Dropdown.Toggle variant="light" id="dropdown-category">
                      {selectedCategory === "All"
                        ? "Categories"
                        : categories.find((c) => c.id === selectedCategory)
                            ?.name || "Category"}
                      <BsChevronDown size={12} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <ListGroup>
                        <ListGroup.Item
                          action
                          active={selectedCategory === "All"}
                          onClick={() => handleCategoryChange("All")}
                        >
                          All Categories
                        </ListGroup.Item>
                        {Array.isArray(categories) &&
                          categories.map((ca) => (
                            <ListGroup.Item
                              key={ca?.id || Math.random()}
                              action
                              active={selectedCategory === ca?.id}
                              onClick={() => handleCategoryChange(ca?.id)}
                            >
                              {ca?.name || "Unnamed Category"}
                            </ListGroup.Item>
                          ))}
                      </ListGroup>
                    </Dropdown.Menu>
                  </Dropdown>

                  <BsFillPersonFill
                    className="header-icon"
                    size={25}
                    onClick={() => setShow(!show)}
                  />
                  <div className="cart-container">
                    <Link to="/cart">
                      <BsCartCheckFill className="header-icon" size={25} />
                    </Link>
                    <span className="cart-badge" id="lblCartCount">
                      {cartCount}
                    </span>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </Navbar>
      </Row>
      {show && <ProfileDropDown />}
    </div>
  );
}

export default Header;
