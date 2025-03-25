import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { UpdateUser } from "../../../service/apiproduct";

function ModalUpdateUser({ show, setShow, dataUpdate, fetchUsers, resetUpdateData }) {
  const [role, setRole] = useState(dataUpdate?.role || 1);
  const [status, setStatus] = useState(dataUpdate?.status || 0);

  const handleUpdate = async () => {
    await UpdateUser(dataUpdate.id, { role, status });
    fetchUsers();
    setShow(false);
    resetUpdateData();
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Update User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Role</Form.Label>
            <Form.Select value={role} onChange={(e) => setRole(Number(e.target.value))}>
              <option value="1">User</option>
              <option value="0">Admin</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Status</Form.Label>
            <Form.Select value={status} onChange={(e) => setStatus(Number(e.target.value))}>
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdate}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalUpdateUser;
