import React, { useEffect, useState } from "react";
import "../../../css/admin.css";
import { Button, Table, Pagination, Image, Col } from "react-bootstrap";
import {
  DeletePost,
  GetCategory,
  GetProduct,
} from "../../../service/apiproduct";
import ModalCreateProduct from "./ModalCreateProduct";
import ModalDeleteProduct from "./ModalDeleteProduct";
import ModalUpdateProduct from "./ModalUpdateProduct";
import Nav from "../Nav";
import { CDBTable, CDBTableHeader, CDBTableBody, CDBContainer } from "cdbreact";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [dataDelete, setDataDelete] = useState({});
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [category, setCategory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const productData = await GetProduct();
    const categoryData = await GetCategory();
    setProducts(productData);
    setCategory(categoryData);
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleClickBtnDelete = (product) => {
    setShowModalDelete(true);
    setDataDelete(product);
  };
  const handleClickBtnUpdate = (product) => {
    setShowModalUpdate(true);
    setDataUpdate(product);
  };
  const resetUpdateData = () => {
    setDataUpdate({});
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container my-4 content">
      <h2 className="text-center mb-4">Products List</h2>
      <div className="row mb-3">
        <div className="col">
          <Button variant="success" onClick={handleShowModal}>
            Create Product
          </Button>
        </div>
        <div className="col"></div>
      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Quantity</th>
            <th>CatID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product, index) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price.toLocaleString("vi-VN")}</td>
              <td>
                <Image
                  src={`/images/${product.images[0].name}`}
                  width="100"
                  thumbnail
                  alt={product.name}
                />
              </td>
              <td>{product.quantity}</td>
              <td>{category.find((ca) => ca.id == product.catId)?.name}</td>
              <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                <Button
                  variant="primary"
                  size="sm"
                  className="me-1"
                  onClick={() => handleClickBtnUpdate(product)}
                >
                  Update
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleClickBtnDelete(product)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Col className="d-flex justify-content-center">
        <Pagination>
          {Array.from(
            { length: Math.ceil(products.length / productsPerPage) },
            (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            )
          )}
        </Pagination>
      </Col>
      <ModalCreateProduct
        show={showModal}
        setShow={setShowModal}
        products={products}
        setProducts={setProducts}
        fetchData={fetchData}
      />
      <ModalDeleteProduct
        show={showModalDelete}
        setShow={setShowModalDelete}
        dataDelete={dataDelete}
        fetchData={fetchData}
      />
      <ModalUpdateProduct
        show={showModalUpdate}
        setShow={setShowModalUpdate}
        dataUpdate={dataUpdate}
        fetchData={fetchData}
        resetUpdateData={resetUpdateData}
      />
    </div>
  );
}

export default ProductList;
