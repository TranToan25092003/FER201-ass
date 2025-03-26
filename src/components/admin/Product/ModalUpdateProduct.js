import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import _ from "lodash";
import { GetCategory, UpdateAdminProduct } from "../../../service/apiproduct";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";

const ModalUpdateProduct = (props) => {
  const { show, setShow, dataUpdate, fetchData, resetUpdateData } = props;
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
      setCategories(categoryData);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      setName(dataUpdate.name);
      setPrice(dataUpdate.price);
      setQuantity(dataUpdate.quantity);
      setCatId(dataUpdate.catId || 0);
      setPreviewImage(dataUpdate.image || "");
    }
  }, [dataUpdate]);

  const handleClose = () => {
    setShow(false);
    setName("");
    setPrice("");
    setImage(null);
    setCatId(0);
    setQuantity("");
    setPreviewImage("");
    resetUpdateData();
  };

  const handleUploadImage = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setImage(file);
    }
  };

  const uploadImageToCloudinary = async () => {
    if (!image) return previewImage; // Nếu không có ảnh mới, giữ ảnh cũ

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "fer202");
    formData.append("cloud_name", "dco0pwws7");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dco0pwws7/image/upload",
        { method: "POST", body: formData }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || "Upload failed");
      return data.secure_url;
    } catch (error) {
      toast.error(`Upload failed: ${error.message}`);
      return null;
    }
  };

  const handleSubmitUpdateProduct = async (event) => {
    event.preventDefault();
    const imageUrl = await uploadImageToCloudinary();
    if (!imageUrl) return;

    try {
      const updatedProduct = { name, price, quantity, catId, image: imageUrl, status: quantity > 0 };
      await UpdateAdminProduct(dataUpdate.id, updatedProduct);
      toast.success("Product updated successfully!");
      handleClose();
      fetchData();
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="xl" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Update Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="row g-3" onSubmit={handleSubmitUpdateProduct}>
          <div className="col-md-6">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Price</label>
            <input type="number" className="form-control" value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Quantity</label>
            <input type="number" className="form-control" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Category</label>
            <select className="form-control" value={catId} onChange={(e) => setCatId(Number(e.target.value))} required>
              <option value={0}>--Select--</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Upload Image</label>
            <input type="file" className="form-control" onChange={handleUploadImage} />
            {previewImage && <img src={previewImage} alt="Preview" className="img-thumbnail mt-2" style={{ width: "100px", height: "100px" }} />}
          </div>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
            <Button variant="primary" type="submit">Save</Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalUpdateProduct;
