import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import {
  GetHighlightedProducts,
  GetRegularProducts,
  GetCategory,
} from "../service/apiproduct";
import { BiSolidCartAdd, BiSolidShow, BiSolidStarHalf } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import "../css/newProduct.css";

const Product = ({ addToCart, searchKey = "", selectedCategory = "All" }) => {
  const navigate = useNavigate();
  const [highlightedProducts, setHighlightedProducts] = useState([]);
  const [regularProducts, setRegularProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [maxPrice, setMaxPrice] = useState(100000000);
  const [selectedStatus, setSelectedStatus] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      const [highlighted, regular, categoryData] = await Promise.all([
        GetHighlightedProducts(),
        GetRegularProducts(),
        GetCategory(),
      ]);
      setHighlightedProducts(highlighted || []);
      setRegularProducts(regular || []);
      setCategories(categoryData || []);
    };
    fetchData();
  }, []);

  const filterProducts = (products) => {
    if (!products) return [];
    return products.filter((prod) => {
      const matchesCategory =
        selectedCategory === "All" || prod.catId == selectedCategory;
      const matchesStatus =
        selectedStatus === "All" ||
        (selectedStatus === "Instock" && prod.status) ||
        (selectedStatus === "Outstock" && !prod.status);
      const matchesPrice = prod.price <= maxPrice;
      const matchesSearch = prod.name
        ?.toLowerCase()
        ?.includes(searchKey.toLowerCase());
      return matchesCategory && matchesStatus && matchesPrice && matchesSearch;
    });
  };

  const filteredHighlightedProducts = filterProducts(highlightedProducts);
  const filteredRegularProducts = filterProducts(regularProducts);

  const handleDetail = (productId) => {
    navigate(`/products/${productId}`);
  };

  const renderProductCard = (pr) => (
    <div key={pr.id} className="col-md-6 col-lg-4 col-xl-3">
      <div id="product-1" className="single-product">
        <div className="part-1">
          {pr.images && pr.images.length > 0 ? (
            <img src={`/images/${pr.images[0].name}`} alt="Product" />
          ) : (
            <img src="/images/default-product.jpg" alt="Default Product" />
          )}
          <ul>
            <li>
              <Button onClick={() => addToCart(pr)}>
                <BiSolidCartAdd />
              </Button>
            </li>
            <li>
              <Button onClick={() => handleDetail(pr.id)}>
                <BiSolidShow />
              </Button>
            </li>
            <li>
              <Button>
                <BiSolidStarHalf />
              </Button>
            </li>
          </ul>
        </div>
        <div className="part-2">
          <h3 className="product-title">{pr.name}</h3>
          {pr.status ? (
            <h4 style={{ color: "green" }}>Instock</h4>
          ) : (
            <h4 style={{ color: "red" }}>Out of stock</h4>
          )}
          <br />
          <h4 className="product-price">
            {pr.price?.toLocaleString("vi-VN")} VNĐ
          </h4>
        </div>
      </div>
    </div>
  );

  return (
    <Container>
      <Row>
        <Col md={12}>
          {/* Filter Section */}
          <div className="filter-section mb-4 p-3 bg-light rounded">
            <Row>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Price Range</Form.Label>
                  <Form.Range
                    min={0}
                    max={100000000}
                    step={100000}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  />
                  <div className="d-flex justify-content-between">
                    <span>0 VNĐ</span>
                    <span>{maxPrice.toLocaleString("vi-VN")} VNĐ</span>
                  </div>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Status</Form.Label>
                  <div>
                    <Form.Check
                      inline
                      type="radio"
                      label="All"
                      name="status"
                      checked={selectedStatus === "All"}
                      onChange={() => setSelectedStatus("All")}
                    />
                    <Form.Check
                      inline
                      type="radio"
                      label="In Stock"
                      name="status"
                      checked={selectedStatus === "Instock"}
                      onChange={() => setSelectedStatus("Instock")}
                    />
                    <Form.Check
                      inline
                      type="radio"
                      label="Out of Stock"
                      name="status"
                      checked={selectedStatus === "Outstock"}
                      onChange={() => setSelectedStatus("Outstock")}
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>
          </div>

          <Row>
            <h1>Outstanding products</h1>
            <section className="section-products">
              <div className="container">
                <div className="row">
                  {filteredHighlightedProducts?.length > 0 ? (
                    filteredHighlightedProducts.map(renderProductCard)
                  ) : (
                    <p>No featured products found</p>
                  )}
                </div>
              </div>
            </section>
          </Row>

          <Row>
            <h2>All Products</h2>
            <section className="section-products">
              <div className="container">
                <div className="row">
                  {filteredRegularProducts?.length > 0 ? (
                    filteredRegularProducts.map(renderProductCard)
                  ) : (
                    <p>No products found</p>
                  )}
                </div>
              </div>
            </section>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Product;
