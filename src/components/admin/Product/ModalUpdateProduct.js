import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import _ from "lodash";
import {
  GetCategory,
  UpdateAdminProduct,
  UpdateProduct,
} from "../../../service/apiproduct";
import { Form } from "react-bootstrap";
const ModalUpdateProduct = (props) => {
  const {
    show,
    setShow,
    products,
    setProducts,
    dataUpdate,
    fetchData,
    resetUpdateData,
  } = props;
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [catId, setCatId] = useState(0);
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    // Fetch categories from API or static JSON
    const fetchCategories = async () => {
      const categoryData = await GetCategory();
      setCategories(categoryData);
    };
    fetchCategories();
  }, []);

  const handleClose = () => {
    setShow(false);
    setName("");
    setPrice("");
    setImage("");
    setCatId("");
    setQuantity("");
    setPreviewImage("");
    resetUpdateData();
  };

  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      setName(dataUpdate.name);
      setPrice(dataUpdate.price);
      setQuantity(dataUpdate.quantity);
      setCatId(dataUpdate.catId || 0);
    }
  }, [dataUpdate]);
  const handleSubmitUpdateProduct = async (event) => {
    event.preventDefault();
    try {
      const updatedProduct = { name, price, quantity, catId, status: true };
      if (updatedProduct.quantity === 0) {
        updatedProduct.status = false;
      }
      await UpdateAdminProduct(dataUpdate.id, updatedProduct);
      handleClose();
      fetchData();
    } catch (error) {
      console.error("Error updating product:", error);
      // Handle error (e.g., show error message)
    }
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        className="modal-update-product"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Price</label>
              <input
                type="text"
                className="form-control"
                value={price.toLocaleString("vi-VN")}
                onChange={(event) => setPrice(event.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Quantity</label>
              <input
                type="text"
                className="form-control"
                id="inputCity"
                value={quantity}
                onChange={(event) => setQuantity(parseInt(event.target.value))}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Category</label>
              <select
                className="form-control"
                value={catId}
                onChange={(event) => setCatId(parseInt(event.target.value))}
                id="select-box"
              >
                <option value="">--Select--</option>
                {categories &&
                  categories.length > 0 &&
                  categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitUpdateProduct}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalUpdateProduct;
