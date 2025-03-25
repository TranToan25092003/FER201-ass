import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Navigate, Outlet, useNavigate } from "react-router-dom"; // Thay json bằng Navigate
import SideBar from "./SideBar";
import Nav from "./Nav";
import { toast } from "react-toastify";

function Admin() {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  // Lấy và kiểm tra user từ localStorage
  let user;
  try {
    const storedUser = localStorage.getItem("accounts");
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    user = null;
  }

  // Xử lý resize
  useEffect(() => {
    const handleSize = () => {
      if (window.innerWidth > 768) {
        setToggle(false);
      }
    };
    window.addEventListener("resize", handleSize);
    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, []);

  // Hàm toggle sidebar
  const Toggle = () => {
    setToggle(!toggle);
  };

  // Kiểm tra quyền và điều hướng
  if (!user || user?.role !== 0) {
    toast.error("Forbidden resource");
    return <Navigate to="/login" />; // Sử dụng Navigate thay vì navigate()
  }

  return (
    <div className="d-flex">
      <div className={toggle ? "d-none" : "w-auto position-fixed"}>
        <SideBar />
      </div>
      <div className={toggle ? "d-none" : "invisible"}>
        <SideBar />
      </div>
      <div className="col overflow-auto">
        <Nav Toggle={Toggle} className={toggle ? "collapsed" : ""} />
        <div className={`content ${toggle ? "collapsed" : ""}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Admin;
