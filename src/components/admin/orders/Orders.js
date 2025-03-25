import React, { useEffect, useState } from "react";
import "../../../css/admin.css";
import { Button, Table, Pagination, Image, Col } from "react-bootstrap";
import {
  DeletePost,
  GetAllOrders,
  GetCategory,
  GetProduct,
} from "../../../service/apiproduct";

function Orders() {
  const [listOrders, setListOrders] = useState([]);

  // Dữ liệu mẫu bạn cung cấp

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await GetAllOrders();
    setListOrders(data);
  };

  if (listOrders.length == 0) {
    console.log("hello");
    return (
      <div className="container my-4 content">
        <h1>No orders</h1>
      </div>
    );
  }

  return (
    <div className="container my-4 content">
      <h2 className="text-center mb-4">Orders</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order Date</th>
            <th>Return Date</th>

            <th>User Info</th>
            <th>Products</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {listOrders.map((orderData) => {
            return (
              <tr key={orderData.id}>
                <td>{orderData.oDate}</td>
                <td>{orderData.rDate}</td>

                <td>
                  <div>
                    <strong>Name:</strong> {orderData.user.fname}{" "}
                    {orderData.user.lname} <br />
                    <strong>Email:</strong> {orderData.user.uemail} <br />
                    <strong>Mobile:</strong> {orderData.user.mobile} <br />
                    <strong>Address:</strong> {orderData.user.address}
                  </div>
                </td>
                <td>
                  {orderData.product.map((item) => (
                    <div key={item.pid}>
                      <strong>{item.pname}</strong> <br />
                      Price: {item.price.toLocaleString()} VND <br />
                      Quantity: {item.quantity} <br />
                    </div>
                  ))}
                </td>
                <td>{orderData.total.toLocaleString()} VND</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Orders;
