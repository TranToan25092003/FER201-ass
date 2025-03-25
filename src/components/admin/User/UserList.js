import React, { useEffect, useState } from "react";
import { Button, Table, Pagination, Col } from "react-bootstrap";
import { GetUser } from "../../../service/apiproduct";
import ModalUpdateUser from "./ModalUpdateUser";

function UserList() {
  const [users, setUsers] = useState([]);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const userData = await GetUser();
    setUsers(userData);
  };

  const handleClickBtnUpdate = (user) => {
    setShowModalUpdate(true);
    setDataUpdate(user);
  };

  const resetUpdateData = () => setDataUpdate({});

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container my-4 content">
      <h2 className="text-center mb-4">User List</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Full Name</th>
            <th>Gender</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.fullname}</td>
              <td>{user.gender ? "Male" : "Female"}</td>
              <td>{user.role === 0 ? "Admin" : "User"}</td>
              <td>{user.status ? "Active" : "Inactive"}</td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleClickBtnUpdate(user)}
                >
                  Update
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Col className="d-flex justify-content-center">
        <Pagination>
          {Array.from(
            { length: Math.ceil(users.length / usersPerPage) },
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
      <ModalUpdateUser
        show={showModalUpdate}
        setShow={setShowModalUpdate}
        dataUpdate={dataUpdate}
        fetchUsers={fetchUsers}
        resetUpdateData={resetUpdateData}
      />
    </div>
  );
}

export default UserList;
