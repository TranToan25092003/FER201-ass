import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import {
  GetCategory,
  postCreateNewProduct,
  PostProduct,
} from "../../../service/apiproduct";

const ModalCreateProduct = (props) => {
  const { show, setShow, products, setProducts, fetchData } = props;
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [catId, setCatId] = useState(0);
  const [categories, setCategories] = useState([]);

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
  };

  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
  };

  async function handleSubmitCreateProduct(event) {
    event.preventDefault();
    const newProduct = {
      name,
      price,
      quantity,
      catId,
      status: true,
    };
    try {
      const respone = await PostProduct(newProduct);
      if (respone) {
        handleClose();
        fetchData();
      } else {
        throw new Error("Failed to add product");
      }
    } catch (error) {
      console.error("Error: ", error);
      alert(error.message);
    }
  }

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
          <Modal.Title>Create Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            className="row g-3"
            onSubmit={(event) => handleSubmitCreateProduct(event)}
          >
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
                value={price}
                onChange={(event) => setPrice(parseInt(event.target.value))}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Quantity</label>
              <input
                type="text"
                className="form-control"
                value={quantity}
                onChange={(event) => setQuantity(parseInt(event.target.value))}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Category</label>
              <select
                className="form-control"
                onChange={(event) => setCatId(parseInt(event.target.value))}
                id="select-box"
              >
                <option value="">--Select--</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalCreateProduct;
