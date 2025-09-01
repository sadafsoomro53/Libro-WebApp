import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaGoogle, FaFacebook } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/ToastProvider';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const toast = useToast();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submitLogin = (e) => {
    e.preventDefault();

    // Check if user exists in localStorage (simulate signed-up users)
    const storedUsers = JSON.parse(localStorage.getItem('libro_users') || '[]');
    const userExists = storedUsers.some(u => u.username === form.username);

    if (!userExists) {
      toast.warning('You need to sign up first.');
      return;
    }

    // If user is already signed in, navigate to admin dashboard
    if (user) {
      navigate('/admin');
      return;
    }

    // Simulate login process
    const userData = {
      username: form.username,
      email: `${form.username}@example.com`,
      role: 'user'
    };
    
    login(userData);
    navigate('/profile');
  };

    const handleGoogleLogin = () => {
      // Simulate Google login with form data
      const userData = {
        username: form.username,
        email: `${form.username}@example.com`,
        role: 'user'
      };
      
      login(userData);
      navigate('/profile');
    };

    const handleFacebookLogin = () => {
      // Simulate Facebook login with form data
      const userData = {
        username: form.username,
        email: `${form.username}@example.com`,
        role: 'user'
      };
      
      login(userData);
      navigate('/profile');
    };

  const handleForgotPassword = () => {
    // Simulate forgot password flow
    toast.info('Password reset link sent to your email.');
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
            <h2 className="fw-bold text-dark mb-2">Login</h2>
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

            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="remember" />
                <label className="form-check-label" htmlFor="remember">Remember me</label>
              </div>
              <button type="button" className="btn btn-link p-0" onClick={handleForgotPassword}>
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="btn btn-dark w-100 py-3 mb-3"
              style={{ background: 'linear-gradient(135deg, #15282E 0%, #0F969c 100%)' }}
            >
              Login In 
            </button>

            <div className="d-flex align-items-center my-3">
              <hr className="flex-grow-1" />
              <span className="mx-2 text-muted">or</span>
              <hr className="flex-grow-1" />
            </div>

            <div className="d-flex gap-2 mb-4">
              <button
                type="button"
                className="btn btn-outline-danger d-flex align-items-center justify-content-center flex-grow-1"
                onClick={handleGoogleLogin}
              >
                <FaGoogle className="me-2" /> Google
              </button>
              <button
                type="button"
                className="btn btn-outline-primary d-flex align-items-center justify-content-center flex-grow-1"
                onClick={handleFacebookLogin}
              >
                <FaFacebook className="me-2" /> Facebook
              </button>
            </div>

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
