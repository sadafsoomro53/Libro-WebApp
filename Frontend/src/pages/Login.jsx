import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';

export default function Login() {
  const [role, setRole] = useState('user');
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submitLogin = (e) => {
    e.preventDefault();
    const userData = { 
      username: form.username, 
      email: `${form.username}@example.com`,
      role: role // Add role to user data
    };
    
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ 
      background: 'linear-gradient(135deg, #15282E 0%, #0F969c 100%)'
    }}>
      <div className="card shadow-lg border-0" style={{ 
        maxWidth: 450, 
        width: '90%', 
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.95)'
      }}>
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <h2 className="fw-bold text-dark mb-2">Welcome</h2>
            <p className="text-muted">Login in to your account</p>
          </div>

          <form onSubmit={submitLogin}>
            <div className="mb-4">
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
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Password</label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <FaLock style={{ color: '#15282E' }} />
                </span>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-dark w-100 py-3 mb-3"
              style={{ background: 'linear-gradient(135deg, #15282E 0%, #0F969c 100%)' }}
            >
              Login In 
            </button>

            <div className="text-center">
              <span className="text-muted">Don't have an account? </span>
              <Link to="/signup" className="btn btn-link" style={{ color: '#15282E' }}>
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
