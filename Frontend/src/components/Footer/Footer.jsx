import React from 'react'
import {
  FaFacebookSquare,
  FaInstagram,
  FaShopify,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGlobe
} from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className=" text-white pt-5" style={{ background: 'linear-gradient(135deg, #15282E 0%, #0F969c 100%)' }}>
      <div className="container">
        <div className="row gy-4">

          {/* Contact / Reach Out */}
          <div className="col-12 col-md-4">
            <h5 className="fw-bold mb-3">Contact Us</h5>

            <p className="mb-2">
              <FaEnvelope className="me-2" />
              <a href="mailto:support@netbryx.com" className="text-white text-decoration-none">support@netbryx.com</a>
            </p>

            <p className="mb-2">
              <FaPhoneAlt className="me-2" />
              <a href="tel:+923001234567" className="text-white text-decoration-none">+92 300 1234567</a>
            </p>

            <p className="mb-2">
              <FaPhoneAlt className="me-2" />
              <a href="tel:+92427654321" className="text-white text-decoration-none">+92 42 7654321</a>
            </p>

            <p className="mb-2">
              <FaMapMarkerAlt className="me-2" />
              Lahore, Pakistan
            </p>

            <p className="mb-0">
              <FaGlobe className="me-2" />
              <a href="https://www.netbryx.com" target="_blank" rel="noreferrer" className="text-white text-decoration-none">www.netbryx.com</a>
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-12 col-md-4">
            <h5 className="fw-bold mb-3">Quick Links</h5>
            <div className="row">
              <div className="col-6">
                <ul className="list-unstyled">
                  <li><a className="text-white text-decoration-none" href="/admin">Dashboard</a></li>
                  <li><a className="text-white text-decoration-none" href="/users">Users Management</a></li>
                  <li><a className="text-white text-decoration-none" href="/vendors">Vendors Management</a></li>
                  <li><a className="text-white text-decoration-none" href="/books">Book Management</a></li>
                  <li><a className="text-white text-decoration-none" href="/orders">Order/Transactions</a></li>
                  <li><a className="text-white text-decoration-none" href="/reports">Reports</a></li>
                  <li><a className="text-white text-decoration-none" href="/categories">Categories</a></li>
                  <li><a className="text-white text-decoration-none" href="/notifications">Notifications</a></li>
                  <li><a className="text-white text-decoration-none" href="/settings">Settings</a></li>
                  <li><a className="text-white text-decoration-none" href="/contact">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Socials + Newsletter / Connect */}
          <div className="col-12 col-md-4">
            <h5 className="fw-bold mb-3">Connect & Follow</h5>

            {/* Social icons */}
            <div className="d-flex flex-wrap gap-3 align-items-center mb-3">
              <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="text-white fs-4">
                <FaFacebookSquare />
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="text-white fs-4">
                <FaInstagram />
              </a>
              <a href="https://www.shopify.com/" target="_blank" rel="noreferrer" className="text-white fs-4">
                <FaShopify />
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noreferrer" className="text-white fs-4">
                <FaTwitter />
              </a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="text-white fs-4">
                <FaLinkedin />
              </a>
              <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" className="text-white fs-4">
                <FaYoutube />
              </a>
              <a href="https://www.tiktok.com/" target="_blank" rel="noreferrer" className="text-white fs-4">
                <FaTiktok />
              </a>
            </div>

            {/* Short connect / newsletter form */}
            <form
              onSubmit={(e) => { e.preventDefault(); /* replace with your subscribe handler */ alert('Thanks! We will reach out to you.'); }}
              className="d-flex gap-2"
            >
              <input
                type="email"
                className="form-control form-control-sm"
                placeholder="Your email"
                aria-label="Your email"
                required
                style={{ maxWidth: '220px' }}
              />
              <button type="submit" className="btn btn-dark btn-sm">Subscribe</button>
            </form>

            <small className="d-block text-white-50 mt-2">
              Or reach out via DM on any social channel — we respond within 24 hours.
            </small>
          </div>
        </div>

        {/* Optional extra quickhand row (useful on wide screens) */}
        <div className="row mt-4">
          <div className="col-12 d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
            <div className="text-white-50 small">
              <strong>Office Hours:</strong> Mon - Fri, 9:00am - 6:00pm
            </div>

            <div className="d-flex gap-3">
              <a href="/privacy" className="text-white-50 text-decoration-none small">Privacy Policy</a>
              <a href="/terms" className="text-white-50 text-decoration-none small">Terms</a>
              <a href="/sitemap" className="text-white-50 text-decoration-none small">Sitemap</a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="bg-dark py-3 mt-4">
        <div className="container text-center">
          <small className="d-block text-white-50">
            &copy; Aug-2025. Made by <strong>Sadaf</strong>. <a href="https://www.netbryx.com" className="text-white-50 text-decoration-none">www.Netbryx.com</a>
          </small>
        </div>
      </div>
    </footer>
  )
}

export default Footer
