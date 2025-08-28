import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaMapMarkerAlt } from 'react-icons/fa';

export default function SignUp() {
  const [role, setRole] = useState('user');
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '', address: '' });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImage = e => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      alert('Passwords do not match');
      return;
    }
    navigate('/profile', { state: { role, ...form, image: preview } });
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ 
      background: 'linear-gradient(135deg, #15282E 0%, #0F969c 100%)'
    }}>
      <div className="card shadow-lg border-0" style={{ 
        maxWidth: 450, 
        width: '90%', 
        borderRadius: 20,
        background: 'white'
      }}>
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <h2 className="fw-bold" style={{ color: '#15282E' }}>Create Account</h2>
            <p className="text-muted">Join our community today</p>
          </div>

          <p> Please upload an image </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Username</label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <FaUser style={{ color: '#15282E' }} />
                </span>
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Choose username"
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <FaEnvelope style={{ color: '#15282E' }} />
                </span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter email"
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <FaLock className="text-dark" />
                </span>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Create password"
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Confirm Password</label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <FaLock className="text-dark" />
                </span>
                <input
                  type="password"
                  name="confirm"
                  value={form.confirm}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Confirm password"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Address</label>
              <div className="input-group">
                <span className="input-group-text bg-light">
<FaMapMarkerAlt style={{ color: 'black' }} />
                </span>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter address"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn"
              style={{
                background: 'linear-gradient(135deg, #15282E 0%, #0F969c 100%)',
                borderColor: '#2e8b57',
                color: 'white',
              }}
            >
              Create Account
            </button>

            <div className="text-center mt-3">
              <span className="text-muted">Already have an account? </span>
              <Link to="/login" className="btn btn-link" style={{ color: '#15282E' }}>
                Login in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
