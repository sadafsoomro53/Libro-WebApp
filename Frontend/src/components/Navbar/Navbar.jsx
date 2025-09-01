import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const { user, logout } = useAuth();

  const toggleMenu = () => setIsMenuOpen((s) => !s);
  const toggleProfile = () => setIsProfileOpen((s) => !s);

  // (optional) body scroll lock jab menu open ho
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => (document.body.style.overflow = "");
  }, [isMenuOpen]);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
  };

  return (
    <>
      {/* Backdrop for mobile offcanvas */}
      <div
        className={`custom-offcanvas-backdrop ${isMenuOpen ? "show" : ""}`}
        onClick={() => setIsMenuOpen(false)}
      />

      <nav
        className="navbar navbar-expand-lg navbar-dark  shadow-sm"
        style={{ background: "linear-gradient(135deg, #15282E 0%, #0F969c 100%)" }}
      >
        <div className="container-fluid">
          <Link
            className="navbar-brand d-flex align-items-center"
            to="/admin"
            onClick={() => setIsMenuOpen(false)}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/64/8244/8244573.png"
              alt="logo"
              height="32"
              className="me-2"
            />
            <span className="fs-5 fw-semibold text-light">Libro</span>
          </Link>

          <button
            className="navbar-toggler border-0"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            type="button"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* NOTE: collapse ko hum mobile par fixed offcanvas jaisa style denge */}
          <div
            style={{ background: "linear-gradient(135deg, #15282E 0%, #0F969c 100%)" }}
            className={`${isMenuOpen ? "show" : ""} collapse navbar-collapse`}
            id="navbarNav"
          >
            <ul className="navbar-nav ms-auto align-items-center">
              {/* Profile icon for mobile view - placed above login/signup */}
              {user && (
                <li className="nav-item d-flex d-lg-none justify-content-center my-2" ref={profileRef}>
                  <button
                    className="btn btn-primary btn-sm d-flex align-items-center justify-content-center"
                    onClick={toggleProfile}
                    style={{ borderRadius: "50%", width: 40, height: 40, padding: 0, boxShadow: "0 0 8px rgba(0,0,0,0.3)" }}
                    title="Profile"
                  >
                    {user.image ? (
                      <img
                        src={user.image}
                        alt="Profile"
                        style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", border: "2px solid white" }}
                      />
                    ) : (
                      <span className="text-white fs-5">{user.username?.charAt(0).toUpperCase() || "U"}</span>
                    )}
                  </button>
                  {isProfileOpen && (
                    <div
                      className="position-absolute bg-white shadow rounded p-3"
                      style={{ top: "calc(100% + 0.5rem)", left: "50%", transform: "translateX(-50%)", minWidth: 200, zIndex: 1050 }}
                    >
                      <div className="mb-2">
                        <strong>{user.username}</strong>
                      </div>
                      <div className="mb-2 text-truncate" title={user.email}>
                        {user.email}
                      </div>
                      <button className="btn btn-danger btn-sm w-100" onClick={handleLogout}>
                        Logout
                      </button>
                    </div>
                  )}
                </li>
              )}
              
              <li className="nav-item d-flex flex-column flex-lg-row gap-2 gap-lg-0 mt-3 mt-lg-0">
                <Link
                  className="btn btn-outline-light btn-sm me-lg-2"
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  className="btn btn-light btn-sm text-dark"
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </li>

           
          
              {/* Profile icon for desktop view */}
              {user && (
                <li className="nav-item position-relative ms-3 d-none d-lg-block" ref={profileRef}>
                  <button
                    className="btn btn-primary btn-sm d-flex align-items-center justify-content-center"
                    onClick={toggleProfile}
                    style={{ borderRadius: "50%", width: 40, height: 40, padding: 0, boxShadow: "0 0 8px rgba(0,0,0,0.3)" }}
                    title="Profile"
                  >
                    {user.image ? (
                      <img
                        src={user.image}
                        alt="Profile"
                        style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", border: "2px solid white" }}
                      />
                    ) : (
                      <span className="text-white fs-5">{user.username?.charAt(0).toUpperCase() || "U"}</span>
                    )}
                  </button>
                  {isProfileOpen && (
                    <div
                      className="position-absolute bg-white shadow rounded p-3"
                      style={{ top: "calc(100% + 0.5rem)", right: 0, minWidth: 200, zIndex: 1050 }}
                    >
                      <div className="mb-2">
                        <strong>{user.username}</strong>
                      </div>
                      <div className="mb-2 text-truncate" title={user.email}>
                        {user.email}
                      </div>
                      <button className="btn btn-danger btn-sm w-100" onClick={handleLogout}>
                        Logout
                      </button>
                    </div>
                  )}
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
