import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { GetCategory, PostProduct } from "../../../service/apiproduct";

const ModalCreateProduct = (props) => {
  const { show, setShow, fetchData } = props;
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [catId, setCatId] = useState(0);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoryData = await GetCategory();
      if (categoryData) setCategories(categoryData);
    };
    fetchCategories();
  }, []);

  const handleClose = () => {
    setShow(false);
    setName("");
    setPrice("");
    setImage(null);
    setCatId(0);
    setQuantity("");
    setPreviewImage("");
  };

  const handleUploadImage = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setImage(file);
    }
  };

  const uploadImageToCloudinary = async () => {
    if (!image) {
      toast.error("Please select an image.");
      return null;
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "fer202"); // Thay bằng upload_preset của bạn
    formData.append("cloud_name", "dco0pwws7"); // Thay bằng Cloudinary cloud_name của bạn

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dco0pwws7/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error?.message || "Upload failed");
      }
      return data.secure_url; // Trả về URL ảnh trên Cloudinary
    } catch (error) {
      toast.error(`Upload failed: ${error.message}`);
      return null;
    }
  };

  async function handleSubmitCreateProduct(event) {
    event.preventDefault();

    const imageUrl = await uploadImageToCloudinary();
    if (!imageUrl) return;

    const newProduct = {
      name,
      price,
      quantity,
      catId,
      image: imageUrl,
      status: true,
    };

    try {
      const response = await PostProduct(newProduct);
      if (response) {
        toast.success("Product added successfully!");
        handleClose();
        fetchData();
      } else {
        throw new Error("Failed to add product");
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <Modal show={show} onHide={handleClose} size="xl" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Create Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="row g-3" onSubmit={handleSubmitCreateProduct}>
          <div className="col-md-6">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              value={price}
              onChange={(event) => setPrice(Number(event.target.value))}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Quantity</label>
            <input
              type="number"
              className="form-control"
              value={quantity}
              onChange={(event) => setQuantity(Number(event.target.value))}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Category</label>
            <select
              className="form-control"
              value={catId}
              onChange={(event) => setCatId(Number(event.target.value))}
              required
            >
              <option value={0}>--Select--</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Upload Image</label>
            <input
              type="file"
              className="form-control"
              onChange={handleUploadImage}
              required
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="img-thumbnail mt-2"
                style={{ width: "100px", height: "100px" }}
              />
            )}
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
  );
};

export default ModalCreateProduct;
