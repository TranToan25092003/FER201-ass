import React from "react";
import "../../css/header.css";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { useLoading } from "../../contexts/LoadingContext";

function ProfileDropDown() {
  const navigate = useNavigate();
  const { loading, setLoading } = useLoading();
  const authenticated = localStorage.getItem("accounts");

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.removeItem("accounts");
      setLoading(false);
      navigate("/");
    }, 2000);
  };

  let username = "";
  let email = "";
  let id;

  if (authenticated) {
    const user = JSON.parse(authenticated);
    username = user.username;
    email = user.email;
    id = user.id;
  }

  const handleProfile = (id) => {
    navigate(`/profile/${id}`);
  };

  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  const renderNavLinks = () => {
    if (authenticated) {
      return (
        <div className="profile-dropdown-menu">
          <div className="user-info">
            <div className="user-avatar">{getInitials(username)}</div>
            <div className="user-details">
              <div className="username">{username}</div>
              <div className="user-email">{email || "No email provided"}</div>
            </div>
          </div>

          <div className="dropdown-divider"></div>

          <button className="dropdown-item" onClick={() => handleProfile(id)}>
            <i className="fas fa-user"></i> Profile
          </button>
          <div className="dropdown-divider"></div>

          <button
            className="dropdown-item logout-item"
            onClick={handleLogout}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" />
                Logging out...
              </>
            ) : (
              <>
                <i className="fas fa-sign-out-alt"></i> Log Out
              </>
            )}
          </button>
        </div>
      );
    } else {
      return (
        <div className="profile-dropdown-menu">
          <button className="dropdown-item" onClick={() => navigate("/login")}>
            <i className="fas fa-sign-in-alt"></i> Login
          </button>
          <button
            className="dropdown-item"
            onClick={() => navigate("/register")}
          >
            <i className="fas fa-user-plus"></i> Register
          </button>
        </div>
      );
    }
  };

  return renderNavLinks();
}

export default ProfileDropDown;
