import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((s) => !s);

  // (optional) body scroll lock jab menu open ho
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => (document.body.style.overflow = "");
  }, [isMenuOpen]);

  return (
    <>
      {/* Backdrop for mobile offcanvas */}
      <div
        className={`custom-offcanvas-backdrop ${isMenuOpen ? "show" : ""}`}
        onClick={() => setIsMenuOpen(false)}
      />

      <nav className="navbar navbar-expand-lg navbar-dark  shadow-sm" style={{ background: 'linear-gradient(135deg, #15282E 0%, #0F969c 100%)'}}>
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" to="/admin" onClick={() => setIsMenuOpen(false)}>
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
          <div style={{ background: 'linear-gradient(135deg, #15282E 0%, #0F969c 100%)' }} className={`${isMenuOpen ? "show" : ""} collapse navbar-collapse`} id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item d-flex flex-column flex-lg-row gap-2 gap-lg-0 mt-3 mt-lg-0">
                <Link className="btn btn-outline-light btn-sm me-lg-2" to="/login" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
                <Link className="btn btn-light btn-sm text-dark" to="/signup" onClick={() => setIsMenuOpen(false)}>
                  Sign Up
                </Link>
              </li>
               <li className="nav-item">
                <Link className="nav-link text-light px-3 py-2" to="/admin" onClick={() => setIsMenuOpen(false)}>
                  Admin
                </Link>
              </li>
              
              <li className="nav-item">
                <Link className="nav-link text-light px-3 py-2" to="/allbooks" onClick={() => setIsMenuOpen(false)}>
                  All Books
                </Link>
              </li>
               <li className="nav-item">
                <Link className="nav-link text-light px-3 py-2" to="/vender" onClick={() => setIsMenuOpen(false)}>
                  Vender
                </Link>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
